import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './contexts/auth/authContext';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
    
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path='/home' element={<Home />}
                />
                <Route path='/login' element={<Login />}
                />
                <Route path='/register' element={<Register />}
                />
                <Route path='/dashboard' element={<Dashboard />}
                />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
        </AuthProvider>
    )
};

export default App;