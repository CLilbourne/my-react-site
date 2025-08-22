import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import SignUp from './SignUp';
import Login from './Login';
import Draft from './Draft';
import Welcome from './Welcome';
import MockDraft from './MockDraft';
import AboutMe from './AboutMe/AboutMe'
import Ranking from './Ranking'
import DraftRoom from './DraftRoom'

function App() {
  return (
    <BrowserRouter>
    <div className='page-container'>
      <title>HireConnor.org</title>
      <Header />
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path = '/' element= {<AboutMe></AboutMe>}/>
          <Route path = '/AboutMe' element= {<AboutMe></AboutMe>}/>
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
        <Route 
            path='/ranking' 
            element={<div className="main-content" style={{ padding: 20 }}>
                <Ranking/>
              </div>} />
        <Route 
            path='/draft-room' 
            element={<div className="main-content" style={{ padding: 20 }}>
                <DraftRoom/>
              </div>} />
        </Routes>
      <Footer />
      
    </div>
    </BrowserRouter>
  );
}

export default App;