
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";

import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import {customFetch} from '../utills/customFetch.js';

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

const DasboardContext = createContext();
const DashboardLayout = ()=>{
    const navigate = useNavigate();
    const { user } = useLoaderData();
  
    const [showSidebar,SetShowSidebar] = useState(false);
    const [isDarkTheme,SetisDarkTheme] = useState(false);



    const toggleDarkTheme = ()=>{
        const newDarkTheme = !isDarkTheme;
        SetisDarkTheme(newDarkTheme);   
        document.body.classList.toggle('dark-theme', newDarkTheme );
    };

    const toggleSidebar =()=>{
        SetShowSidebar(!showSidebar);
    };


        
      
        const logOutUser = async () => {
          navigate('/');
          await customFetch.get('/auth/logout');
          toast.success('Logging out...');
        };
    


    return (
       < DasboardContext.Provider value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logOutUser,
    }}>
        {/* <Wrapper>
        
        <Navbar />
    
        <SmallSidebar />
        <BigSidebar />
        
        <Outlet context={{user}} />
        </Wrapper> */
        
        <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
               <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
        
        
        
        }
        </DasboardContext.Provider>
                        );
                    };
export const useDashboardContext = ()=> useContext(DasboardContext);
export default DashboardLayout;





