import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div className={styles.landing}>
            <h1>Press Start</h1>
            <Link to="/home">
                <button className={styles.button}>Start</button>
            </Link>
        </div>
    )
}