import './App.css';
import Home from './pages/Home';
import Layout from './layout/layout';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import Auth from './pages/Auth';

const sidebarItems=[
  {name:"Home",link:"/home",icon:"home"},
  {name:"Products",link:"/products",icon:"products"},
  {name:"Categories",icon:"categories",children:[{name:"All Categories",link:"/categories"},{name:"Add Category",link:"/categories/add"}]},
  {name:"Orders",link:"/orders",icon:"orders"},
  {name:"Users",link:"/users",icon:"users"},
  {name:"Settings",link:"/settings",icon:"settings"},
]

const router=createBrowserRouter(
  [
    {path:"/auth",element:<Auth/>},
    {
      path:"/",
      element:<Layout sidebarList={sidebarItems}/>,
      children:[
        {path:"home",element:<ProtectedRoute element={<Home/>}/>}
      ]},
  ]
)

function App() {
  return (
    <>
        <RouterProvider router={router}/>
        <ToastContainer position="bottom-right" autoclose={3000} hideProgressBar={false} style={{marginBottom:'30px'}}/>

    </>
  );
}

export default App;
