import * as React from "react"
import styles from "./backdrop.module.css"
import { motion } from "framer-motion";

export interface IAppProps {
  children: React.ReactNode
  onClick: Function
}

export default function App(props: IAppProps) {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={()=>props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  )
}
