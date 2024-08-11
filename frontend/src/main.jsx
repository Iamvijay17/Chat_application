import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <ToastContainer />
    <App />
  </SocketProvider>,
);
