 
 import classes from '../../css/Appointment.module.css';
import {Link} from 'react-router-dom';
import AppointmentTable from './AppointmentTable';
const Appointment = () => {
   
    return ( 
        <div className={classes.appointment}>
            <div className={classes.appointment_title}>
                <h3>Appointment Requests</h3>
                <Link to="/"> See All</Link>
            </div>
            <div className={classes.appointment_Table}>
                <AppointmentTable  />
            </div>
           
        </div>
     );
}
 
export default Appointment;