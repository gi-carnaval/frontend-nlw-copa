import { Loading } from '../Loading/Loading';
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

interface Props extends React.HTMLProps<HTMLButtonElement>{
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
  isLoading: boolean | null;
  linkTo?: string
}

export function Button({ title, isLoading = null, type = 'PRIMARY', linkTo, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(String(linkTo))
  }

  return (
    <div className={styles.button}>
      <button onClick={ linkTo ? handleClick : null } className={type === 'SECONDARY' ? styles.buttonSecondary : styles.buttonPrimary}
        {...rest}
      >
  {/*       
          color={type === 'SECONDARY' ? 'white' : "black"}
        */}
        <span className={styles.buttonTitle}
          style={{color: type === 'SECONDARY' ? 'white' :  'black'}}  
        >
          {isLoading}
          {isLoading != null ? title : <Loading/> }
        </span>
      </button >
    </div>
  );
}