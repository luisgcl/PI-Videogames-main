import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from './Detail.module.css'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getId } from '../actions';


export default function Detail() {
    const dispatch = useDispatch()
    let { id } = useParams();
    const videogame = useSelector((state) => state.id)
    console.log(id)
    // const {name, image, genres, released, platforms, rating, description} = videogame
   console.log(videogame)

   useEffect(() => {
       dispatch(getId(id))
   }, [dispatch, id])
 
    return (
        <div className={styles.divDetail}>
            <div>
            <h3 className={styles.fontColor}>{videogame.name}</h3>
            <img src={videogame.image} alt="img not found" width="200px" height="250px" />
            <h4 className={styles.fontColor}>Fecha de lanzamiento: {videogame.released}</h4>
            <h3 className={styles.fontColor}>Plataforma: {videogame.platforms + ","}</h3>
            <h3 className={styles.fontColor}>Género: {videogame.genres + ","}</h3>
            <h5 className={styles.fontColor}>Rating: {videogame.rating}</h5>
            <h4 className={styles.fontColor}>Descripción: {videogame.description}</h4>
            </div>
           
            <Link to= '/home'><button className={styles.homeButton}>Volver</button></Link>
        </div>
    );
}