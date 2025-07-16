import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './style/index.css'
import App from './App.jsx'
import { store } from './redux/store.js';
import ContextProvider from './context/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <ContextProvider>
    <App />
    </ContextProvider>
  </Provider>
);

