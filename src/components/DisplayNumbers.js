import classes from '../css/DisplayNumber.module.css'

const DisplayNumber = (props) => {
    return ( 
        <div className={classes.display_num}>
            <div className={classes.displayNumber}>
                <h2 className={classes.number}>{props.number}</h2>
                <p className={classes.title}>{props.subtitle}</p>
            </div>
            <div className={classes.display_box}>
                {props.icon}
            </div>
        </div>
     );
}
 
export default DisplayNumber;