import DisplayNumber from "../../components/DisplayNumbers";
import classes from '../../css/Main.module.css';
import {IoIosListBox} from 'react-icons/io';
import {FaStethoscope , FaUserMd } from 'react-icons/fa';
import {AiFillDollarCircle} from 'react-icons/ai';
import PaitentDataChart from "../../components/PaitentDataChart";
import BestDoctor from "../../components/BestDoctor";
import Appointment from "../../components/appointment/Appointment";
import RecentPaitent from "../../components/recent-paitent/RecentPaitent";

const Doctor = () => {
    const displayNumObj= [{
        id: 1,
        subtitle: 'new Patient',
        number: 45,
        icon :  <IoIosListBox  className={classes.display_img}/>
    },
    {
        id: 2,
        subtitle: 'Our Doctor',
        number: 23,
        icon :  <FaUserMd className={classes.display_img}/>
    },
    {
        id: 3,
        subtitle: 'Opretion',
        number: 14,
        icon :  <FaStethoscope  className={classes.display_img}/>
    },
    {
        id: 4,
        subtitle: 'Income',
        number:'$5728',
        icon :  <AiFillDollarCircle  className={classes.display_img}/>
    }
]

 
    return (
        <div className={classes.background}>
            <div className={classes.container}>
            <div className={classes.displayNum}>
                { displayNumObj.map((displayData) => {
                    return <DisplayNumber  key={displayData.id} subtitle={displayData.subtitle} number={displayData.number} icon={displayData.icon}/>
                })}
            </div>
            <div className={classes.MiddleDiv}>
              <PaitentDataChart /> 
              <BestDoctor />  
              
            </div>
            <div className={classes.data_tables} >
                <Appointment />
                <RecentPaitent />
            </div>
          </div>
            <footer>
                contact us: 0261-3639845
            </footer>
           
        </div>
    );
}

export default Doctor;