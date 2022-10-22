import * as React from 'react';
// import { motion } from "framer-motion";
import Backdrop from "../backdrop";
import styles from "./modal.module.css";

export interface IAppProps {
    handleClose:Function;
    children:React.ReactNode;
}

export default function App (props: IAppProps) {
    const dropIn = {
        hidden: {
          y: "-100vh",
          opacity: 0,
        },
        visible: {
          y: "0",
          opacity: 1,
          transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
          },
        },
        exit: {
          y: "100vh",
          opacity: 0,
        },
      };

  return (
  <div>asd</div>
  );
}
