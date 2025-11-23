import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    
    // Check if token is expired or validate with server
    const validateAuth = async () => {
      if (!token || !userStr) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        // Check token expiration (if stored)
        const tokenExpiry = localStorage.getItem('token_expiry');
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
          console.log('Token expired');
          authService.removeToken();
          setIsValid(false);
          setIsValidating(false);
          return;
        }

        // Validate token with server
        await authService.getCurrentUser();
        setIsValid(true);
        setIsValidating(false);
      } catch (error) {
        console.error('Auth validation failed:', error);
        authService.removeToken();
        setIsValid(false);
        setIsValidating(false);
      }
    };

    // Auto-logout after 30 minutes of inactivity
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        console.log('Session expired due to inactivity');
        authService.removeToken();
        sessionStorage.setItem('session_expired', 'true');
        window.location.href = '/login';
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Track user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });

    validateAuth();
    resetInactivityTimer();

    // Cleanup
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [token, userStr]);

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!token || !userStr || !isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const user = JSON.parse(userStr);

    // Check role-based access
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      const redirectPath = user.role === 'graduate' ? '/graduate/dashboard' : '/dashboard';
      return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
  } catch (error) {
    // Invalid user data - clear and redirect
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
