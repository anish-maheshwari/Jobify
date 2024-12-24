import Wrapper from "../assets/wrappers/BigSidebar"

import { useDashboardContext } from "../pages/DashboardLayouts";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import links from "../utills/links";
import { NavLink } from "react-router-dom";
import Navlinks from "./Navlinks";

const BigSidebar = ()=>{
    const {showSidebar,toggleSidebar} = useDashboardContext();

    
    return(
       
        <Wrapper>
            <div className={ showSidebar?'sidebar-container':'show-sidebar sidebar-container'}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggleSidebar}><FaTimes /></button>
                    <header>
                        <Logo />
                    </header>
                
                    <Navlinks isBigSidebar />


                </div>
            </div>
        


        </Wrapper>
    );
};

export default BigSidebar;