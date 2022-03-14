import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterCreated, genreFiltered, getGenre, orderByName, orderByRating } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';

import styles from './Home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres)
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState()
    const [gamePerPage] = useState(15)
    const indexForLastGame = currentPage * gamePerPage
    const indexFortFirstGame = indexForLastGame - gamePerPage
    const currentGames = videogames.slice(indexFortFirstGame, indexForLastGame)

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenre())
    }, [dispatch])

    
    const paginated = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleGenreFiltered(e) {
        e.preventDefault()
        dispatch(genreFiltered(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden( `Ordenado ${e.target.value}`)
    }

    function handleSortRating(e) {
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrden( `Ordenado ${e.target.value}`)
    }

    return (
        <div className={styles.container}>
            <nav>

            <Link to='/videogame' className={styles.link}>Crear videogame 🎮</Link>

            <button className={styles.button} onClick={e => { handleClick(e) }}>
                    cargar videojuegos
                </button>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleSort(e)}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleSortRating(e)}>
                        <option value="mayor">Mayor Rating</option>
                        <option value="menor">Menor Rating</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleFilterCreated(e)}>
                        {/* <option value="All">Todos</option> */}
                        <option value="Api">Existente</option>
                        <option value="created">Creados</option>
                    </select>
                </div>

                <div className={styles.contentSelect}>
                    <select onChange={e => handleGenreFiltered(e)}>
                        {genres.map((g) => (

                            <option value={g.name} key={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <SearchBar />
            </nav>
            <hr className={styles.hr}/>



            <h1 className={styles.text}>Welcome to Home</h1>
            <Paginated
                gamePerPage={gamePerPage}
                videogames={videogames.length}
                paginated={paginated}
            />

            <div className={styles.cards}>
                {
                    console.log(currentGames),
                    currentGames?.map((c) => {
                        return (
                            <div className={styles.cards} key={c.id}>
                                <Link to={"/detail/" + c.id}>
                                    <Card name={c.name}
                                        image={c.image}
                                        genres={c.genres}
                                        key={c.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginated
                gamePerPage={gamePerPage}
                videogames={videogames.length}
                paginated={paginated}
            />
        </div>
    )
}