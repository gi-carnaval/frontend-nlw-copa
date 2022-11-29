import { PoolCardProps } from '../PoolCard/PoolCard';
import { Participants } from '../Participants/Participants';
import { FaWhatsapp, FaRegCopy } from 'react-icons/fa'
import { toast } from 'react-toastify';

import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  data: PoolCardProps;
  // share: () => void;
}

export function PoolHeader({ data }: Props) {

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
        text: `Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${data.code}* ${'\n'}.${'\n'}.${'\n'} https://frontend-nlw-copa.vercel.app/find/${data.code}`
      })
    } else {
      await navigator.clipboard.writeText(`Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${data.code}* ${'\n'}.${'\n'}.${'\n'} https://frontend-nlw-copa.vercel.app/find/${data.code}`)
      return toast.success('Código do bolão copiado com sucesso. Cole em seu Whatsapp e manda pra galera', {
        theme: "colored",
      });  
    }
   }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          {data.title}
        </h1>

        <div className={styles.codeContent} onClick={share}>
          <span className={styles.subtitle}>
            Código: &nbsp;
          </span>

          <span className={styles.code}>
            {data.code} &nbsp;&nbsp;
            <FaRegCopy/>
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