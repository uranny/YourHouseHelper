import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Table from '../pages/Table';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

function RouterSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/table" element={<Table />}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterSetup;
