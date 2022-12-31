import { RiDashboardFill  ,RiLogoutBoxRFill} from 'react-icons/ri';
import { FaUserMd ,FaOdnoklassniki ,FaBriefcaseMedical } from 'react-icons/fa';
import { MdCall } from 'react-icons/md';
import classes from "../css/Slider.module.css"

const PublicRoute = [
    {
        id:1,
        navigate:"/",
        icon:  <RiDashboardFill className={classes.icon} />,
        navName: "Dashboard"
    },
    {
        id:2,
        navigate:"/Doctors",
        icon: <FaUserMd className={classes.icon} />,
        navName :"Doctors"
    },
    {
        id:3,
        navigate:"/patients",
        icon:<FaOdnoklassniki className={classes.icon} />,
        navName :"Patients"
    },
    {
        id:4,
        navigate:"/medications",
        icon:<FaBriefcaseMedical className={classes.icon} />,
        navName:"Medications"
    },
    {
        id:5,
        navigate:"/contactUs",
        icon:<MdCall className={classes.icon} />,
        navName:"Contact us"
    },
    {
        id:6,
        navigate:"/register",
        icon:<RiLogoutBoxRFill className={classes.icon} /> ,
        navName:"Login/Register"
    }
]
     
    export default PublicRoute;