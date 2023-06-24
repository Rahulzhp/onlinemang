import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./CreateProject.css"
function CreateProject() {
    const [themeError, setthemeError] = useState(false);
    const [addproject, setaddproject] = useState(false)
    const [isMobile, setIsMobile] = useState(false);
    const [disable, setdisable] = useState(false)


    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [project, setProject] = useState({
        project_theme: '',
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        department: '',
        start_date: '',
        end_date: '',
        location: '',
    });
    const Empty = {
        project_theme: '',
        reason: '',
        type: '',
        division: '',
        category: '',
        priority: '',
        department: '',
        start_date: '',
        end_date: '',
        location: '',
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleSaveProject = (e) => {
        console.log("rhl")
        e.preventDefault();


        if (project.project_theme === "") {
            setthemeError(true)
            setTimeout(() => {
                setthemeError(false)
            }, 700)
            console.log(project.theme, themeError)
        } else {
            setaddproject(true)
            setdisable(true)
            axios.post("https://light-bat-gown.cyclic.app/project/", project)
                .then((res) => {
                    setdisable(false)
                    setProject(Empty)
                })
                .catch((res) => console.log(res))
            setTimeout(() => {
                setaddproject(false)
            }, 1100)
        }
        console.log('Project:', project);
        // Save the project or perform any other actions
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='Form_parent'>
            <form onSubmit={handleSaveProject}>
                <div className="project-theme">
                    <div >
                        <input style={{ border: themeError ? "solid 1px red" : "solid 1px black" }} className='ProjectTheme' placeholder='Enter Project Theme' type="text" name="project_theme" value={project.project_theme} onChange={handleInputChange} />
                        {
                            themeError ? <p style={{ color: "red", marginTop: "2px" }}>Project theme Required</p> : ""
                        }
                    </div>
                    {!isMobile && (
                        <div className='save-button Pc'>
                            <button type='submit' disabled={disable} style={{ backgroundColor: disable ? "gray" : "rgb(4, 115, 215)" }}>Save Project</button>

                        </div>
                    )}
                </div>
                <div className='input_parent'>
                    <div>
                        <div>
                            <label>
                                Reason
                                <select name="reason" value={project.reason} onChange={handleInputChange} >
                                    <option value="">Select a reason</option>
                                    <option value="Business">Business</option>
                                    <option value="Dealership">Dealership</option>
                                    <option value="Transport">Transport</option>
                                    {/* Add options for the reason */}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Type
                                <select name="type" value={project.type} onChange={handleInputChange} >
                                    <option value="">Select a type</option>
                                    <option value="Internal">Internal</option>
                                    <option value="External">External</option>
                                    <option value="Vendor">Vendor</option>
                                    {/* Add options for the type */}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Division
                                <select name="division" value={project.division} onChange={handleInputChange} >
                                    <option value="">Select a division</option>
                                    <option value="Compressor">Compressor</option>
                                    <option value="Filters">Filters</option>
                                    <option value="Pumps">Pumps</option>
                                    <option value="Glass">Glass</option>
                                    <option value="Water Heater">Water Heater</option>
                                    {/* Add options for the division */}
                                </select>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>
                                Category
                                <select name="category" value={project.category} onChange={handleInputChange} >
                                    <option value="">Select a category</option>
                                    <option value="Quality A">Quality A</option>
                                    <option value="Quality B">Quality B</option>
                                    <option value="Quality C">Quality C</option>
                                    <option value="Quality D">Quality D</option>
                                    {/* Add options for the category */}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Priority
                                <select name="priority" value={project.priority} onChange={handleInputChange} >
                                    <option value="">Select a priority</option>
                                    {/* Add options for the priority */}
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Department
                                <select name="department" value={project.department} onChange={handleInputChange} >
                                    <option value="">Select a department</option>
                                    {/* Add options for the department */}
                                    <option value="Startegy">Startegy</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Quality">Quality</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Stores">Stores</option>
                                    <option value="Hr">Hr</option>

                                </select>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>
                                Start Date as per Project Plan
                                <input
                                    type="date"
                                    name="start_date"
                                    value={project.start_date}
                                    min={getCurrentDate()} // Set the minimum value of the start date to the current date
                                    max={project.end_date} // Set the maximum value of the start date to the end date
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                End Date as per Project Plan
                                <input
                                    type="date"
                                    id="endDate"
                                    name="end_date"
                                    value={project.end_date}
                                    min={project.start_date} // Set the minimum value of the end date to the start date
                                    onChange={handleInputChange}
                                    disabled={!project.start_date}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Location
                                <select name="location" value={project.location} onChange={handleInputChange} >
                                    <option value="">Select a location</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Varansi">Varansi</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Banglore">Banglore</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='status'>
                        <p>Status : <span>Registered</span></p>
                    </div>
                    <div className='project_added'>

                        {
                            addproject ? <div className='innerprojadd'><p style={{ color: "white" }}>Project is added to your Project List</p></div> : ""
                        }

                    </div>
                </div>

                {isMobile && (
                    <div className='save-button mobile'>
                        <button type='submit' disabled={disable} style={{ backgroundColor: disable ? "gray" : "rgb(4, 115, 215)" }}>Save Project</button>
                    </div>
                )}
            </form>

        </div>
    );
}

export default CreateProject;
