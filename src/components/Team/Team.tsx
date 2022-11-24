// import { HStack } from 'native-base';
import ReactCountryFlag from "react-country-flag"

import styles from "./styles.module.scss"

import { Input } from '../Input/Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  points?: number | string | null;
  guess: boolean;
  gameHappened: boolean;
  // isValide: boolean;
}

export function Team({ code, position, onChangeText, points = null, guess, gameHappened }: Props) {
  return (
    <div className={styles.content}>
      {position === 'left' && <><ReactCountryFlag countryCode={code}  style={{fontSize: '1.5rem', lineHeight: 'em', marginRight: 12}}/><ReactCountryFlag countryCode={code} svg className={styles.flagsLeft}/></>}
      
      <Input
        type='number'
        disabled={(points || gameHappened) ? true : false}
        onChange={(event: { target: { value: string; }; }) => onChangeText(event.target.value)}
        placeholder={points ? String(points) : gameHappened ? '*' : null}
      />
      

      {position === 'right' && <><ReactCountryFlag countryCode={code} svg className={styles.flagsRight}/><ReactCountryFlag countryCode={code} style={{fontSize: '1.5rem', lineHeight: '2em', marginLeft: 12}}/></>}
    </div>
  );
}