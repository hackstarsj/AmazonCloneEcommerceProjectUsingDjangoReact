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
import DynamicForm from './pages/DynamicForm';
import 'react-toastify/dist/ReactToastify.css';
import './style/style.css';
import ManageCategories from './pages/category/ManageCategories';
import ManageProducts from './pages/products/ManageProducts';
import Error404Page from './pages/Error404Page';
import ManageWarhouse from './pages/warehouse/ManageWarehouse';
import ManageUsers from './pages/users/ManageUsers';

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
        errorElement:<Layout sidebarList={items} childPage={<Error404Page/>}/>,
        children:[
          {path:"/",element:<ProtectedRoute element={<Home/>}/>},
          {path:"/home",element:<ProtectedRoute element={<Home/>}/>},
          {path:"/form/:formName/:id?",element:<ProtectedRoute element={<DynamicForm/>}/>},
          {path:"/manage/category",element:<ProtectedRoute element={<ManageCategories/>}/>},
          {path:"/manage/product",element:<ProtectedRoute element={<ManageProducts/>}/>},
          {path:"/manage/warehouse",element:<ProtectedRoute element={<ManageWarhouse/>}/>},
          {path:"/manage/users",element:<ProtectedRoute element={<ManageUsers/>}/>}
        ]},
    ]
  )

  return (
    <>
        <RouterProvider router={router}/>
        <ToastContainer position="bottom-right" theme='colored' autoclose={3000} hideProgressBar={false} style={{marginBottom:'30px'}}/>

    </>
  );
}

export default App;
