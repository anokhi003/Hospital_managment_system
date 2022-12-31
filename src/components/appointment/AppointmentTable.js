import classes from '../../css/Appointment.module.css'
import profileimg from '../../image/profile.jpeg';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import fireDb from '../../firebase'
import { useState ,useEffect } from 'react';


const AppointmentTable = () => {
    const fire = fireDb.database().ref();
    const [recentPaitentData, setRecentPaitentData] = useState({});
    const [data , setData] = useState([]);
    
   
        useEffect(() => {
            fire.child(`Appointments`).once('value', snapshot => {
                if (snapshot.val() !== null) {
                    setRecentPaitentData(
                    {...snapshot.val()}
                    )
                    console.log(snapshot.val() ,"snapshot");
                    console.log(recentPaitentData)
                } else {
                    setRecentPaitentData({});
                    console.log(snapshot.val() ,"snapshot");
                }
            }) 
        },[])

        useEffect(() => { 
            var localArray = [];
            for (const key in recentPaitentData) {
                if(Object.hasOwnProperty.call(recentPaitentData, key)) {
                    const element = recentPaitentData[key]
                    // data.push(element)
                    localArray.push(element)  
                    console.log(element)
                }
            }
            setData(localArray)
           console.log(localArray)
        }, [recentPaitentData])
    
   
        
    const handleAppoitReceived = (AppoData) => {
 
     fire.child(`paitents/${AppoData.uid}`).set({
        ...AppoData,
        Status: "Received"
        })
    console.log("removing data")
  
    fireDb.database().ref('Appointments/').child(`${AppoData.uid}`).remove()
    window.location.reload(false);
        
    }
    const handleAppoitcancle = (AppoData) => {
 
     fire.child(`paitents/${AppoData.uid}`).set({
        ...AppoData,
        Status: "cancled"
        })
    console.log("removing data")
  
    fireDb.database().ref('Appointments/').child(`${AppoData.uid}`).remove()
    window.location.reload(false);
        
    }
   
    return (
        <div className={classes.app_table}>
            <table >
                <tbody>
                   {data.map((AppoData) => {
                    return (
                        <tr key={AppoData.uid} className={classes.app_tr}>
                            <td><img src={AppoData.photoURL} alt='paitent img' className={classes.paitentImg} />
                            <span className={classes.paitent_name}>
                                <h5>{AppoData.FullName}</h5>
                                <p>{AppoData.Disease}</p>
                            </span>
                            </td>
                            
                            <td>{AppoData.uid}</td>
                            <td>{AppoData.AppoiDate}-{AppoData.AppoiTime}</td>
                            <td>
                                <button onClick={() =>  handleAppoitReceived(AppoData)}><AiOutlineCheckCircle className={classes.icon_check}/></button>
                                <button onClick={() =>  handleAppoitcancle(AppoData)}><AiOutlineCloseCircle className={classes.icon_cancle}/></button>
                            </td>

                        </tr>
                    )
                })
                } 
                </tbody>
                

            </table>
        </div>

    );
}

export default AppointmentTable;