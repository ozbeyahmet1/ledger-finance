import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './Datepicker.module.css'
import { CalendarPicker } from '@mui/x-date-pickers';

export interface IAppProps {
  date:Date;
  setDate:Function;
}

export default function App (props: IAppProps) {
    const [date, setDate] = React.useState(props.date);
    const [value, setValue] = React.useState(new Date());
    const handleChange = (newValue:Date) => {
      setValue(newValue);
    };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <CalendarPicker date={props.date} onChange={(newDate:any) => props.setDate(newDate)}  className={styles['datepicker']}/>
      
</LocalizationProvider>
  );
}
