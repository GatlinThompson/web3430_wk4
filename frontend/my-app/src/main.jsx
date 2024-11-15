import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/index.css';
import './stylesheets/main.css';
import './stylesheets/ReactToastify.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
