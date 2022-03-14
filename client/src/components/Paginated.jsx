import React from 'react';
import styles from './Paginated.module.css'

export default function Paginated ({gamePerPage, videogames, paginated}) {
    const pageNumbers = [] 
    for (let i=1; i<=Math.ceil(videogames/gamePerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}>
                            <button onClick={() => paginated(number)}>{number}</button>
                        </li>   
                    ))
                }
            </ul>
        </nav>
    )
}