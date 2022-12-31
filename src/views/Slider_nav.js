import React, { useContext, useState , useEffect } from 'react';
import classes from '../css/Slider.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiDashboardFill, RiLogoutBoxRFill, RiSettings5Fill } from "react-icons/ri";
import { FaUserMd, FaBriefcaseMedical, FaOdnoklassniki } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { AuthContext } from '../store/auth-context';
import { getAuth } from 'firebase/auth';
import fireDb from '../firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PublicRoute from "../Routes/PublicRoute";
import AdminRoute from '../Routes/AdminRoutes';
import PaitentRoute from '../Routes/PaitentRoute';



const SliderNav = () => {
    const { user } = useContext(AuthContext);
    
    const [modalOpen, setIsModalOpen] = useState(false);
    const [admin,setAdmin] = useState(null)
    const [paitent,setPaitent] = useState(null)

    const fire = fireDb.database().ref();

// console.log(user)
    useEffect(() => {
        if (user !== null) {
            fire.child(`Doctors/${user.uid}`).once('value', snapshot => {
                if (snapshot.val().type === "Admin") {
                    // console.log(snapshot.val().type,'if')
                    setAdmin({...snapshot.val()})
                }
                else{
                    // console.log(snapshot.val().type,'else')
                    setAdmin(null)
                }
            })
            // console.log(admin,'admin' )
        } 
        if(user !== null){
            fire.child(`paitents/${user.uid}`).once('value', snapshot => {
                if (snapshot.val().type === "Paitent") {
                    // console.log(snapshot.val().type,'if')
                    setPaitent({...snapshot.val()})
                }
                else{
                    // console.log(snapshot.val().type,'else')
                    setPaitent(null)
                }
        }    
    )}
    }
   , [user])

    const navigate = useNavigate();
    const logoutHandler = () => {
        setIsModalOpen(true);
    }

    const SubmitHandler = () => {
        const auth = getAuth(fireDb);
        auth.signOut().then(() => {
            navigate('/register')
            window.location.reload(false)
        }).catch((err) => { console.log(err) });

        setIsModalOpen(false);
    }   
    
    const handleClose = () => {
        setIsModalOpen(false);
    };
  return (
        <>
            {modalOpen ? (<Dialog  open={modalOpen} onClose={handleClose}>
                <DialogTitle>Logout</DialogTitle>
                <DialogContent>
                    Do you want to logOut?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        cancle
                    </Button>
                    <Button onClick={SubmitHandler}>logout</Button>
                </DialogActions>
            </Dialog>) : ''}
            <div className={classes.slider}>
                <div className={classes.slider_group}>
                    <h1 > <a href="/" className={classes.title}>Hospital App</a></h1>
                    <div className={classes.navlink_group}>
                 
                           {!user ?  PublicRoute.map((route) => {
                                return (
                                    <NavLink  key ={route.id} className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to={route.navigate}   >
                            {route.icon}<span>{route.navName}</span> 
                        </NavLink>
                                )
                            }): ""
                        } 
                        {user && admin ? AdminRoute.map((paiRoute) => {
                            return (
                                <NavLink  key ={paiRoute.id} className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to={paiRoute.navigate} onClick={paiRoute.Click}   >
                                {paiRoute.icon}<span>{paiRoute.navName}</span> 
                            </NavLink>
                            )
                        })
                        
                        : " "

                        }
                        { user && paitent ? PaitentRoute.map((docRoute) => {
                            return (
                                <NavLink  key ={docRoute.id} className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to={docRoute.navigate} onClick={docRoute.Click}   >
                                {docRoute.icon}<span>{docRoute.navName}</span> 
                            </NavLink>
                            )
                        }): ""}
                        
                        {user  ?(<NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/logout' onClick={logoutHandler} >
                            <RiLogoutBoxRFill className={classes.icon} />  <span>Logout</span>
                        </NavLink>) : ""}
                    
                    
                   
                     
{/*                         
                       {admin ? ( <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/doctor'   >
                            <FaUserMd className={classes.icon} /> <span>Doctor</span> 
                        </NavLink>) :
                        ( <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/Doctors'   >
                        <FaUserMd className={classes.icon} /> <span>Doctors</span> 
                    </NavLink>)
                        }
                       <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/patients'   >
                            <FaOdnoklassniki className={classes.icon} /> <span>Patients</span>
                        </NavLink>
                        <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/medications'   >
                            <FaBriefcaseMedical className={classes.icon} /><span>Medications</span>
                        </NavLink>
                        <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/Documents'   >
                            <MdDocumentScanner className={classes.icon} />  <span>Documents</span>
                        </NavLink>
                        {admin ? (<NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/Settings'   >
                            <RiSettings5Fill className={classes.icon} />  <span>Settings</span>
                        </NavLink>) : ''}
                        {!!user ? (<NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/logout' onClick={logoutHandler} >
                            <RiLogoutBoxRFill className={classes.icon} />  <span>Logout</span>
                        </NavLink>) : ''}
                        {!user ? (<NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink} to='/register'    >
                            <RiLogoutBoxRFill className={classes.icon} /> <span>Login/Register</span> 
                        </NavLink>) : ''} */}
                    </div>
                </div>

            </div>
        </>
    );
}


export default SliderNav;