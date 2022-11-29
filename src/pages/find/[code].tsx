import { useState, useEffect } from "react";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "../../components/Button/Button";
import { api } from '../../lib/axios';

import styles from './styles.module.scss'
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react';
import { SignInButton } from '../../components/SignInButton';
import { AxiosError } from "axios";

interface FindProps {
  poolCode: string,
}

export default function FindCode({poolCode}: FindProps){

  const { data: session} = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const code = poolCode;
  api.defaults.headers.common['Authorization'] = `Bearer ${session?.token_response}`

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

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

      return window.location.href = '/pools'
      
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
          toast.error('Você já está neste bolão!', {
            theme: "colored",
            });
            return window.location.href = '/pools'
        }
      }


      return toast.error('Não foi possível encontrar o bolão', {
        theme: "colored",
        });

    } finally {
      setIsLoading(false)
    }
  }
  
  return session?.token_response? (
    <div className={styles.findContainer}>
      <div className={styles.findContent}>
        <div className={styles.findHero}>
          Encontre um bolão através de  {'\n'}
          seu código único
        </div>

        <input
          placeholder="Qual código do bolão?"
          value={poolCode}
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
  ) : (
    <>
      <div className={styles.signInButton}>
        <span className={styles.signInText}>Faça login para poder entrar em um bolão!</span>
        <SignInButton />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req, previewData, params }) => {
  const session = await getSession({ req })
  const poolCode  = params!.code;

  return {
    props: {
      session,
      poolCode
    }
  }
}