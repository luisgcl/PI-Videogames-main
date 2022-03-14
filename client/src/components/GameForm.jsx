import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postGame, getGenre } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';

import styles from './GameForm.module.css'

export default function GameForm() {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);


    const platformsArr = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PSP",
        "Wii U",
        "Wii",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy"
    ];

 

    const [input, setInput] = useState({
        name: "",
        released: "",
        description: "",
        image: "",
        rating: "",
        genres: [],
        platforms: []

    })

   

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSelectPlatforms(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }



    // function handleSubmit(e) {
    //     e.preventDefault();
    //     dispatch(postGame(input))
    //     alert("Personaje creado con exito!!")
    //     setInput({
    //         name: "",
    //         released: "",
    //         description: "",
    //         image: "",
    //         rating: "",
    //         genres: [],
    //         platforms: []
    //     })
    // }

   
    
      function handleSubmit(e) {
        e.preventDefault();
        if (input.name.trim() === "" || input.name.length < 1) {
          return alert("Debe ingresar un nombre");
        } else if (input.description.trim() === "") {
          return alert("Descripción requerida");
        } else if (input.released.trim() === "") {
          return alert("Fecha de lanzamiento requerida");
        } else if (
          input.rating.trim() === "" ||
          input.rating < 1 ||
          input.rating > 10
        ) {
          return alert("Coloca un Puntaje del 1 al 10");
        } else if (input.genres.length === 0) {
          return alert("Coloca un o más Generos");
        } else if (input.platforms.length === 0) {
          return alert("Coloca una o más Plataformas");
        } else {
          dispatch(postGame(input));
          alert("Videojuego creado!!");
          setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            genres: [],
            platforms: [],
          });
        //   document.getElementById("formulario").reset();
        }
      }

    function handleDelete(el) {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== el)
        })
    }

    function handleDeletePlatforms(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== el)
        })
    }



    useEffect(() => {
        dispatch(getGenre())

    }, [dispatch])





    return (
        <div className={styles.divGames}>
            <Link to='/home'><button className={styles.homeButton}>Home</button></Link>
            <h1>Crea tu videojuego</h1>
            <form className={styles.allForm} onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input
                        type="text"
                        value={input.name}
                        name='name'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="">Fecha de lanzamiento: </label>
                    <input
                        type="date"
                        value={input.released}
                        name='released'
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <label htmlFor="">Rating: </label>
                    <input
                        type="number"
                        value={input.rating}
                        name='rating'
                        onChange={e => handleChange(e)}
                    />
                </div>


                <div>
                    <label htmlFor="">Imagen: </label>
                    <input
                        type="text"
                        value={input.image}
                        name='image'
                        onChange={e => handleChange(e)}
                    />
                </div>

                <div>
                    <label htmlFor="">Descripción: </label>
                    <textarea cols="30" rows="5"
                     value={input.description}
                     name='description'
                     onChange={e => handleChange(e)}
                    ></textarea>
                </div>
                <div className={styles.contentSelect}>
                    <label htmlFor="">Género: </label>
                    <select onChange={e => handleSelect(e)}>
                        {genres.map((g) => (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <label htmlFor="">Plataforma: </label>
                    <select onChange={e => handleSelectPlatforms(e)}>
                        {platformsArr?.map((el) => (
                            <option value={el}>{el}</option>
                        ))}
                    </select>
                </div>


                <button className={styles.formButton} type='submit'>Crear videojuego</button>
            </form>

<div className={styles.floatLeft}>
    <h2>Genero:</h2>
{
                input.genres.map(el =>
                    <div>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>X</button>
                    </div>
                )
            }
</div>
           
<div className={styles.floatRight}>
<h2>Plataforma:</h2>
{
                input.platforms.map(el =>
                    <div>
                        <p>{el}</p>
                        <button onClick={() => handleDeletePlatforms(el)}>X</button>
                    </div>
                )
            }
</div>
            

        </div>
    )
}