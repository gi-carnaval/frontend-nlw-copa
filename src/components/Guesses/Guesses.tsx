/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { api } from '../../lib/axios';

import { Loading } from '../Loading/Loading';
import { Game, GameProps } from '../Game/Game';

import {  toast } from 'react-toastify';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState(''); 

  async function fetchGames() {
    // console.log(firstTeamPoints)
    // console.log(secondTeamPoints)
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (error) {

      return toast.error('Não foi possível listar os jogos', {
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.error('Informe o placar para palpitar', {
          theme: "colored",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.success('Palpite realizado com sucesso!', {
        theme: "colored",
      });

      fetchGames();

    } catch (error) {
      console.log(error);

      toast.error('Não foi possível enviar o palpite', {
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {games.map((item) => {
      return(
        <Game
          key={item.id}
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
        )
    })}
    </>
  );
}