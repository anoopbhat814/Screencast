import React from "react";
import { NavLink } from "react-router-dom"
import "./Navbar.css"
function App() {

    const submitHandler = (event) => {
        event.preventDefault()
        document.getElementById("myDropdown").classList.toggle("show");
    }
    return (
        <>
            <div className='nav'>
                <ul>
                   
                    
                    <li><div className="dropdown">
                        <button onClick={submitHandler} className="dropbtn">Setting</button>
                        <div id="myDropdown" className="dropdown-content">
                            <div>
                                <label className='form-label'>Time Interval</label>
                                {/* <input type="time" id="appt" name="appt" /> */}
                                <input type="time" step='1' min="00:00:00" max="20:00:00" />
                            </div>
                            <button>Subscription</button>

                        </div>
                    </div></li>
                    {/* <li><NavLink to="/company" activeClassName="active">Company User List</NavLink></li> */}


                </ul>

            </div>
        </>
    )
}

export default App;


