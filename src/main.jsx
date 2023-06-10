import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import SignIn from './components/Account/SignIn.jsx'
import SignUp from './components/Account/SignUp.jsx'
import AuthProvider from './components/AuthProvider/AuthProvider.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ManageUser from './components/DashboardRoute/ManageUser/ManageUser.jsx'
import AddClass from './components/DashboardRoute/AddClass/AddClass.jsx'
import MyClass from './components/DashboardRoute/MyClass/MyClass.jsx'
import MyClassUpdate from './components/DashboardRoute/MyClassUpdate/MyClassUpdate.jsx'
import ManageClass from './components/DashboardRoute/ManageClass/ManageClass.jsx'
import Classes from './components/Classes/Classes.jsx'
import SelectedClass from './components/DashboardRoute/SelectedClass/SelectedClass.jsx'
import Payment from './components/Payment/Payment.jsx'
import PayHistory from './components/DashboardRoute/PayHistory/PayHistory.jsx'
import EnrollClass from './components/DashboardRoute/EnrollClass/EnrollClass.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/classes',
        element: <Classes></Classes>
      },
      {
        path: '/sign_in',
        element: <SignIn></SignIn>
      },
      {
        path: '/sign_up',
        element: <SignUp></SignUp>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/manage_user',
        element: <ManageUser></ManageUser>
      },
      {
        path: '/dashboard/manage_class',
        element: <ManageClass></ManageClass>
      },
      {
        path: '/dashboard/add_class',
        element: <AddClass></AddClass>
      },
      {
        path: '/dashboard/my_class',
        element: <MyClass></MyClass>
      },
      {
        path: '/dashboard/selected_class',
        element: <SelectedClass></SelectedClass>
      },
      {
        path: '/dashboard/enroll_class',
        element: <EnrollClass></EnrollClass>
      },
      {
        path: '/dashboard/pay/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`http://localhost:5000/cart/${params.id}`)
      },
      {
        path: '/dashboard/pay',
        element: <PayHistory></PayHistory>
      },
      {
        path: '/dashboard/class_update/:id',
        element: <MyClassUpdate></MyClassUpdate>,
        loader: ({ params }) => fetch(`http://localhost:5000/class_details/${params.id}`)
      },
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
