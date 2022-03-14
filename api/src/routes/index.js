const { Router } = require('express');
require("dotenv").config();
const { validate: uuidValidate } = require("uuid");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genres } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  try {
    const arrVideogames = []; //Este array es para guardar los 20 videojuegos de cada pagina de la api
    let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let i = 0; i < 5; i++) {
      //Necesito 5 paginas para un total de 100 videjuegos
      let pages = await axios.get(apiUrl);
      pages.data.results?.map((e) => {
        arrVideogames.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genres: e.genres?.map((el) => el.name),
          released: e.released,
          rating: e.rating,
          platforms: e.platforms?.map((el) => el.platform.name),
        });

      });
      apiUrl = pages.data.next;

    }

    return arrVideogames;

  } catch (error) {
    console.log(error);
  }

};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      }
    }
  })
}

const getAllVideoGames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}

//rutas
router.get('/videogames', async (req, res) => {
  const name = req.query.name;
  let videoGamesTotal = await getAllVideoGames();
  if (name) {
    gameName = videoGamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    gameName.length ?
      res.status(200).send(gameName) :
      res.status(404).send("Juego no encontrado");
  } else {
    res.status(200).send(videoGamesTotal);
  }

})

router.get("/videogames/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!uuidValidate(id)) {
      const videogameId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const videogameInfo = {
        id: videogameId.data.id,
        name: videogameId.data.name,
        image: videogameId.data.background_image,
        description: videogameId.data.description,
        genres: videogameId.data.genres?.map((e) => e.name),
        released: videogameId.data.released,
        rating: videogameId.data.rating,
        platforms: videogameId.data.parent_platforms?.map(
          (e) => e.platform.name
        ),
      };
      videogameInfo
        ? res.status(200).send(videogameInfo)
        : res.status(404).send("No existe el ID ingresado!!");
    } else {
      const videogameDb = await Videogame.findByPk(id, {
        include: Genres,
      });
      const videogameIdDb = {
        id: videogameDb.id,
        name: videogameDb.name,
        image: videogameDb.image,
        genres: videogameDb.genres?.map((e) => e.name),
        description: videogameDb.description,
        released: videogameDb.released,
        rating: videogameDb.rating,
        platforms: videogameDb.platforms,
        createdInDb: videogameDb.createdInDb,
      };
      videogameIdDb
        ? res.status(200).send(videogameIdDb)
        : res.status(404).send("No existe el ID ingresado!!");
    }
  } catch (error) {
    console.log(error);
  }
});
// //afe0a709eeb94fe4b917d1b70cdb04d2
router.get('/genre', async (req, res) => {
  let allGenres = await Genres.findAll()
  res.status(200).send(allGenres)
})

router.get('/platforms', async (req, res) => {
  const platformsApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
  let platformsList = await platformsApi.data.results.map(el => el.platforms?.map((el) => el.platform.name))
  res.status(200).send(platformsList)
})

router.post('/videogame', async (req, res) => {
  let {
    name,
    released,
    rating,
    image,
    genres,
    platforms,
    description,
    createdInDb
  } = req.body

  let gameCreated = await Videogame.create({
    name,
    released,
    rating,
    image,
    platforms,
    description,
    createdInDb
  })

  let genreDb = await Genres.findAll({
    where: { name: genres }
  })
  gameCreated.addGenre(genreDb)
  res.send("Videogame creado con exito!")
})

module.exports = router;
// module.exports = getGenres
