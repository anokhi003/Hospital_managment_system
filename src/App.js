import { Routes, Route } from 'react-router-dom';
import './App.css';
import SliderNav from './views/Slider_nav';
import Header from './views/Header';
import Main from './pages/public pages/Main';

import UploadProfileImg from './pages/paitents page/UploadProfileImg';
import {AuthProvider } from '../src/store/auth-context'
import Tabs from './components/Tabs';
import UploadDoctorProfileImg from './pages/Doctor_pages/UploadDoctorProfileImg';
import BookAppointment from './pages/paitents page/BookAppintment';
import Paitents from './pages/paitents page/Paitents';
import Doctors from './pages/public pages/Doctors';
import { getIdToken } from 'firebase/auth';
import Doctor from './pages/Doctor_pages/Doctor';
import Medications from './pages/public pages/Medications';

function App() {

  // const isAuthenticated = getIdToken();
  // console.log(isAuthenticated);
  return (
    <AuthProvider>
    <div className="App">

      <SliderNav className='nav_left' />
        
    
           <div className='right_div'>
        <Header />   
        {/* <Main /> */}
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/patients" element={<Paitents />} />
          <Route exact path="/dashboard" element={<Main />} />
          <Route exact path="/doctors" element={<Doctors />} />
          <Route exact path="/medications" element={<Medications />} />
          <Route exact path="/register" element={<Tabs />} />
          <Route exact path="/upload-profile-image" element={<UploadProfileImg />} />
          <Route exact path="/appointment" element={<BookAppointment />} />
          <Route exact path="/upload-doctor-profile" element={<UploadDoctorProfileImg />} />
          <Route exact path="/doctor" element={<Doctor />} />
        </Routes>
      </div>
    </div>
   
    </AuthProvider>
  );
}

export default App;
