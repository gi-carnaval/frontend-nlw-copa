import Link from 'next/link';
import { Participants, ParticipantProps } from '../Participants/Participants';
import styles from './styles.module.scss'

export interface PoolCardProps extends React.HTMLProps<HTMLButtonElement> {
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

interface Props {
  data: PoolCardProps;
}

export function PoolCard({ data, ...rest }: Props) {
  return (
      <Link className={styles.poolCard} href={`details/${data.id}`}>
        <section className={styles.details}>
          <h1>
            {data.title}
          </h1>

          <span className={styles.createdBy}>
            Criado por {data.owner.name}
          </span>
        </section>

        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </Link>
    
  );
}