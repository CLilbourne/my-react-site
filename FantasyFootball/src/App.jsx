import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import SignUp from './SignUp';
import Login from './Login';
import Draft from './Draft';
import Welcome from './Welcome';
import MockDraft from './MockDraft';
import AboutMe from './AboutMe/AboutMe'

function App() {
  return (
    <div className='page-container'>
      <title>HireConnor.org</title>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path = '/AboutMe' element= {<AboutMe/>}/>
          <Route
            path='/draft'
            element={
              <div className="main-content" style={{ padding: 20 }}>
                <Draft />
              </div>
            }
          />
          <Route 
            path='/welcome' 
            element={<div className="main-content" style={{ padding: 20 }}>
                <Welcome />
              </div>} />
        <Route 
            path='/mock-draft' 
            element={<div className="main-content" style={{ padding: 20 }}>
                <MockDraft/>
              </div>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;