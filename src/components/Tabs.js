import { useState } from "react";
import classes from '../css/Register.module.css';
import PaitentRegister from "../pages/public pages/PaitentRegister";
import Register from "../pages/public pages/Register";
const Tabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");


    const handleClickTab1 = () => {
        setActiveTab("tab1");
    }
    const handleClickTab2 = () => {
        setActiveTab("tab2");
    }
    
    return (
      <div className={classes.register}>
        {/* Tab nav */}
        <ul className={classes.tab_group} >
          <div className={classes.tab_li_div}>
          <li onClick={handleClickTab1} className={`${classes.tab_list} ${activeTab=== "tab1" ? classes.tab_active : ""}`}>Doctor</li>
          </div>
          <div className={classes.tab_li_div}>
          <li onClick={handleClickTab2}  className={`${classes.tab_list} ${activeTab=== "tab2" ? classes.tab_active : ""}`}>Paitent</li>
          </div>
          
        </ul>
        <div  className={classes.tab_content}>
       {activeTab === "tab1"  ? (<Register />) : (<PaitentRegister />)}
        </div>
      </div>
    );
  };       
 
 
export default Tabs;