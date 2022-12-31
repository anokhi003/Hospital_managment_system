import { FaUserMd, FaMousePointer, FaExclamationCircle, FaSmile } from 'react-icons/fa';
import { BsFillBagPlusFill } from 'react-icons/bs';
import classes from '../css/Main.module.css';
import { Link } from 'react-router-dom';

const MoethodOfWork = () => {
    const workIconData = [
        {
            id: 1,
            step: 'step 1',
            clickIcon: <FaMousePointer className={classes.w_icon} />,
            description: 'Sign Up'
        },
        {
            id: 2,
            step: 'step 2',
            clickIcon: <FaExclamationCircle className={classes.w_icon} />,
            description: 'Tell Us Your Problem'
        },
        {
            id: 3,
            step: 'step 3',
            clickIcon: <BsFillBagPlusFill className={classes.w_icon} />,
            description: 'Select A Health Plan'
        },
        {
            id: 4,
            step: 'step 4',
            clickIcon: <FaUserMd className={classes.w_icon} />,
            description: 'Expert Consultation'
        },
        {
            id: 5,
            step: 'step 5',
            clickIcon: <FaSmile className={classes.w_icon} />,
            description: 'Receive Your Medicines'
        }
    ]
    return (

        <div className={classes.work_icons_group}>
            <h4>How it Works?</h4>
            Get the best treatment from the comfort of your home or office in just 5 simple steps!
            <div className={classes.work_icon_container}>
                {
                    workIconData.map((w_data) => {
                        return (
                            
                                <div className={classes.w_data} key={w_data.id}>
                                    <div key={w_data.id} className={classes.work_data}>
                                        <span > {w_data.clickIcon} </span>
                                    </div>
                                    <p>{w_data.step}</p>
                                    <p>{w_data.description}</p>
                                    <div className={classes.detail}>
                                        <h3>title</h3>
                                        <p>vbdx jvbd gdf vbcb cvjbd fjhg bdf vbcx vbx cjh</p>
                                        <Link to='/register'>Sing Up</Link>
                                    </div>
                                </div>
                               )
                    })
                }
            </div>
        </div>
    );
}

export default MoethodOfWork;