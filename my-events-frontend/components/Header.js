import Link from 'next/link'
import styles from '@/styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Our Places</a>
                </Link>
                
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Invitations</a>
                        </Link>

                    </li>
                </ul>
            </nav>
        </header>
    )
}