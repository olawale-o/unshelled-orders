import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AccountLogin from './pages/Account/Login';
import Orders from './pages/Orders';
import OrderDetails from './pages/Orders/Details';
import AccountProfile from './pages/Account/Profile';
import PersistAuth from './pages/PersistRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, element: <AccountLogin />,
      },
      {
        path: 'login', element: <AccountLogin />,
      },
      {
        path: 'profile', element: <PersistAuth />,
        children: [
          {index: true, element: <AccountProfile />},
        ],
      },
      {
        path: 'order_items', element: <PersistAuth />,
        children: [
          {index: true, element: <Orders />},
          {path: ':id', element: <OrderDetails />},
        ],
      },
    ]
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
