import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react"

import styles from './styles.module.scss'


import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

import logoImg from '../../assets/logo.svg'

export function Header(){
    const { data: session } = useSession()
    return session?.token_response ? (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.logoIgnews}>
                    <Link href="/">
                    <Image 
                        src={logoImg}
                        alt="NLW COPA 2022"
                        className={styles.logo}
                    />
                        
                    </Link>
                </div>
                <div className={styles.mobileMenu}>
                    <div className={styles.lines}></div>
                </div>
                
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <span>Home</span>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/pools">
                        <span>Bolões</span>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    ) :  (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.logoIgnews}>
                    <Link href="/">
                        
                    <Image 
                        src={logoImg}
                        alt="NLW COPA 2022"
                    />
                        
                    </Link>
                </div>
                <div className={styles.mobileMenu}>
                    <div className={styles.lines}></div>
                </div>
                
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <span>Home</span>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/find">
                        <span>Entrar num bolão</span>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}