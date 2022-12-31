import React, { useState, useContext, useEffect } from 'react';
import classes from '../../css/BookAppointment.module.css'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { AuthContext } from '../../store/auth-context';
import fireDb from '../../firebase'
import { styled } from '@mui/material/styles';
import { ClassNames } from '@emotion/react';
import PageLoader from '../../components/pageLoader/PageLoader';
import { useNavigate } from 'react-router';


const BookAppointment = () => {
    const { user } = useContext(AuthContext);
    const fire = fireDb.database().ref();
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) {

            setIsLoading(false);
            fire.child(`paitents/${user.uid}`).once('value', snapshot => {
                if (snapshot.val() !== null) {

                    setValues({
                        ...snapshot.val()
                    })
                } else {
                    setValues({});
                }
            })

        }

    }, [user])

    const [time, setTime] = useState(new Date());
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    };
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    //formatting Date 
    const formatDate = ([
        padTo2Digits(time.getDate()),
        padTo2Digits(time.getMonth() + 1),
        time.getFullYear(),
    ].join('/')).toString();

    // formatting time 
    var hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    var minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    var am_pm = time.getHours() >= 12 ? "pm" : "am";

    const formateTime = hours + ":" + minutes + am_pm;

    const handleAppointment = (e) => {
        console.log(values)
        e.preventDefault();

        fireDb.database().ref(`Appointments/${user.uid}`).set({
            ...values,
            uid: user.uid,
            photoURL: values.photoURL,
            FullName: values.FullName,
            AppoiDate: formatDate,
            AppoiTime: formateTime.toString(),
            Disease: values.Disease,

        })
            .catch((err) => console.log(err.message))

        alert("your Poointment is booked");
        navigate('/dashboard');
    }

    const CssTextField = styled(TextField)({
        '&.MuiTextField-root': {
            marginBottom: '15px',
            width: '100%',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid  #005BE7',
            },
            '& .MuiInputBase-input': {
                padding: '9.5px 10px',
                fontSize: '18px',
            },

            '&.Mui-focused fieldset': {
                border: '2px solid  #005BE7',
            },
            '&:hover fieldset': {
                borderColor: '#005BE7'
            },
            '&.MuiInputAdornment-root button': {

                color: '#005BE7'

            }

        },


    });


    return (
        <>
            {!!isLoading ? (<PageLoader />) : (

                <div className={classes.form_container}>
                    <h2>Book Your Appointment</h2>
                    <form onSubmit={handleAppointment} className={classes.bookAppointment}>
                        <CssTextField type="text" placeholder='Name' name="Name" value={values.FullName} onChange={handleInputChange} />
                        <CssTextField type="text" placeholder='FileNumber' name="FileNumber" value={values.uid} onChange={handleInputChange} />
                        <CssTextField type="text" placeholder='Disease' name="Disease" value={values.Disease} onChange={handleInputChange} />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <CssTextField {...props} />}
                                value={time}
                                onChange={(newValue) => {
                                    setTime(newValue);
                                }}
                            />
                        </LocalizationProvider>
                        <button type='submit' className={classes.book_appo_btn}>Book Your Appointment</button>
                    </form>

                </div>
            )}

        </>


    );
}

export default BookAppointment;