import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import {HomeLayout,ErrorPage,Landing,Register,Login,DashboardLayouts,Admin,AllJobs,Stats,Profile, AddJob,EditJob} from "./pages";
import { action as registerAction } from './pages/Register';
import{action as loginAction} from "./pages/Login"
import{loader as Dashboardloader} from "./pages/DashboardLayouts"
import { loader as editJobLoader } from './pages/EditJob';
import { loader as allJobLoader } from './pages/AllJobs';
import { action as addJobAction } from './pages/AddJob';

import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { loader as statsLoader } from './pages/Stats';

import{action as profilePageAction} from './pages/Profile'

import { Footer } from "./components";

const router = createBrowserRouter([
  { path:"/",
    element: <HomeLayout /> ,
    errorElement:<ErrorPage />,
    children:[
      
      {
        index:true,
        element: <Landing/>
      },


      { path:"Landing",
        element: <Landing /> ,
      
      },
{
  path: 'register',
  element: <Register />,
  action:registerAction
},
      { path:"Login",
        element: <Login /> ,
        action:loginAction
      
      },
      { path:"dashboard",
        element: <DashboardLayouts /> ,
        loader: Dashboardloader,
        children:[
          {
            index:true,
            element:<AddJob />,
            action:addJobAction,
          
          },
          {
            path:'alljobs',
            element:<AllJobs />,
            loader: allJobLoader,
          }, 
          {
            path: 'alljobs/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
 { path: 'delete-job/:id',
   action: deleteJobAction },

            {
            path:'profile',
            element:<Profile />,
            action: profilePageAction,
          },   {
            path:'stats',
            element:<Stats />,
            loader : statsLoader,

          },{
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
        ]
      
      },
      {
        path:"about",
        element: <h1>about page</h1>,
      },
    ]

}

]);


const App = () => {
  // return <RouterProvider router = {router}/>;
  return     <>
  <RouterProvider router={router} />
  <Footer /> 
</>
};
export default App;