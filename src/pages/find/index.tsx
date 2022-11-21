import { useState } from 'react'

import { Button } from "../../components/Button/Button";
import { api } from '../../lib/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.scss'
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { AxiosError } from 'axios';

export default function Find(){
  const { data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [ code, setCode ] = useState('')

  api.defaults.headers.common['Authorization'] = `Bearer ${session?.token_response}`

  async function handleJoinPool(){
    try {
      setIsLoading(true)

      if(!code.trim()){
        return toast.error('Informe o código do bolão', {
          theme: "colored",
          });
      }

      await api.post('/pools/join', { code })
      toast.success("Você entrou no bolão com sucesso");

      return {
        redirect: {
          destination: `/pools`,
          permanent: false,
        }
      }
      
    } catch(error) {
      console.log(error)
      setIsLoading(false)
      if(error instanceof AxiosError){
        if(error?.response?.data?.message === 'Pool not found.') {
          return toast.error('Não foi possível encontrar o bolão', {
            theme: "colored",
            });
        }

        if(error?.response?.data?.message === 'You already joined this pool.') {
          return toast.error('Você já está neste bolão!', {
            theme: "colored",
            });
        }
      }


      return toast.error('Não foi possível encontrar o bolão', {
        theme: "colored",
        });

    } finally {
      setIsLoading(false)
    }
  }
  return(
    <div className={styles.findContainer}>
      <ToastContainer
        theme="colored"
      />
      <div className={styles.findContent}>
        <div className={styles.findHero}>
          Encontre um bolão através de  {'\n'}
          seu código único
        </div>

        <input
          placeholder="Qual código do bolão?"
          onChange={event => setCode(event.target.value)}
          value={code}
          autoCapitalize="characters"
        />

        <Button
        title="Buscar um bolão"
        onClick={handleJoinPool}
        isLoading={isLoading}
        // onPress={handleJoinPool}
        />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req, previewData, params }) => {
  const session = await getSession({ req })

  if(!session) {
      return {
          redirect: {
              destination: `/`,
              permanent: false,
          }
      }
  }

  return {
    props: {
      session
    }
  }
}