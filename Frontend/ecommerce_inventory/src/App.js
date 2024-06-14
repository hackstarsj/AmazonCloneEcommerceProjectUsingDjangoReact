import './App.css';
import Home from './pages/Home';
import Layout from './layout/layout';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute';
import {ToastContainer} from 'react-toastify';
import Auth from './pages/Auth';
import store from './redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { fetchSidebar } from './redux/reducer/sidebardata';
import { useEffect,useState } from 'react';


function App() {
  const {status,error,items}=useSelector(state=>state.sidebardata);
  const dispatch=useDispatch();
  
  useEffect(()=>{
    if(status=='idle'){
      dispatch(fetchSidebar());
    }
  },[status,dispatch])
  
  const router=createBrowserRouter(
    [
      {path:"/auth",element:<Auth/>},
      {
        path:"/",
        element:<Layout sidebarList={items}/>,
        children:[
          {path:"home",element:<ProtectedRoute element={<Home/>}/>}
        ]},
    ]
  )

  return (
    <>
        <RouterProvider router={router}/>
        <ToastContainer position="bottom-right" autoclose={3000} hideProgressBar={false} style={{marginBottom:'30px'}}/>

    </>
  );
}

export default App;
