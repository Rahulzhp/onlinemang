import React, { useState, useEffect } from 'react';
import './DashboardBody.css';
import PcBackground from '../../Icons/Header-bg.svg';
import MobileBackground from '../../Icons/login-bg-1.png';
import logo from '../../Icons/Logo.svg';
import Dashboard from '../../Icons/Dashboard.svg';
import Dashboard_active from '../../Icons/Dashboard-active.svg';
import Create_Project from '../../Icons/create-project.svg';
import Create_Project_active from '../../Icons/create-project-active.svg';
import Project_list from '../../Icons/Project-list.svg';
import Project_list_active from '../../Icons/Project-list-active.svg';
import ExitIcon from '../../Icons/Logout.svg';
import CreateProject from '../../CreateProject/CreateProject';
import BarChart from '../../Dashboard/Chat';
import DashboardCard from "../../Dashboard/Dashboard"



import { Routes, Route, useNavigate } from "react-router-dom"
const DashboardBody = () => {
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false);
    const [Dashboardtitle, SetDashboardtitle] = useState("Dashboard")

    const [activeIcon, setActiveIcon] = useState("dashboard");
    const handleIconClick = (icon) => {
        setActiveIcon(icon);
        switch (icon) {
            case ("dashboard"): SetDashboardtitle("Dashboard")
                break;
            case ("project_list"): SetDashboardtitle("Project Listing")
                break;
            case ("create_project"): SetDashboardtitle("Create Project")
                break;
            default:
                SetDashboardtitle("Dashboard")
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Set initial state

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const exithandle = () => {
        navigate("/login")
    }
    return (
        <div className={`Main_container ${isMobile ? 'mobile' : ''}`}>
            <div className={`sidebar ${isMobile ? 'mobile' : ''}`}>
                {/* Sidebar content goes here */}
                <div className="sidebar-icons">
                    <div className={`sidebar-icon ${activeIcon === 'dashboard' ? 'active' : ''}`} onClick={() => handleIconClick('dashboard')}>
                        {/* Dashboard */}
                        <img src={activeIcon === 'dashboard' ? Dashboard_active : Dashboard} alt="Dashboard" />
                    </div>
                    <div className={`sidebar-icon ${activeIcon === 'project_list' ? 'active' : ''}`} onClick={() => handleIconClick('project_list')}>
                        {/* Project List */}
                        <img src={activeIcon === 'project_list' ? Project_list_active : Project_list} alt="Project List" />
                    </div>
                    <div className={`sidebar-icon ${activeIcon === 'create_project' ? 'active' : ''}`} onClick={() => handleIconClick('create_project')}>
                        {/*  Create Project*/}
                        <img src={activeIcon === 'create_project' ? Create_Project_active : Create_Project} alt="Create Project" />
                    </div>
                    <div onClick={exithandle} className="sidebar-exit-icon">
                        {/* Exit Icon */}
                        <img src={ExitIcon} alt="Exit" />
                    </div>

                </div>
            </div>
            <div className={`body ${isMobile ? 'mobile' : ''}`}>
                <nav className='DashboardNav'>
                    <div className='background_img'>
                        <img src={isMobile ? MobileBackground : PcBackground} alt="Background"></img>
                    </div>

                    <div className='Logo_bar'>
                        <h3>{Dashboardtitle}</h3>
                        <img src={logo} alt="Logo"></img>
                    </div>

                </nav>
                {/* Body content goes here */}
                <div className='ContentArea'>
                    {/* <CreateProject /> */}
                    {/* <BarChart/>  */}
                    <Routes>
                        <Route path={activeIcon === "dashboard" ? "/" : "null"} element={<BarChart />} />
                        <Route path={activeIcon === "create_project" ? "/" : "null"} element={<CreateProject />} />
                        <Route path={activeIcon === "project_list" ? "/" : "null"} element={<DashboardCard />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardBody;
