import classes from '../../css/RecentPaitent.module.css';
import {Link} from 'react-router-dom';
import RecentPaitentList from './RecentPaitentList';
const RecentPaitent = () => {
   
    return ( 
        <div className={classes.recent_paitent}>
            <div className={classes.recent_paitent_title}>
                <h3>Recent_paitent Requests</h3>
                {/* <Link to="/"> See All</Link> */}
            </div>
            <div className={classes.recent_paitent_Table}>
                <RecentPaitentList  />
            </div>
           
        </div>
     );
}
 
export default RecentPaitent;