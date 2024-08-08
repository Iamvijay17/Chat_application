import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { useAppStore } from './store';
function App() {

  const PrivateRoute = ( {children} ) => {  
    const { userInfo } = useAppStore(); 
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  const AuthRoute = ({children}) => {  
    const { userInfo } = useAppStore(); 
    const isAuthenticated = !!userInfo;
    return isAuthenticated ?  <Navigate to="/chat" /> : children;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='*' element={<Navigate to="/auth"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
