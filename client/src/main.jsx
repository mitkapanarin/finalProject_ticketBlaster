// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Provider } from "react-redux";
// import { store, persistedStore } from "./store/index.js";
// import { PersistGate } from "redux-persist/integration/react";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistedStore}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { store, persistedStore } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)

