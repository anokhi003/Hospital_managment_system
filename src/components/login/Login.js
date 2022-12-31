import Button from '@mui/material/Button';
import classes from '../../css/Header.module.css';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import fireDb from '../../firebase';
import { getAuth, signInWithEmailAndPassword,sendEmailVerification } from 'firebase/auth'

const Login = ({ open, setIsOpen }) => {
    const navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

    const handleClose = () => {
        setIsOpen(false);
    };
    const SubmitHandler = e => {
        e.preventDefault();
        const auth = getAuth(fireDb);
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          if(!auth.currentUser.emailVerified) {
            sendEmailVerification(auth.currentUser)
            .then(() => {   
             navigate('/appointment')
            
            })
            // .then(() =>  window.location.reload(false))
          .catch(err => console.log(err.message))
        }
        })
        .catch(err => setError(err.message))
        
        setIsOpen(false);
        
      }
      
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose}>
                        <NavLink className={(navigationData) => navigationData.isActive ? classes.navActive : classes.navLink } to='/register'>Register</NavLink>
                    </Button>
                    <Button onClick={SubmitHandler}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Login;