import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/auth/Login';
import { AuthProvider } from './contexts/auth/authContext';
import Dashboard from './pages/dashboard/Dashboard';
import ReportsPage from './pages/reports/ReportsPage';
import AuthenticatedRoute from './contexts/auth/AuthenticatedContext';

function App() {
    
    return (
        <AuthProvider>
        <Router>
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
                    <Login />
                </AuthenticatedRoute>
                }     
                />
                
                <Route path='/dashboard' element={<Dashboard />}
                />
                <Route path='/historico/relatorios' element={<ReportsPage />}
                />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
        </AuthProvider>
    )
};

export default App;