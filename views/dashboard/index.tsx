import * as React from 'react';
import styles from './dashboard.module.css'
import RightBar from '../../components/layout/rightBar'
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div className={styles['dashboard']}>
        deneme
        <RightBar />
    </div>
  );
}
