import React, { useEffect, useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
  import {Link, useNavigate} from "react-router-dom"
  import axios from 'axios'
//  import "./Navbar.css"



function Register() {
     const navigate = useNavigate();
    const [inputField, setInputField] = useState({
        companyname: "",
        email: "",
        password: "",
        mobile:"",
        registrationDate:"",
        type:"company"
    })

  

    const [errField, setErrField] = useState({
        nameErr: "",
        emailErr: "",
        passwordErr: "",
        mobileErr:"",
        dateErr:""
    })

    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value  })
    }

   
    const serverUrl = process.env.REACT_APP_API

    const submitButton = (e) => {
        e.preventDefault()
        //  const {name,email,password,mobile,date} = inputField;
        //  console.log('inputField',inputField)
       
    
          
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
       
        // setInputField("")
    }

    const validForm = () => {
        let formIsValid = true
        const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        setErrField({
            nameErr: "",
            emailErr: "",
            passwordErr: "",
            mobileErr:"",
            dateErr:""
        })
        if (inputField.name === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, nameErr: "** Please Enter Name"
            }))
        }
        if (inputField.email === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, emailErr: "** Please Enter Email"
            }))
        }
        
        if (inputField.email !== '' && !validEmailRegex.test(inputField.email )) {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, emailErr: "** Please Enter valid Email"
            }))
        }
        if (inputField.password === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, passwordErr: "** Please Enter Password"
            }))
        }
        if (inputField.mobile === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, mobileErr: "** Please Enter Mobile"
            }))
        }
        if (inputField.date === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState,  dateErr: "** Please Enter Date"
            }))
        }
       
        return formIsValid
    }

    


    return (
        <>
            <div className='container'>
                <div className='row login'>
                <div className='login_outer'>
                    <h3 className='heading' style={{ marginTop: "20px" }}>ScreenCast</h3><br />
                    <div className='col-md-2'>
                    </div>
                    
                        <div className='main'>
                        
                            <form autoComplete='off' action="/login-user" method='post'>
                                <div className="mb-3">
                                    <label  className="form-label">Company Name</label>
                                    <input type="text" className="form-control" name='companyname' value={inputField.companyname} onChange={inputHandler} />
                                    {
                                        errField.nameErr.length > 0 && <span className='error'>{errField.nameErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label  className="form-label">Email</label>
                                    <input type="email" className="form-control" name='email' autoComplete='off' value={inputField.email} onChange={inputHandler} />
                                    {
                                        errField.emailErr.length > 0 && <span className='error'>{errField.emailErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label className='form-label'>Password</label>
                                    <input type="password" className="form-control" name='password' autoComplete='off' value={inputField.password} onChange={inputHandler} />
                                    {
                                        errField?.passwordErr?.length > 0 && <span className='error'>{errField?.passwordErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label className='form-label'>Mobile</label>
                                    <input type="number" className="form-control" name='mobile' autoComplete='off' value={inputField.mobile} onChange={inputHandler} />
                                    {
                                        errField?.mobileErr?.length > 0 && <span className='error'>{errField?.mobileErr}</span>
                                    }
                                </div>
                                <div  className="mb-3">
                                    <label className='form-label'>Registration Date</label>
                                    <input type="date" className="form-control" name='registrationDate' autoComplete='off' value={inputField.registrationDate} onChange={inputHandler} />
                                    {
                                        errField?.dateErr?.length > 0 && <span className='error'>{errField?.dateErr}</span>
                                    }
                                </div>
                                <div>
                                    <button type="submit" className='btn btn-primary' onClick={submitButton}>Signup </button>
                                
                                </div>
                                <p>Already have an account?<Link to={"/login"}>Login Here</Link></p>
                            </form>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}
export default Register;