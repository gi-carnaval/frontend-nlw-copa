import { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5'

import styles from './styles.module.scss'

import { Team } from '../Team/Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  firstTeamCountryName: string;
  secondTeamCountryCode: string;
  secondTeamCountryName: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const [ firstTeamPointsSaved, setFirstTeamPointsSaved ] = useState(0)
  const [ secondTeamPointsSaved, setSecondTeamPointsSaved ] = useState(0)
  const actualDay = new Date().toISOString()
  const gameDate = new Date(data.date).toISOString()
  
  useEffect(() => {
    if(data.guess != null){
      setFirstTeamPointsSaved(data.guess.firstTeamPoints)
      setSecondTeamPointsSaved(data.guess.secondTeamPoints)
    }
  }, [data.guess])

  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY");
  return (
    <>
      <div className={styles.container}>
        <span className={styles.countriesNames}>
          {data.firstTeamCountryName} vs. {data.secondTeamCountryName}
        </span>

        <span className={styles.gameDate}>
          {when}
        </span>
        <div className={styles.gameScores}>
          <Team
            code={data.firstTeamCountryCode}
            position="right"
            onChangeText={setFirstTeamPoints}
            points={firstTeamPointsSaved}
            isValide={actualDay < gameDate ? true : false} 
          />
          <IoCloseSharp className={styles.vsIcon}/>
          <Team
            code={data.secondTeamCountryCode}
            position="left"
            onChangeText={setSecondTeamPoints}
            points={secondTeamPointsSaved}
            isValide={actualDay < gameDate ? true : false}
          />
        </div>
        {
          !data.guess && actualDay < gameDate ? (
          <button onClick={onGuessConfirm}>
            <span>
              <p>
                CONFIRMAR PALPITE
              </p>

              <IoCheckmarkSharp className={styles.checkIcon} />
            </span>
          </button>
          ) : 
          <h2>Palpites Encerrados</h2>
        }
      </div>
    </>
  );
}