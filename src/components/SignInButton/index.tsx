import { FaGoogle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from './styles.module.scss'

export function SignInButton(){
    const { data: session } = useSession()
    return session?.token_response ? (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
        >
            <FaGoogle color="#04d361" />
            <span>{session.user?.name}</span>
            <span className={styles.logout}>Sair</span>
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signIn()}>
            <FaGoogle color="#eba417" />
            <span className={styles.signIn}>Entrar&nbsp;</span><span className={styles.signInText}>com Google</span>
        </button>
    )
}