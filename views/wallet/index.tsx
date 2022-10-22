import * as React from "react"
import TransactionCard from "../../components/cards/transactionCard"
import styles from "./wallet.module.css"
import BalanceCard from '../../components/cards/balanceCard'
import {Add,CloseOutlined,AccessTimeOutlined} from '@mui/icons-material';
// import { AnimatePresence } from "framer-motion";
// import Modal from "../../components/ui/modal";
import DatePicker from '../../components/ui/datepicker'
import Selects from '../../components/ui/select'
import Inputs from '../../components/ui/input'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export interface IAppProps {}

export default function App(props: IAppProps) {
    const [clicked,setClicked]=React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const type_options = [
      { value: "Income", text: "Income" },
      { value: "Outcome", text: "Outcome" },
    ];
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const categories_options = [
      { value: "Housing", text: "Housing" },
      { value: "Transportation", text: "Transportation" },
      { value: "Food", text: "Food" },
      { value: "Utilities", text: "Utilities" },
      { value: "Clothing", text: "Clothing" },
      { value: "Medical/Healthcare", text: "Medical/Healthcare" },
      { value: "Personal", text: "Personal" },
      { value: "Education", text: "Education" },
      { value: "Entertainment", text: "Entertainment" },
    ]

    const [formInfo, setFormInfo] = React.useState({
      type: "Income",
      category:"Housing",
      date: "",
      description: "",
      headline: "",
      value: "",
    });

    const sendPosts = () =>{
      console.log("hi")
    }

  return (
    <div className={styles["wallet"]}>

      <div className={styles["wallet__content"]}>

        {/*Left side of wallet**/}
        <div className={styles["wallet--left"]}>
          <BalanceCard background="purple" />
          <div
            className={styles["wallet__addNewTransaction"]}
            onClick={handleOpen}
          >
            <Add />
            <h3>Add New Transaction </h3>
          </div>
        </div>
        
        {/*Right side of wallet*/} {/*Approve stashing transactions*/}
        <div className={styles["wallet--right"]}>
          <div className={styles["wallet__filters"]}>
            <h3>Sort By : Asc</h3>
            <h3>Sort By : Asc</h3>
            <h3>Sort By : Asc</h3>
            <h3>Sort By : Asc</h3>
          </div>
          <div className={styles["wallet__transactionWrapper"]}>
            <h4>Stashing Transactions</h4>

            {/* {transactions.map((transaction, id) => {
              return <TransactionCard transaction={transaction} key={id} />
            })} */}
                <TransactionCard
                    date='5/12/12'
                    headline='Maaş'
                    value={300}
                    type="income"
                    description='desc'
                    category='Housing'
                />

                <TransactionCard
                    date='5/12/12'
                    headline='Maaş'
                    value={300}
                    type="income"
                    description='desc'
                    category='Housing'
                />
            <h3 className={styles["wallet__pushButton"]}>Push to Blockchain</h3>
          </div>
        </div>
      </div>

      {/*Modal Starts**/}
      {/* <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      > */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>

      {/* </AnimatePresence> */}
      {/*Modal Ends**/}

    </div>
  )
}
