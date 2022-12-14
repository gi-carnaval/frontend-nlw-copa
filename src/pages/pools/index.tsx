import { useEffect, useState } from "react"
import { useSession, getSession } from 'next-auth/react'

import { GetServerSideProps } from "next";

import { api } from "../../lib/axios"

import styles from './styles.module.scss'
import { Button } from "../../components/Button/Button";
import { Loading } from "../../components/Loading/Loading";
import { PoolCard } from "../../components/PoolCard/PoolCard";
import { useRouter } from "next/router";

export interface ParticipantProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

export interface PoolCardProps {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  },
  participants: ParticipantProps[];
  _count: {
    participants: number;
  }
}

export default function Pools(){
  const [ pools, setPools ] = useState<PoolCardProps[]>([])
  const [ isLoading, setIsLoading ] = useState(true)

  // const { data: session} = useSession()

  const { data: session } = useSession()
  const router = useRouter()
  api.defaults.headers.common['Authorization'] = `Bearer ${session?.token_response}`
  async function fetchPools() {
    setIsLoading(true)
    try {
      const response = await api.get('/pools')
      setPools(response.data.pools)

    } catch(error) {
      console.log(error)
      alert('Não foi possível carregar os bolões')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(session){
      fetchPools()
    }
  }, [session])

  return(
    <>
      <div className={styles.container}>
        <Button 
          title="Buscar bolão por código"
          isLoading={isLoading}
          linkTo="/find"
        />
        {
          isLoading ? 
          <Loading />:
          <div className={styles.poolList}>
            {pools.map((pool) => {
              return(
                <PoolCard key={pool.id} data={pool} />                
              )
            })}
          </div>
        }
      </div>
    </>
  )
} 

export const getServerSideProps: GetServerSideProps = async({ req }) => {
  const session = await getSession({ req })
  if(!session?.token_response) {
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