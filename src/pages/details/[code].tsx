/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps } from "next"
import { getSession, signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

import { PoolCardProps } from '../../components/PoolCard/PoolCard';
import styles from './styles.module.scss'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../lib/axios";
import { PoolHeader } from "../../components/PoolHeader/PoolHeader";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList/EmptyMyPoolList";
import { Guesses } from "../../components/Guesses/Guesses";
import { Option } from "../../components/Option/Option";
import { ParticipantCardProps, ParticipantsCard } from "../../components/ParticipantsCard/Participants";
import { Button } from "../../components/Button/Button";

interface DetailsProps {
  id: string,
  bearer: string
}

export default function Details({ id, bearer }: DetailsProps){

  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
  const [isLoading, setIsLoading] = useState(true);
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
  const [participants, setparticipants] = useState<ParticipantCardProps[]>({} as ParticipantCardProps[]);
  const [hiddeGames, setHiddeGames] = useState(false)
  const { data: session } = useSession()

  api.defaults.headers.common['Authorization'] = `Bearer ${bearer}` 

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      return toast.error('Não foi possível carregar os detalhes do bolão', {
        theme: "colored",
        });      
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchParticipants() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${id}/participants`);      
      setparticipants(response.data.poolParticipants.participants);
    } catch (error) {
      console.log(error);
      return toast.error('Não foi possível carregar os detalhes do bolão', {
        theme: "colored",
        });      
    } finally {
      setIsLoading(false);
    }
  }
  function checkDevice() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

 async function share() {
  if(checkDevice()){
    
    navigator.share({
      text: `Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${poolDetails.code}* ${'\n'}.${'\n'}.${'\n'} https://frontend-nlw-copa.vercel.app/find/${poolDetails.code}`
    })
  } else {
    await navigator.clipboard.writeText(`Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${poolDetails.code}* ${'\n'}.${'\n'}.${'\n'} https://frontend-nlw-copa.vercel.app/find/${poolDetails.code}`)
    return toast.success('Código do bolão copiado com sucesso. Cole em seu Whatsapp e manda pra galera', {
      theme: "colored",
    });  
  }
 }

 function handleHiddeGame(){
  setHiddeGames(!hiddeGames)
 }

  useEffect(() => {
    fetchPoolDetails();
    fetchParticipants();
  }, [id])
  console.log(poolDetails)
  return(
    <div className={styles.detailsContainer}>
      {
        poolDetails._count?.participants > 0 ? 
        <div className={styles.detailsContent}>
          <div className={styles.headerDetails}>
            <PoolHeader data={poolDetails} share={share}/>

            <div className={styles.sectionOptions}>
              <Option 
                title='Seus palpites' 
                isSelected={optionSelected == 'guesses' ? true : false} 
                onClick={() => setOptionSelected('guesses')}
              />
              <Option 
                title='Participantes' 
                isSelected={optionSelected == 'ranking' ? true : false}
                onClick={() => setOptionSelected('ranking')}
              />
              </div>
            </div>
          {optionSelected == 'guesses' ? (
            <>
              <div className={styles.buttonHidde}>
                <button onClick={() => handleHiddeGame()} className={hiddeGames ? styles.buttonHiddenInactive : styles.buttonHiddenActive}>
                  Esconder Jogos Passados
                </button>
              </div>
              <div className={styles.guessesDiv}>
                <Guesses poolId={poolDetails.id} code={poolDetails.code} hiddeGames={hiddeGames}/>
              </div>
            </>
            
          ) : (
            <ParticipantsCard participants={participants}/>
          )}
        </div>
        : <EmptyMyPoolList code={poolDetails.code} />
      }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async({ req, params }) => {
  const session = await getSession({ req })
  const bearer = session?.token_response
  const { code } = params!;

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
      id: code,
      bearer
    }
  }
}