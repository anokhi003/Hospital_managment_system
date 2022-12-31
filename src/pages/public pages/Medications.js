import classes from '../../css/Medications.module.css';
import { useState } from "react";
import Neurology from '../../components/medications/Neurology';
import Surgical from '../../components/medications/Surgical';
import Dental from '../../components/medications/Dental';
import Ophthalmology from '../../components/medications/Ophthalmology';
import Cardiology from '../../components/medications/Cardiology';


const Medications = () => {
    const [activeTab, setActiveTab] = useState("tab1");


    const handleClickTab1 = () => { setActiveTab("tab1") }
    const handleClickTab2 = () => { setActiveTab("tab2") }
    const handleClickTab3 = () => { setActiveTab("tab3") }
    const handleClickTab4 = () => { setActiveTab("tab4") }
    const handleClickTab5 = () => { setActiveTab("tab5") }

    return (
        <div>
            <div className={classes.Medic_title}>
                <h2>Clinic Departments</h2>
                <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
            </div>
            <div className={classes.medic_tab}>
                <ul className={classes.medic_tab_group} >
                    <div className={classes.tab_li_div}>
                        <li onClick={handleClickTab1} className={`${classes.tab_list} ${activeTab === "tab1" ? classes.tab_active : ""}`}>Neurology</li>
                    </div>
                    <div className={classes.tab_li_div}>
                        <li onClick={handleClickTab2} className={`${classes.tab_list} ${activeTab === "tab2" ? classes.tab_active : ""}`}>Surgical</li>
                    </div>
                    <div className={classes.tab_li_div}>
                        <li onClick={handleClickTab3} className={`${classes.tab_list} ${activeTab === "tab3" ? classes.tab_active : ""}`}>Dental</li>
                    </div>
                    <div className={classes.tab_li_div}>
                        <li onClick={handleClickTab4} className={`${classes.tab_list} ${activeTab === "tab4" ? classes.tab_active : ""}`}>Ophthalmology</li>
                    </div>
                    <div className={classes.tab_li_div}>
                        <li onClick={handleClickTab5} className={`${classes.tab_list} ${activeTab === "tab5" ? classes.tab_active : ""}`}>Cardiology</li>
                    </div>

                </ul>
                <div className={classes.tab_content}>
                    {activeTab === "tab1" && (<Neurology />)}
                    {activeTab === "tab2" && (<Surgical />)}
                    {activeTab === "tab3" && (<Dental />)}
                    {activeTab === "tab4" && (<Ophthalmology />)}
                    {activeTab === "tab5" && (<Cardiology />)}
                </div>
            </div>



        </div>
    );
}

export default Medications;