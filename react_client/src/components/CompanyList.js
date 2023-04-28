import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate, Link } from 'react-router-dom';
// import { NavLink } from "react-router-dom"
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap"
import axios from 'axios'

function CompanyList() {
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [modalNext, setModalNext] = useState(false)
    const { id } = useParams()
    console.log(">id-------->>>>>>", id)
    const [time, setTime] = useState({
        time: "",
        id: ""
    })
    const [addUser, setAddUser] = useState({
        site_name: "",
        company_id: `${id}`,
        _subscription: true,
        subscription_end: ""
    })

    const navigate = useNavigate()

    useEffect(() => {

        loadUser()

    }, [id])

    const serverUrl = process.env.REACT_APP_API
    const serverUrl1 = process.env.REACT_APP_SERVER
    const loadUser = async () => {
        const result = await axios.get(`${serverUrl}/get-users/${id}`)
        console.log(">>>>>>result>.>>>>", result)
        if (result.status === 201) {
            setData(result.data)
        }


    }



    const changeCompanyTime = (e) => {
        setTime({
            time: e.target.value,
            id: e.target.id
        })
        console.log("e.target.value>>>>", {
            time: e.target.value,
            id: e.target.id,
        })
    }

    const companyHandler = (e) => {
        e.preventDefault()
        let url = `${serverUrl1}/change_time_user`
        axios.post(url, time, { mode: "no-cors" }).then((response) => {
            console.log(">.............>res", response)

        }).catch((err) => {
            console.log(err.message)
        })

        console.log(">>>>>>time>", time)
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("login")
        navigate("/login")

    }

    const userAddHandler = (e) => {
        e.preventDefault()
        setModal(true)
        setModalNext(false)

    }


    const siteChangeHandler = (e) => {
        console.log(e.target.value)
        setAddUser({ ...addUser, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("addUser>>>", addUser)
        setModalNext(true)

        let url = `${serverUrl}/create_Subscription`
        axios.post(url, addUser, { mode: "no-cors" }).then((response) => {
            console.log(">.<<<-res->>>>>>res", response)
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response.data.data._id)
            localStorage.setItem("response_id", response.data.data._id)

        }).catch((err) => {
            console.log(err.message)
        })
       


        setAddUser({
            site_name: "",
            company_id: "",
            _subscription: "",
            subscription_end: ""
        })

    }

    var currentdate=  new Date()
    var priordate =  new Date()
    var priordate_six_month =  new Date()
    var priordate_one_years_month =  new Date()

     priordate.setDate(priordate.getDate() + 30)
     priordate_six_month.setDate(priordate_six_month.getDate() + 180)
     priordate_one_years_month.setDate(priordate_one_years_month.getDate() + 360)


     console.log(">>priordate_one_years_month>>>>>>",priordate_one_years_month.toISOString().split("T")[0])

         const date_one_month1 = currentdate.toISOString().split("T")[0]
         const date_one_month = priordate.toISOString().split("T")[0]
         const date_six_month = priordate_six_month.toISOString().split("T")[0]
         const date_year = priordate_one_years_month.toISOString().split("T")[0]
      
   
       


    const results = localStorage.getItem("response_id")
    console.log("results>>>>", results)

    return (
        <>
            <nav className="navbar bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand bg_das" to="/company_list/user_list" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                    </svg> Return To Dashboard </NavLink>
                    <button type="submit" className='btn btn-danger' onClick={logoutHandler}>LogOut</button>
                </div>

            </nav>
            <div className="add_user">
                <button type="submit" className='btn btn-primary' onClick={userAddHandler}>User Add</button>
            </div>

            <div className="user_table_outer table-outer">
                <div className="user_table_inner">

                    <Modal
                        size="xl"
                        isOpen={modal}
                        toggle={() => setModal(!modal)}

                    >
                        <ModalHeader
                            toggle={() => setModal(!modal)}
                        >
                            Add User
                        </ModalHeader>
                        <ModalBody className="pop_image">


                            {
                                !modalNext ? (<div>
                                    <form>
                                        <Row>
                                            <Col lg={12}>
                                                <div>
                                                    <label htmlFor="name">Site Name</label>
                                                    <input type='text' className="form-control" name="site_name" placeholder="Enter a Site Name" value={addUser.site_name} onChange={siteChangeHandler} />
                                                </div>
                                                <div>
                                                <label htmlFor="name">Subscription</label>
                                                    <select class="form-select" name="subscription_end"  aria-label="Default select example" value={addUser.subscription_end}  onChange={siteChangeHandler}> 
                                                        <option value={date_one_month}>1 Months</option>
                                                        <option value={date_six_month}>6 Months</option>
                                                        <option value={date_year}>1 Year</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                    <button className="btn mt-3" style={{ backgroundColor: "#0b3629", color: "white" }} onClick={submitHandler}>Submit</button>
                                </div>)
                                    : (<div>
                                        <form>
                                            <Row>
                                                <Col lg={12}>
                                                    {` <script type="text/javascript" src="/html2canvas.js" id="subid" sub='${results}'></script>`}
                                                </Col>
                                            </Row>
                                        </form>
                                    </div>)
                            }


                        </ModalBody>

                    </Modal>
                    <h3 className='heading' style={{ marginTop: "20px" }}>User List</h3><br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>MacAddress</th>
                                <th>Set Interval</th>

                            </tr>
                        </thead>
                        <tbody>

                            {data && data?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td><Link to={`/user/image_url_list/${item._id}`}>{item.fullname}</Link></td>
                                        <td>{item.email}</td>
                                        <td>{item.macaddress}</td>
                                        <td><input type="" step='1' min="00:00:00" max="20:00:00" nam="timecompany" id={item._id} value={item.time} onChange={changeCompanyTime} /> <span><button type="submit" className='btn btn-primary' onClick={companyHandler} >send</button></span></td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                </div>
            </div>


        </>
    )
}
export default CompanyList;