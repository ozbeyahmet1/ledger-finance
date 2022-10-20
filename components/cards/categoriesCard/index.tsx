import * as React from "react"
import styles from './categoriesCard.module.css'
import { PieChart } from 'react-minimal-pie-chart';

export interface IAppProps {
  color:string;
}

export default function App(props: IAppProps) {
  return (
    <div className={styles["categories"]}>
      <div className={styles["categories__elements"]}>
        <div className={styles["cateogories__element--single"]}>
          <div className={styles["categories__circle--yellow"]}></div>
          <h4>Fixed</h4>
        </div>
        <div className={styles["cateogories__element--single"]}>
          <div className={styles["categories__circle--orange"]}></div>
          <h4>Clothes</h4>
        </div>
        <div className={styles["cateogories__element--single"]}>
          <div className={styles["categories__circle--red"]}></div>
          <h4>Others</h4>
        </div>
        <div className={styles["cateogories__element--single"]}>
          <div className={styles["categories__circle--blue"]}></div>
          <h4>Food</h4>
        </div>
      </div>
      <div>
        <PieChart
          className={styles["categories__pieChart"]}
          lineWidth={40}
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
            { title: "Four", value: 10, color: "#314cc2" }
          ]}
        />
      </div>
    </div>
  )
}
