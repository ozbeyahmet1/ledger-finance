import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './Datepicker.module.css'

export interface IAppProps {
}

export default function App (props: IAppProps) {
    const [date, setDate] = React.useState(new Date());
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleChange = (newValue:Date) => {
      setValue(newValue);
    };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <input type="date" onChange={()=>handleChange(value)} className={styles['datePicker__input']}/>

</LocalizationProvider>
  );
}
