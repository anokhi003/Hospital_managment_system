import classes from '../../css/Header.module.css';
import { useContext, useState, useEffect } from 'react';
import fireDb from '../../firebase'


import { MdNotifications } from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import profileimg from '../../image/profile.jpeg';
import { AuthContext } from '../../store/auth-context';
import { FaUserMd, FaMedal, FaUserGraduate } from 'react-icons/fa';
import { MdCall, MdLocationOn, MdMail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

    const { user } = useContext(AuthContext);
    const fire = fireDb.database().ref();

    const [isToggleProfile, setIsToggleProfile] = useState(false);
    const [userObj, setUserObj] = useState({});
    
    const navigate = useNavigate()
    useEffect(() => {
        if (user !== null) {
            fire.child(`Doctors/${user.uid}`).once('value', snapshot => {
                if (snapshot.val() !== null) {
                    setUserObj({ ...snapshot.val() })
                }    
            })
        }
    }, [user])
      
    const handleToggleProfile = () => {
        if (isToggleProfile) { setIsToggleProfile(false) }
        else if (!isToggleProfile) { setIsToggleProfile(true) }
    }

    
    return (<>
        <div className={classes.user_data}>
            <button className={`${classes.toggle_profile} ${classes.notify}`} >
                <div className={classes.budge} />
                <MdNotifications className={`${classes.Icon_color} `} />
            </button>
            {user ? (<>
                <img src={user.photoURL} alt='user' className={classes.profileImg} />
                <p>{user.displayName}</p>
                <div className={classes.toggle}>
                    <button className={classes.toggle_profile} onClick={handleToggleProfile}><GoTriangleDown className={classes.Icon_color} /></button>
                    {isToggleProfile ? (<div className={classes.dropdown_content}>
                        <div className={classes.toggle_data}><FaUserMd className={classes.toggle_icons} /><p>{userObj.FullName}</p> </div>
                        <div className={classes.toggle_data}><MdMail className={classes.toggle_icons} /><p>{userObj.email}</p> </div>
                        <div className={classes.toggle_data}><FaMedal className={classes.toggle_icons} /><p>{userObj.specialization}</p> </div>
                        <div className={classes.toggle_data}><MdLocationOn className={classes.toggle_icons} /><p>{userObj.Address}</p> </div>
                        <div className={classes.toggle_data}><MdCall className={classes.toggle_icons} /><p>{userObj.moblieNo}</p> </div>
                        <div className={classes.toggle_data}><FaUserGraduate className={classes.toggle_icons} /><p>{!!userObj.Degree ? userObj.Degree.substring(0, 4) : ""}</p> </div>

                    </div>) : ""}
                </div> </>)
                : (<>
                    <img src={profileimg} alt='user' className={classes.profileImg} />
                    <p>userName</p>
                    <div className={classes.toggle}>
                        <button className={classes.toggle_profile} onClick={handleToggleProfile}><GoTriangleDown className={classes.Icon_color} /></button>
                        {isToggleProfile ? (<div className={`${classes.dropdown_content} ${classes.dropdown_content1}`}>
                            <button onClick={() => navigate("/register")} className={classes.button}>Login</button>
                        </div>) : ""}
                    </div>
                </>)}

        </div>

    </>

    );
}

export default UserProfile;