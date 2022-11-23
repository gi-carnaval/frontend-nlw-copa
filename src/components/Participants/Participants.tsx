import Image from "next/image";

import styles from './styles.module.scss'

export interface ParticipantProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

interface Props {
  participants: ParticipantProps[];
  count: number;
};

export function Participants({participants, count }: Props) {
  return (
    <div className={styles.participants}>
      <>
      {
        participants && participants.map((participant, index) => index < 3 &&(
          <div className={styles.participant} key={participant.id}>
            <Image className={styles.avatarImg}alt="avatar" src={participant.user.avatarUrl} width={40} height={40} />
            <span>{participant.user?.name?.at(0)?.toUpperCase()}</span>
          </div>
        ))
      }
      { count > 3 ? 
        <div className={styles.hiddenAvatar}>
        <p>
          {count ? `+${count - 3}` : 0}
        </p>
      </div>
      : null}
      
      </>
    </div>
  );
}