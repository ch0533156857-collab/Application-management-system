import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TicketsPage from './pages/TicketsPage';
import TicketDetailsPage from './pages/TicketDetailsPage';
import NewTicketPage from './pages/NewTicketPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { userRole } from './types/User';
import RegisterPage from './pages/RegisterPage';
import ManageUsersPage from './pages/ManageUsersPage';
import Narbar from './components/Navbar';
import ManageStatusPage from './pages/ManageStatusPage';
import ManagePriorityPage from './pages/ManagePriorityPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
        }}
      />
      <Router>
        <Narbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetailsPage /></ProtectedRoute>} />
          <Route path="/tickets/new" element={<ProtectedRoute allowedRoles={[userRole.customer]}><NewTicketPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute allowedRoles={[userRole.admin]}><ManageUsersPage /></ProtectedRoute>} />
          <Route path="/status" element={<ProtectedRoute allowedRoles={[userRole.admin]}><ManageStatusPage /></ProtectedRoute>} />
          <Route path="/priorities" element={<ProtectedRoute allowedRoles={[userRole.admin]}><ManagePriorityPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App

