import './App.css';
import LandingPage  from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/Register';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportLost from './Pages/ReportLost';
import ReportFound from './Pages/ReportFound';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import LostItems from './Pages/LostItems';
import FoundItems from './Pages/FoundItems';
import MyPosts from './Pages/Myposts';
import UserAlertsPage from './Pages/UserAlertPage';
// import Claim_requestPage from './Pages/ClaimandReqPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/report-lost' element={<ReportLost/>}/>
        <Route path='/report-found' element={<ReportFound/>}/>
        <Route path='/lost-items' element={<LostItems/>}/>
        <Route path='/found-items' element={<FoundItems/>}/>
        <Route path='/myposts' element={<ProtectedRoute><MyPosts/></ProtectedRoute>}/>
        <Route path='/claims' element={<ProtectedRoute><UserAlertsPage/></ProtectedRoute>}/>

      </Routes>
    </Router>
  );
}

export default App;
