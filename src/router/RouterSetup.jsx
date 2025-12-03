import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Table from '../pages/Table';
import TotalGraph from '../pages/TotalGraph';

function RouterSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<Table />} />
        <Route path="/total-graph" element={<TotalGraph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterSetup;
