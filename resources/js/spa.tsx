import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../css/app.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/spa/guards';
import Login from './pages/spa/Login';
import Register from './pages/spa/Register';
import Dashboard from './pages/spa/Dashboard';

const SpaApp: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/spa/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/spa/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/spa/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/spa/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

const container = document.getElementById('spa-root');
if (container) {
    const root = createRoot(container);
    root.render(<SpaApp />);
}
