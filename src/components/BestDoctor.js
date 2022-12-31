import classes from '../css/BestDoctor.module.css'
import profileimg from '../image/profile.jpeg' 
const BestDoctor = () => {
    //dropdown menu of years
    const generateObjectOfYears = () => {
        var max = new Date().getFullYear();
        var min = max-10 ;
        var years= []

        for( var i=max ; i>=min ; i--){
            years.push(i);
        }
        return years;
    }
    const Years =  generateObjectOfYears();
    // map of doctor data
    const doctorData =[
        {
            id:1,
            name :'Experiences',
            value: '7 Years'
        },
        {
            id:2,
            name :'Patients',
            value: 2598
        },
        {
            id:3,
            name :'Reviwes',
            value: 1580
        }
    ]
    return ( 
        <div className={classes.bestDoctor}>
              <div className={classes.DoctorTitle}>
                <h4>Best Doctor</h4>
                <select className={classes.selectYr}>
                   { Years.map((yr) => {
                       return <option key={yr} className={classes.optionYr}>{yr}</option> 
                   }
                  )}
               
                </select>

            </div>
            <div className={classes.DoctorData}>
                <img src={profileimg} alt='james smith' />
                <h3>Dr.James Smith</h3>
                <p >Endocrinologist -City Hospital</p>
            </div>
            <div className={classes.doctorDatalist}>
                   {
                       doctorData.map((data) => {
                           return (
                               <div className={classes.doc_number} key={data.id}> 
                                 <p>{data.name}</p>
                               <div>{data.value}</div>
                               </div>
                            
                           )
                       })
                   }
            </div>
        </div>
     );
}
 
export default BestDoctor;