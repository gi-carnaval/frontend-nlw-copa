import { useState, useEffect } from 'react'
import Image from "next/image";

import styles from './styles.module.scss'
import { api } from '../../lib/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ParticipantCardProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

interface Props {
  // poolId: string
  participants: ParticipantCardProps[];
  // count: number;
};

export function ParticipantsCard({ participants }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={styles.participants}>
      <>
      {
        
        participants ? participants.map((participant) => (
          <div className={styles.participant} key={participant.id}>
            <Image className={styles.avatarImg}alt="avatar" src={participant.user.avatarUrl} width={60} height={60} />
            <span>{participant.user?.name?.toUpperCase()}</span>
          </div>
        )) : null
      }
      
      </>
    </div>
  );
}