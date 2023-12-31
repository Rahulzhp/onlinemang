import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import './Dashboard.css';
import Card from './card';
import { useNavigate } from 'react-router-dom';

export default function DashboardCard() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const [updateData, setUpdateData] = useState(false);
  const [sort, setSort] = useState("")

  const authrization = localStorage.getItem("techprime");
  useEffect(() => {
    if (sort !== "") {
      return sortData()
    }
    fetchData()
  }, [search, sort, currentPage, updateData]);

  const changetologin = () => {
    navigate("/login")
  }
  const fetchData = debounce(() => {
    axios
      .get(`https://doubtful-fox-dirndl.cyclic.app/project?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, 300)
  const update = (id, payload) => {
    console.log(id, payload)
    axios
      .patch(`https://doubtful-fox-dirndl.cyclic.app/project/${id}`, { status: payload }, {
        headers: {
          'Authorization': authrization
        }
      })
      .then((res) => setUpdateData(!updateData))
      .catch(err => console.log(err))
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const sortData = () => {
    if (sort === "High") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/sort/high?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "Running") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/status/running?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "Closed") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/status/close?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "Cancelled") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/status/cancel?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "Low") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/sort/low?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "project") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/sort/project?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "start-date") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/start/date?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "end-date") {
      axios.get(`https://doubtful-fox-dirndl.cyclic.app/project/end/date?search=${search}&page=${currentPage}`, {
        headers: {
          'Authorization': authrization
        }
      })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((er) => {
          console.log(er)
        })
    }
    else if (sort === "All") {
      axios
        .get(`https://doubtful-fox-dirndl.cyclic.app/project?search=${search}&page=${currentPage}`, {
          headers: {
            'Authorization': authrization
          }
        })
        .then((res) => {
          setData(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    }
  }
  //console.log("data", data)
  return (
    <div>
      {authrization ?
        <div className="dashboard-card">
          <div className='input-sort'>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <h3>Sort By:</h3>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="All">Priority</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="project">project</option>
                <option value="Running">Running</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="start-date">Start Date</option>
                <option value="end-date">End Date</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Division</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item.id}>
                  <td>{item.project_theme}
                    <div> <span>{item.start_date}</span> <span>to</span> <span>{item.end_date}</span></div>

                  </td>
                  <td>{item.reason}</td>
                  <td>{item.type}</td>
                  <td>{item.division}</td>
                  <td>{item.category}</td>
                  <td>{item.priority}</td>
                  <td>{item.department}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="action-button start" onClick={() => update(item._id, "Running")}>Start</button>
                    <button className="action-button close" onClick={() => update(item._id, "Closed")}>Close</button>
                    <button className="action-button cancel" onClick={() => update(item._id, "Cancelled")}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mob_card'>
            {
              data && <Card alldata={data} key={data._id} update={update} />
            }
          </div>
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </div> : <div className='notauth'>
          <p>Please log in to visit this page</p>
          <button onClick={changetologin} id="authbtn">Login</button>
        </div>}
    </div>
  );
}
