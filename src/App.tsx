import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import Dashboard from './components/Dashboard';
import LoginForm from './auth/components/LoginForm';
import RegisterForm from './auth/components/RegisterForm';
import ProfileForm from './auth/components/ProfileForm';
import ProtectedRoute from './auth/components/ProtectedRoute';

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;