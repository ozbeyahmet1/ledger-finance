import * as React from 'react';
import styles from './input.module.css'

export interface IAppProps {
    func:Function;
    value:string;
    disabled:boolean;
    inputClass:string;
    placeholder:string;
}

export default function App (props: IAppProps) {
  return (
    <div className={props.disabled ? styles[`profile__input--disabled`] : styles['profile__input']}>
    <input
      type="text"
      placeholder={props.placeholder}
      onChange={()=>props.func()}
      value={props.value}
      disabled={props.disabled ? true : false}
    />
  </div>
  );
}
