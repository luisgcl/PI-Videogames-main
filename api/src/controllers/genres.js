const { Genres } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Se crea una constante que trae los generos mediante un endpoint y con otra constante nos permite
//determinar si se encuentra datos en el modelo generos o sino lo crea, sirve para almacenar los 
//datos de generos en la base de datos
const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresTotal = genresApi.data.results?.map((e) => e.name);
    genresTotal.forEach((e) => {
      Genres.findOrCreate({
        where: { name: e },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getGenres;