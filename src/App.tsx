// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './auth/components/LoginForm';
import RegisterForm from './auth/components/RegisterForm';
import ProfileForm from './auth/components/ProfileForm';
import TestPage from './auth/components/TestPage'; // Add this import

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<TestPage />} /> {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;