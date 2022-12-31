import classes from '../../css/UploadProfileImg.module.css';
import { useState, useContext } from "react";
import { AuthContext } from '../../store/auth-context';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { FaRegUser, FaMedal, FaTransgender, FaGlobeAsia, FaWeight } from "react-icons/fa";
import {  MdCall, MdLocationOn, MdLocationCity } from 'react-icons/md';
import { GiPostOffice  } from "react-icons/gi";
import { getDatabase, ref as Ref, set } from "firebase/database";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';

const UploadDoctorProfileImg = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialFieldValues = {
    FullName: '',
    specialization: '',
    MoblieNo: '',
    Radio: '',
    Address: '',
    CityName: '',
    Pincode: '',
    CurrentState: '',
    Degree: '',
    Experiance: ''
  }

  const storage = getStorage();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [values, setValues] = useState(initialFieldValues);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);


  const db = getDatabase();
  const IndianState = require('../../json/States.json');
  const DegreeOfDoctor = require('../../json/DegreeOfDoctor.json');

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleAddPhoto = () => {setIsAddPhotoOpen(true);}

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  };

  function upload(file, currentUser, setLoading) {
    console.log(currentUser.uid, currentUser)
    const fileRef = ref(storage, 'user/' + currentUser.uid + '/' + file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setLoading(true);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setPhotoURL(downloadURL);

        });
      }
    )
    alert("Uploaded file!");
    setLoading(false);
  }
  function handleClick() {
    upload(photo, user, setLoading);
    setIsAddPhotoOpen(false);
  }
  const handleSet = (e) => {
    e.preventDefault();
    console.log(values);
    updateProfile(user, {
      photoURL: photoURL
    }).then(() => {
      console.log(user, "profile updated")
      set(Ref(db, 'Doctors/' + user.uid), {
        email: user.email,
        uid: user.uid,
        photoURL: photoURL,
        specialization : values.specialization,
        FullName: values.FullName,
        moblieNo: values.MoblieNo,
        Radio: values.Radio,
        Address: values.Address,
        City: values.CityName,
        Pincode: values.Pincode,
        State: values.CurrentState,
        Degree: values.Degree,
        Experiance: values.Experiance,
        
      })
      navigate('/doctor');
      console.log("user added to database")
    }).catch((error) => {
      console.log(error)

    })
    setValues(initialFieldValues);
  }

 const handleAddPhotoClose = () => {setIsAddPhotoOpen(false)}
  return (
    <>

{isAddPhotoOpen ? ( 
              <Dialog open={isAddPhotoOpen} onClose={handleAddPhotoClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent className={classes.paitent_img_input}>
                      <input type="file" onChange={handleChange} className={classes.btn}/>
                      <img src={photoURL} alt="" className={classes.Avatar} />
                </DialogContent>
                <DialogActions>
                      <button  disabled={loading || !photo} onClick={handleClick} className={classes.btn} >Upload</button>
                      <button  onClick={handleAddPhotoClose} className={classes.btn} >Cancle</button>
                </DialogActions>
            </Dialog>) 
    : ""}


    <div className={classes.paitent_detail}>
      <div className={classes.paitent_Img_input}>
        <h2>Paitent Detail Form</h2>
        <button onClick={handleAddPhoto} className={classes.btn}>Add Photo</button>
      </div>

      <form className={classes.paitent_form} onSubmit={handleSet}>
        <div className={classes.form_column}>
          <div className={classes.input_field}>
            <FaRegUser className={classes.input_icon} />
            <input className={classes.input}
              placeholder="Full Name"
              type="text"
              name="FullName"
              value={values.FullName}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.input_field}>
            <FaMedal className={classes.input_icon} />
            <input className={classes.input}
              placeholder="specialization"
              type="text"
              name="specialization"
              value={values.specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.input_field}>
            <FaTransgender className={classes.input_icon} />
            <span className={classes.input}>
              <input type="radio" checked={values.Radio === "Male"} name="Radio" value="Male" onChange={handleInputChange} /> Male
              <input type="radio" checked={values.Radio === "Female"} name="Radio" value="Female" onChange={handleInputChange} /> Female
            </span>

          </div>
          <div className={classes.input_field}>
            <FaGlobeAsia className={classes.input_icon} />
            <select className={`${classes.input} `} value={values.CurrentState} name="CurrentState" onChange={handleInputChange}>

              {IndianState.map((StateName) => {
                return <option key={StateName.code} value={StateName.name} >{StateName.name}</option>
              })}
            </select>

          </div>
          <div className={classes.input_field}>
            <MdCall className={classes.input_icon} />
            <input className={classes.input}
              placeholder="Moblie number"
              name="MoblieNo"
              type="number"
              value={values.MoblieNo}
              onChange={handleInputChange}
            />
          </div>

        </div>
        <div className={classes.form_column}>
          <div className={classes.input_field}>
            <MdLocationOn className={`${classes.input_icon} ${classes.address_icon}`} />
            <textarea id="w3review" name="Address" rows="3" cols="29"
              className={classes.input}
              placeholder="Address"
              value={values.Address}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.input_city}>
            <div className={`${classes.input_field} ${classes.input_city_name}`}>
              <MdLocationCity className={classes.input_icon} />
              <input className={`${classes.input} ${classes.city_name}`}
                type="text"
                name="CityName"
                placeholder="City"
                value={values.CityName}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${classes.input_field} ${classes.input_city_name}`}>
              <GiPostOffice className={classes.input_icon} />
              <input className={`${classes.input} ${classes.city_name}`}
                placeholder="Pincode"
                type="number"
                name="Pincode"
                value={values.Pincode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={classes.input_field}>
            <FaGlobeAsia className={classes.input_icon} />
            <select className={`${classes.input} ${classes.input_select}`} value={values.Degree} name="Degree" onChange={handleInputChange} >

              {DegreeOfDoctor.map((deg) => {
                return <option key={deg.id} value={deg.degree} >{deg.degree}</option>
              })}
            </select>

          </div>
          <div className={`${classes.input_field}`}>
            <FaWeight className={classes.input_icon} />
            <input className={`${classes.input} `}
              placeholder="Experiance"
              type="number"
              name="Experiance"
              value={values.Experiance}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={classes.btn}>Submit</button>

        </div>

      </form>
    </div>
    </>
    
  );
}

export default UploadDoctorProfileImg;