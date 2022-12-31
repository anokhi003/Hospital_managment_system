import DisplayNumber from "../../components/DisplayNumbers";
import fireDb from '../../firebase'

import classes from '../../css/Main.module.css';
import {IoIosListBox} from 'react-icons/io';
import {FaStethoscope , FaUserMd ,FaMousePointer ,FaExclamationCircle,FaSmile} from 'react-icons/fa';
import {AiFillDollarCircle} from 'react-icons/ai';
import {BsFillBagPlusFill} from 'react-icons/bs';
import { useState ,useEffect } from 'react';
import PaitentDataChart from "../../components/PaitentDataChart";
import BestDoctor from "../../components/BestDoctor";
import Appointment from "../../components/appointment/Appointment";
import RecentPaitent from "../../components/recent-paitent/RecentPaitent";
import MethodOfWork from "../../components/MethodOfWork";
import Footer from "../../components/footer/Footer";

const Main = () => {
   const [noOfDoctor,setNoOfDoctor] = useState(0)
   const [noOfPaitents,setNoOfPaitents] = useState(0)
   const fire = fireDb.database().ref();

    useEffect(() => {
        fire.child(`Doctors`).once('value', snapshot => {
            if (snapshot.val() !== null) {
              setNoOfDoctor( snapshot.numChildren() )
            } 
        }) 
        fire.child(`paitents`).once('value', snapshot => {
            if (snapshot.val() !== null) {
                setNoOfPaitents( snapshot.numChildren() )
            } 
        }) 
    },[])
    console.log(noOfDoctor)
    const displayNumObj= [{
        id: 1,
        subtitle: 'new Patient',
        number: `${noOfPaitents}`,
        icon :  <IoIosListBox  className={classes.display_img}/>
    },
    {
        id: 2,
        subtitle: 'Our Doctor',
        number:`${noOfDoctor}`,
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
                {/* <DisplayNumber subtitle='sdfb' number='25734874' />
                <DisplayNumber subtitle='sdfb' number='25734874' />
                <DisplayNumber subtitle='sdfb' number='25734874' /> */}
            </div>
            <div className={classes.MiddleDiv}>
              <PaitentDataChart /> 
              <BestDoctor />  
              
            </div>
            {/* <div >
                <Appointment />
                <RecentPaitent />
            </div> */}
          
                 <MethodOfWork />
          </div>
           
        </div>
    );
}

export default Main;