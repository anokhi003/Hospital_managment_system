import classes from '../../css/RecentPaitent.module.css'
import profileimg from '../../image/profile.jpeg';
import fireDb from '../../firebase'
import { useState ,useEffect } from 'react';

const RecentPaitentList = () => {
    const fire = fireDb.database().ref();
    const [recentPaitentData, setRecentPaitentData] = useState({});
    const [data , setData] = useState([]);

   
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
        
        <div className={classes.recent_table}>
          
            <table >
                <thead className={classes.recent_tr}>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Weight</th>
                        <th>Disease</th>
                        <th>Date</th>
                        <th>Status</th>
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
                                            <td>{data.AppoiDate}</td>
                                            <td>{data.Status}</td>
                                        </tr>
                                    )
                                })
                            }
                </tbody>
               

            </table>
        </div>

    );
}

export default RecentPaitentList;