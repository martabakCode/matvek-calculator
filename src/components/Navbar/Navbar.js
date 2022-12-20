import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <div id={styles.navbar} className='w-full'>
            <div className='container py-4 flex'>
                <div id={styles.navbarTitle}>
                    Martabak Coder
                </div>

                <div id={styles.navbarLinkContainer}>
                    <Link to='/matrix' className={styles.navbarLink}>Kalkulator Matriks</Link>
                </div>
            </div>
        </div>
    )

}