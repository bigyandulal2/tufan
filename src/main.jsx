import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './style/index.css'
import App from './App.jsx'
import { store } from './redux/store.js';
import ContextProvider from './context/Context.jsx';
import UserProvider from "./context/UserProvider.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <ContextProvider>
      <UserProvider>
      <App />

      </UserProvider>
  
    </ContextProvider>
  </Provider>
);

