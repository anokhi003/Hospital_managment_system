import classes from '../css/Header.module.css';
import { useState ,useContext} from 'react';
import { CgSearch } from "react-icons/cg";
import UserProfile from '../components/header/User_profile';
import Login from '../components/login/Login';
import {AuthContext} from '../store/auth-context';

const Header = () => {

    const { user } = useContext(AuthContext);
    
    // const [isOpen, setIsOpen] = useState(false);
    // const [isLoggedIn , setIsLoggedIn] = useState(false)

    
    return (<>
            {/* {isOpen ?
                <Login open={isOpen} setIsOpen={setIsOpen}/> : '' 
            } */}
       
        <div className={classes.header}>
            {/* <input className={classes.search_bar} placeholder="search..."></input> */}
            <div className={classes.search_bar} >
                <CgSearch className={classes.search_icon} />
                <input className={classes.search_input} placeholder="search..." ></input>
            </div>

             <UserProfile /> 
            {/* // (<button onClick={() => setIsOpen(true)} className={classes.loginBtn}> Log in </button>) */}
          

        </div>
    </>
    );
}

export default Header;