import Image from 'next/image';
import * as React from 'react';
import styles from './newsCard.module.css'

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div className={styles['new']}>
    <Image 
        src="https://res.cloudinary.com/droheqpxn/image/upload/v1659798598/ledger/https_3A_2F_2Fd1e00ek4ebabms.cloudfront.net_2Fproduction_2Fcd1e2d17-ec02-45ed-bb1e-08b1fbedc66d_hgh6zg.jpg"
        width={150}
        height={150}
    />
    <div>
        <h2>Pfizer in talks to buy Global Blood</h2>
        <h5>Pfizer is close to acquiring Global Blood Therapeutics..</h5>
    </div>
</div>
  );
}
