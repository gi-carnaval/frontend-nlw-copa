import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

import styles from './styles.module.scss'
import { useSession } from 'next-auth/react';
import { SignInButton } from '../components/SignInButton';

interface HomeProps {
  poolCount: number;
  guessessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("")
  const { data: session } = useSession()

  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data
      // console.log(code)
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')

      setPoolTitle('')
    } catch (err) {
      // console.log(err)
      alert('Falha ao criar o bolão, tente novamente')
    }
  }

  return (
    // max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center
    <div className={styles.container}>
      <main className={styles.hero}>
        <h1 className={styles.title}>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className={styles.conectingPeople}>
          <Image src={usersAvatarExampleImg} alt=""/>

          <strong className={styles.strongText}>
            <span>+{ props.usersCount }</span> pessoas já estão usando
          </strong>
        </div>
        {session ? 
        <form onSubmit={createPool} className={styles.formPool}>
          <input
            type="text"
            required 
            placeholder="Qual nome do seu Bolão?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
          className={styles.buttonCreatePool}
            type="submit"
          >Criar meu Bolão</button>
        </form>
        :
        <div className={styles.signInButton}>
          <h3>Faça login com o Google para criar seus bolões</h3>
          <SignInButton />
        </div>
        }
        

        <p className={styles.textDescription}>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className={styles.footerInfos}> 
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-xl">+{ props.poolCount }</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"/>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div  className="flex flex-col">
              <span className="font-bold text-xl">+{ props.guessessCount }</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <span className={styles.appPreview}>
        <Image 
          src={ appPreviewImg }
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW COPA 2022"
          quality={100}
        />
      </span>
    </div>
  )
}

export const getStaticProps = async () => {
  const [
    poolCountResponse, 
    guessCountResponse, 
    usersCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  // console.log(poolCountResponse.data)
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    },
    revalidate: 60 * 10 // 10 minutes
  }
}