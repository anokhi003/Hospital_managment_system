import styles from '../../css/Paitents.module.css';
import classes from '../../css/RecentPaitent.module.css'
import DisplayNumber from "../../components/DisplayNumbers";
import PaitentDataChart from "../../components/PaitentDataChart";
import fireDb from '../../firebase'
import { useState ,useEffect } from 'react';
import {IoIosListBox} from 'react-icons/io';
import {RiMentalHealthFill} from 'react-icons/ri';
import {FaStethoscope , FaUserMd ,FaBed } from 'react-icons/fa';
import style from '../../css/DisplayNumber.module.css';


const Paitents = () => {
    const fire = fireDb.database().ref();
    const [recentPaitentData, setRecentPaitentData] = useState({});
    const [data , setData] = useState([]);

    const displayNumObj= [{
        id: 1,
        subtitle: 'new Patient',
        number: 45,
        icon :  <IoIosListBox  className={style.display_img}/>
    },
    {
        id: 2,
        subtitle: 'Admitted',
        number: 23,
        icon :  <FaBed className={style.display_img}/>
    },
    {
        id: 3,
        subtitle: 'Operation',
        number: 14,
        icon :  <FaStethoscope  className={style.display_img}/>
    },
    {
        id: 4,
        subtitle: 'Recovered',
        number: 50,
        icon :  <RiMentalHealthFill  className={style.display_img}/>
    },
   
]
   
        useEffect(() => {
            fire.child(`paitents`).once('value', snapshot => {
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
    console.log(data)
    return (
        <div className={styles.paitent_container}>
          <div className={classes.recent_table}>
             <div className={styles.no_of_paitent}>
                { displayNumObj.map((displayData) => {
                    return <DisplayNumber  key={displayData.id} subtitle={displayData.subtitle} number={displayData.number} icon={displayData.icon}/>
                })}
                {/* <DisplayNumber subtitle='sdfb' number='25734874' />
                <DisplayNumber subtitle='sdfb' number='25734874' />
                <DisplayNumber subtitle='sdfb' number='25734874' /> */}
            </div>
            
            <div className={styles.paitent_data_group}>
                <PaitentDataChart className={styles.paitents_chart} /> 
                <div className={styles.paitents_table}>
                    <h2>Recent Paitents</h2>
                       <table >
                <thead className={classes.recent_tr}>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Weight</th>
                        <th>Disease</th>
                       
                </thead>
                <tbody>
                    
                    {data.map((data) => {
                                    return (
                                        <tr key={data.uid} className={classes.recent_tr}>
                                            <td>
                                                <img src={data.photoURL} alt='paitent img' className={classes.paitentImg} />
                                                <span >
                                                    <h5 className={classes.paitent_name}>{data.FullName}</h5>
                                                </span>
                                            </td>
                                            <td>{data.Radio}</td>
                                            <td>{data.Weight}kg</td>
                                            <td>{data.Disease}</td>
                                         
                                        </tr>
                                    )
                                })
                            }
                </tbody>
               

            </table>  
                </div>
           
            </div>
            
        </div>   
        </div>
       

    );
}

export default Paitents;