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
import Instractor from './components/Instractor/Instractor.jsx'
import PrivateRoute from './components/Private.jsx/PrivateRoute.jsx'
import PrivateStudent from './components/Private.jsx/PrivateStudent.jsx'
import PrivateInstractor from './components/Private.jsx/PrivateInstractor.jsx'
import PrivateAdmin from './components/Private.jsx/PrivateAdmin.jsx'
import Welcome from './components/DashboardRoute/Welcome/Welcome.jsx'



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
        path: '/instractor',
        element: <Instractor></Instractor>,
        loader: () => fetch('http://localhost:5000/all_instractor')
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/welcome',
        element: <Welcome></Welcome>
      },
      {
        path: '/dashboard/manage_user',
        element: <PrivateAdmin><ManageUser></ManageUser></PrivateAdmin>
      },
      {
        path: '/dashboard/manage_class',
        element: <PrivateAdmin><ManageClass></ManageClass></PrivateAdmin>
      },
      {
        path: '/dashboard/add_class',
        element: <PrivateInstractor><AddClass></AddClass></PrivateInstractor>
      },
      {
        path: '/dashboard/my_class',
        element: <PrivateInstractor><MyClass></MyClass></PrivateInstractor>
      },
      {
        path: '/dashboard/selected_class',
        element: <PrivateStudent><SelectedClass></SelectedClass></PrivateStudent>
      },
      {
        path: '/dashboard/enroll_class',
        element: <PrivateStudent><EnrollClass></EnrollClass></PrivateStudent>
      },
      {
        path: '/dashboard/pay/:id',
        element: <PrivateStudent><Payment></Payment></PrivateStudent>,
        loader: ({ params }) => fetch(`http://localhost:5000/cart/${params.id}`)
      },
      {
        path: '/dashboard/payment',
        element: <PrivateStudent><PayHistory></PayHistory></PrivateStudent>
      },
      {
        path: '/dashboard/class_update/:id',
        element: <PrivateInstractor><MyClassUpdate></MyClassUpdate></PrivateInstractor>,
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
