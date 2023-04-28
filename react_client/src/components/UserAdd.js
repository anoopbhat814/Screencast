import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
  import {Link, useNavigate} from "react-router-dom"
  import axios from 'axios'
//  import "./Navbar.css"



function UserAdd() {
     const navigate = useNavigate();
    const [inputField, setInputField] = useState({
        company_id:"63e3745cc6e0ccea52eaa41d",
        site_name:"",
        _subscription:"",
        subscription_end:""
    })

  

    const [errField, setErrField] = useState({
        site_nameErr: "",
        _subscriptionErr: "",
        subscription_endErr:"",
       
    })

    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value  })
         console.log("e.target.value-->>>",e.target.value)
    }

   
    //const serverUrl = process.env.REACT_APP_API

    const submitButton = (e) => {
        e.preventDefault()
       
        console.log("inputField>>>>>",inputField)
        if (validForm()) {
            
                   let url = `${serverUrl}/register-company`
                 axios.post(url,inputField).then((response)=>{
                    navigate("/login")
                    console.log(">>>>response",response.data.data.type)
                 }).catch((err)=>{
                    console.log(err)
                 })
                   
              
        } else {
            console.log('invalid')
        }
       // validForm()
         setInputField("")
    }

    const validForm = () => {
        let formIsValid = true
        setErrField({
            site_nameErr: "",
            _subscriptionErr: "",
            subscription_endErr:"",
        })

        if (inputField.site_name === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, site_nameErr: "** Please Enter Site Name"
            }))
        }
        if (inputField._subscription === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, _subscriptionErr: "** Please Enter subscription"
            }))
        }
        
        if (inputField.subscription_end === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState,  subscription_endErr: "** Please Enter Subscription End"
            }))
        }
       
        return formIsValid
    }

    


    return (
        <>
            <div className='container'>
                <div className='row login'>
                <div className='login_outer'>
                    <h3 className='heading' style={{ marginTop: "20px" }}>Add User</h3><br />
                    <div className='col-md-2'>
                    </div>
                    
                        <div className='main'>
                        
                            <form autoComplete='off' action="/login-user" method='post'>
                                <div className="mb-3">
                                    <label  className="form-label">Site Name</label>
                                    <input type="text" className="form-control" name='site_name' value={inputField.site_name} onChange={inputHandler} />
                                    {
                                        errField.site_nameErr.length > 0 && <span className='error'>{errField.site_nameErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label  className="form-label">Subscription</label>
                                    <input type="text" className="form-control" name='_subscription' autoComplete='off' value={inputField._subscription} onChange={inputHandler} />
                                    {
                                        errField._subscriptionErr.length > 0 && <span className='error'>{errField._subscriptionErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label className='form-label'>Subscription End</label>
                                    <input type="date" className="form-control" name='subscription_end' autoComplete='off' value={inputField.subscription_end} onChange={inputHandler} />
                                    {
                                        errField?.subscription_endErr?.length > 0 && <span className='error'>{errField?.subscription_endErr}</span>
                                    }
                                </div>
                                
                                
                                <div>
                                    <button type="submit" className='btn btn-primary' onClick={submitButton}>Add</button>
                                
                                </div>
                                {/* <p>Already have an account?<Link to={"/login"}>Login Here</Link></p> */}
                            </form>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}
export default UserAdd;