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
}

export function Team({ code, position, onChangeText, points = null, guess, gameHappened }: Props) {
  return (
    <div className={styles.content}>
      {position === 'left' && <><span className={styles.codeCountry}>{code}</span><ReactCountryFlag countryCode={code} svg className={styles.flagsLeft}/></>}
      <Input
        type='number'
        disabled={(points != null || gameHappened) ? true : false}
        onChange={(event: { target: { value: string; }; }) => onChangeText(event.target.value)}
        placeholder={points != null ? points : gameHappened ? '*' : null}
      />
      {position === 'right' && <><ReactCountryFlag countryCode={code} svg className={styles.flagsRight}/><span className={styles.codeCountry}>{code}</span></>}
    </div>
  );
}