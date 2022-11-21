import styles from "./styles.module.scss"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  code: string;
}

export function EmptyMyPoolList({ code }: Props) {

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
        text: `Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${code}*`
      })
    } else {
      await navigator.clipboard.writeText(`Entre no meu bolão e se divirta com os palpites dos jogos!! ${'\n'}.${'\n'}.${'\n'}.${'\n'}Código do Bolão: *${code}*`)
      return toast.success('Código do bolão copiado com sucesso. Cole em seu Whatsapp e manda pra galera', {
        theme: "colored",
      });  
    }
    
   }

  return (
    <div className={styles.emptyPoolListContainer}>
      <span>
        Esse bolão ainda não tem participantes, que tal 
      </span>

      <button onClick={share}>
          <p>
          compartilhar o código
          </p>
      </button>

      <span>
        do bolão com alguém?
      </span>

      <span>
        Use o código
      </span>
      
      <span className={styles.code}> 
        {code}
      </span>
    </div>
  );
}