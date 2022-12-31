import classes from "../css/Slider.module.css"
import { FaUserMd } from "react-icons/fa"
import { RiLogoutBoxRFill  ,RiDashboardFill} from "react-icons/ri"
 
 const PaitentRoute = [
{
    id:1,
    navigate:"/paitent_profile",
    icon:  <RiDashboardFill className={classes.icon} />,
    navName: "My Profile"
},
{
    id:2,
    navigate:"/paitent_appointments",
    icon:  <RiDashboardFill className={classes.icon} />,
    navName: "Appointment"
},
{
    id:3,
    navigate:"/reports",
    icon:  <RiDashboardFill className={classes.icon} />,
    navName : "Reports"
},
{
    id:4,
    navigate:"/paitent_documents",
    icon:  <RiDashboardFill className={classes.icon} />,
    navName :"Documents"
}
 ]
 
export default PaitentRoute;