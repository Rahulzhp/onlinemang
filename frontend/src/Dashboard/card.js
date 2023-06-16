import React from 'react';
import './card.css';

const Card = ({ alldata, update }) => {
    // console.log(update)
    return (
        <div>
            {
                alldata && alldata.map((el) =>
                    < div className="dashboard-cardmob" >
                        <div className='Head'>
                            <div className='projectTheme'>
                                <h3 className='h3'>{el.project_theme}</h3>
                                <p style={{ textAlign: "left" }}>{el.start_date} to {el.end_date}</p>
                            </div>
                            <div className='projectStatus'>
                                <h3 className='h3'>{el.status}</h3>
                            </div>

                        </div>
                        <div className='projectReason'>
                            <p className='p'>Reason : <span>{el.reason}</span></p>
                            <p className='p'><span style={{ marginRight: "5px", color: "gray" }}>Type : <span style={{ color: "black" }}>{el.type}</span>  </span> <span style={{ color: "gray" }}>Category :<span style={{ color: "black" }}> {el.category}</span></span> </p>
                            <p className='p'><span style={{ marginRight: "5px", color: "gray" }}>Div : <span style={{ color: "black" }}>{el.division}</span>  </span> <span> <span style={{ color: "gray" }}>Dept :</span> <span style={{ color: "black" }}> {el.department}</span></span> </p>

                            <p className='p'>Location : <span>{el.location}</span></p>
                            <p className='p'>Priority : <span>{el.priority}</span></p>
                        </div>
                        <div className="button-container">
                            <button className="action-button start" onClick={() => update(el._id, "Running")}>Start</button>
                            <button className="action-button close" onClick={() => update(el._id, "Closed")}>Close</button>
                            <button className="action-button cancel" onClick={() => update(el._id, "Cancelled")}>Cancel</button>
                        </div>
                    </div >
                )
            }
        </div>
    );
};

export default Card;