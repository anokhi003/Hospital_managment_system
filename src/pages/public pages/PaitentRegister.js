import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";

import classes from '../../css/Register.module.css';
import fireDb from '../../firebase';
import Login from '../../components/login/Login';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'



const PaitentRegister = () => {
    const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const db = getDatabase();
  const auth = getAuth(fireDb);




 

  const register = e => {
    e.preventDefault();

    if (userName === '') {
      setNameError("enter your name");
      return
    } else { setNameError('') };
    if (email === '') {
      setEmailError("enter your Email");
      return
    } else { setEmailError('') };

    if (password === '') {
      setPasswordError("enter your password");
      return
    } else { setPasswordError('') };
    if (confirmPassword === '') {
      setConfirmPassError("enter your confirm Password");
      return
    } else { setConfirmPassError('') };

    if (password === confirmPassword) {

      createUserWithEmailAndPassword(auth, email, password)
        .then((User) => {
          
          console.log(auth.currentUser, "hello")

          // updatimg user data  : displayName and profileURl
          updateProfile(auth.currentUser, {
            displayName: userName,
          }).then(() => {

            console.log("profile updated")
          }).catch((error) => {
            console.log(error)
          
          })

          console.log(User.user);
          set(ref(db, 'paitents/' + User.user.uid), {
            username: userName,
            email: User.user.email,
            uid: User.user.uid,
            type :"Paitent"
           
          })
          navigate('/upload-profile-image');
        })
        .catch((err) => console.log(err.message));
    } else {
      alert("does not match");
    }

    setUserName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');

  }


  return (
    <div>
      {isOpen ?
        <Login open={isOpen} setIsOpen={setIsOpen} /> : ''
      }
    <div >
        { !auth.currentUser ? (
          <>
          <h2>Registertion for Paitent</h2>
        <form className={classes.register_input} onSubmit={register}>
          <div>
            <input
               className={`${classes.textField} ${nameError ?  classes.input_error : classes.input_blue}`}   
              placeholder="Your Name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          <p className={classes.error}>{nameError} </p>
          </div>
          <div>
            <input
             className={`${classes.textField} ${emailError ?  classes.input_error : classes.input_blue}`}     
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <p className={classes.error}>{emailError} </p>
          </div>
          <div>
            <input
            autoComplete='false'
              type='password'
              className={`${classes.textField} ${passwordError ?  classes.input_error : classes.input_blue}`}   
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
           <p className={classes.error}>{passwordError} </p>
          </div>

          <div >
            <input
             autoComplete='false'
              type='password'
              className={`${classes.textField} ${confirmPassError ?  classes.input_error : classes.input_blue}`}   
              placeholder="Conform Password"
              value={confirmPassword}
              onChange={e => setconfirmPassword(e.target.value)}
            />
             <p className={classes.error}>{confirmPassError} </p>
          </div>

          <div className={classes.flex}>

            <button type='submit' className={classes.button}>Register</button>
            <div className={classes.button} onClick={() => setIsOpen(true)} >login</div>

          </div>

        </form>
          </>
        ) : ""}
       
      </div>
    </div>
  
  );
}

 
export default PaitentRegister;