import classes from '../../css/Medications.module.css'; 
import { IoBagAddOutline } from 'react-icons/io5';
import { GiHypodermicTest } from 'react-icons/gi';
import { BsClipboardData } from 'react-icons/bs';
import { FaHeartbeat } from 'react-icons/fa';
const MedicationContent = () => {
    return (<div className={classes.mec_content}>
        <div className={classes.content_group}>
            <div className={classes.icon_background}>
                <IoBagAddOutline  className={classes.icon}/>
            </div>
            <div className={classes.content_group_title}>
                <h4>PRIMARY CARE</h4>
                <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </div>
        </div>    
        <div className={classes.content_group}>
            <div className={classes.icon_background}>
                <GiHypodermicTest  className={classes.icon}/>
            </div>
            <div className={classes.content_group_title}>
                <h4>LAB TEST</h4>
                <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </div>
        </div>    
        <div className={classes.content_group}>
            <div className={classes.icon_background}>
                <BsClipboardData  className={classes.icon}/>
            </div>
            <div className={classes.content_group_title}>
                <h4>SYMPTOM CHECK</h4>
                <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </div>
        </div>    
        <div className={classes.content_group}>
            <div className={classes.icon_background}>
                <FaHeartbeat className={classes.icon}/>
            </div>
            <div className={classes.content_group_title}>
                <h4>HEART RATE</h4>
                <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
            </div>
        </div>    
    </div>  );
}
 
export default MedicationContent;