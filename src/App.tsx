import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/auth/Login';
import { AuthProvider } from './contexts/auth/authContext';
import Dashboard from './pages/dashboard/Dashboard';
import ReportsPage from './pages/reports/ReportsPage';
import AuthenticatedRoute from './contexts/auth/AuthenticatedContext';
import { Toaster } from 'sonner';
import Register from './pages/auth/Register';
import MobileDeviceAlert from './components/mobileAlert/MobileDeviceAlert';
import HistoryPage from './pages/history/HistoryPage';

function App() {
    
    return (
        <AuthProvider>
            <Toaster position="top-right" richColors closeButton />
        <Router>
            <MobileDeviceAlert />
            <Routes>
                <Route path='/home' element={<Home />}
                />
          
                
                <Route path='/login' element={
                <AuthenticatedRoute>
                    <Login />
                </AuthenticatedRoute>
                }     
                />
            
                <Route path='/register' element={
                <AuthenticatedRoute>
                    <Register />
                </AuthenticatedRoute>
                }     
                />
                
                <Route path='/dashboard' element={<Dashboard />}
                />
                <Route path='/historico/relatorios' element={<ReportsPage />}
                />
                <Route path='/historico' element={<HistoryPage />}
                />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
        </AuthProvider>
    )
};

export default App;