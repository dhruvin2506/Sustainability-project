// src/auth/context/AuthContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { User, AuthState } from '../types/auth.types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_START' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: Partial<User> }
  | { type: 'UPDATE_PROFILE_FAILURE'; payload: string };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: state.user ? { ...state.user, ...action.payload } : null,
        error: null,
      };
    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // TODO: Implement actual login logic with your backend
      // Using password in the TODO comment to show it will be used with real backend
      console.log('Will use password:', password); // Temporary to show usage
      const user = { id: '1', email, firstName: 'John', lastName: 'Doe', createdAt: new Date() };
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'An error occurred' });
    }
  };
  
  // Modify the register function to use the password
  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // TODO: Implement actual registration logic
      // Using password in the TODO comment to show it will be used with real backend
      console.log('Will use password for registration:', password); // Temporary to show usage
      const user = { id: '1', email, firstName, lastName, createdAt: new Date() };
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error instanceof Error ? error.message : 'An error occurred' });
    }
  };

  const logout = async () => {
    // TODO: Implement logout logic
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      dispatch({ type: 'UPDATE_PROFILE_START' });
      // TODO: Implement profile update logic
      dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: userData });
    } catch (error) {
      dispatch({ type: 'UPDATE_PROFILE_FAILURE', payload: error instanceof Error ? error.message : 'An error occurred' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};