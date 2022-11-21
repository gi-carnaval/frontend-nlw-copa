// import { HStack } from 'native-base';
import ReactCountryFlag from "react-country-flag"

import styles from "./styles.module.scss"

import { Input } from '../Input/Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  points?: number | string | null
}

export function Team({ code, position, onChangeText, points = null }: Props) {
  return (
    <div className={styles.content}>
      {position === 'left' && <ReactCountryFlag countryCode={code} svg style={{fontSize: '3em', lineHeight: '2em', marginRight: 12}}/>}

      <Input
        type='number'
        disabled={points ? true : false}
        onChange={(event: { target: { value: string; }; }) => onChangeText(event.target.value)}
        placeholder={points ? String(points) : null}
      />

      {position === 'right' && <ReactCountryFlag countryCode={code} svg style={{fontSize: '3em', lineHeight: '2em', marginLeft: 12}}/>}
    </div>
  );
}