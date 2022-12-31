import react from 'react';
import profileimg from '../../image/profile.jpeg';
import classes from '../../css/Doctors.module.css';
import fireDb from '../../firebase'
import { useState ,useEffect } from 'react';
import { MdPermContactCalendar , MdCall , MdStar} from 'react-icons/md';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../../components/login/Login';


const Doctors = () => {
    
    const fire = fireDb.database().ref();
    const [doctorData, setDoctorData] = useState({});
    const [data , setData] = useState([]);
    const [isShowAvailable, setIsShowAvailable] = useState(false);
    const [isShowContact, setIsShowContact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
        fire.child(`Doctors`).once('value', snapshot => {
            if (snapshot.val() !== null) {
                setDoctorData(
                {...snapshot.val()}
                )
            } else {
                setDoctorData({});    
            }
        }) 
    },[])
    useEffect(() => { 
        var localArray = [];
        for (const key in doctorData) {
            if(Object.hasOwnProperty.call(doctorData, key)) {
                const element = doctorData[key]
                // data.push(element)
                localArray.push(element)  
            }
        }
        setData(localArray)       
    }, [doctorData]);

    const showAvilability = () => {
        setIsShowAvailable(true);
    }
    const closeAvilability = () => {
        setIsShowAvailable(false);
        setIsShowContact(false);
    }
    const showContact = () => {
        setIsShowContact(true);

    }
 const handleBookAppointment = () => {
    setIsShowContact(false);
 setIsOpen(true);
 }
console.log(data)
    return ( <div className={classes.doc_container}>
        <Dialog open={isShowAvailable} onClose={closeAvilability}>
            <DialogContent>
                <table>
                    <tr>
                        <td>Days</td>
                        <td>Time</td>
                    </tr>
                    <tr>
                        <td>Mon-Fri</td>
                        <td>10:00am-1:00pm</td>
                    </tr>
                </table>
            </DialogContent>

        </Dialog>
        <Dialog open={isShowContact} onClose={closeAvilability}>
            <DialogContent>
              <div>
                  call : 0261-3265984

              </div> 
              <button onClick={handleBookAppointment}>Book Appointment</button> 
             
            </DialogContent>

        </Dialog>
        {isOpen ?
        <Login open={isOpen} setIsOpen={setIsOpen} /> : ''
      }  

        {
            data.map((doc) => {
                return (
                    <div className={classes.doc_card}>
            <div className={classes.doc_badge}>
            </div> 
            <div className={classes.badge_icon}>
                   <MdStar/>  
                   <span>4.5</span>
             </div>
            <div className={classes.doctor_data}>
            <img src={doc.photoURL} alt='' className={classes.doc_img} />
            <h3>{doc.FullName}</h3>
            <p>{doc.Address}</p>
            <span>{doc.specialization}</span>
            </div>
            <div className={classes.btn_group}>
                <button className={classes.doc_btn}  onClick={showAvilability}>
                    <span>
                     <MdPermContactCalendar className={classes.doc_btn_icon}/>
                    Avilability   
                    </span>
                    
                </button>
                <button className={classes.doc_btn} onClick={showContact}>
                    <span>
                     <MdCall  className={classes.doc_btn_icon}/>
                    Make a call   
                    </span>
                    </button>
            </div>
        </div>
                )
            })
        }
        
    </div> );
}
 
export default Doctors;