import MedicationContent from "./MedicationContent";
import classes from '../../css/Medications.module.css';
import dentalImg from '../../image/images.jpg'

const Dental = () => {
    return ( 
    <div className={classes.medication_group}>
        <div className={classes.depart_title}>
        <h3>Dental  Departments</h3>
        <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word.</p>
        <MedicationContent />
    </div> 
    <div className={classes.img_container}>
                <img src={dentalImg} alt="" />
            </div>
    </div>
    );
}
 
export default Dental;