import { PoolCardProps } from '../PoolCard/PoolCard';
import { Participants } from '../Participants/Participants';
import { FaWhatsapp } from 'react-icons/fa'

import styles from './styles.module.scss'

interface Props {
  data: PoolCardProps;
  share: () => void;
}

export function PoolHeader({ data, share }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          {data.title}
        </h1>

        <div className={styles.codeContent}>
          <span className={styles.subtitle}>
            Código: &nbsp;
          </span>

          <span className={styles.code}>
            {data.code}
          </span>
        </div>
      </div>
      <button 
        className={styles.shareButton}
        onClick={share}
      >
        <h4>Compartilhar código</h4>
        <FaWhatsapp />
      </button>

      <Participants
        count={data._count?.participants}
        participants={data.participants}
      />
    </div>
  );
}