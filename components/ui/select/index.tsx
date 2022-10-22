import * as React from 'react';
import styles from './select.module.css'

export interface IAppProps {
    value:string;
    onChange:Function;
    mapValue:{
        value:string;
        text:string;
    }[];
}

export default function App (props: IAppProps) {
  return (
    <div className={styles["selectWrapper"]}>
    <select
      value={props.value}
      onChange={()=>props.onChange}
      className={styles[`select`]}
    >
      {props.mapValue.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  </div>
  );
}
