import classes from "../css/Slider.module.css"
import { FaUserMd } from "react-icons/fa"
import { RiLogoutBoxRFill } from "react-icons/ri"

const AdminRoute = [
    {
        id:1,
        navigate:"/doctor",
        icon: <FaUserMd className={classes.icon} />,
        navName :"Doctor",
        Click:""
    },
    {
        id:2,
        navigate:"/appointment_list",
        icon: <FaUserMd className={classes.icon} />,
        navName:"Appointment",
        Click :""
    },
    {
        id:3,
        navigate:"/doctor_achievement",
        icon: <FaUserMd className={classes.icon} />,
        navName:"Achievement",
        Click:""
    },
    
]

 
export default AdminRoute;