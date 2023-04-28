import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Link,useNavigate,useParams} from "react-router-dom"
import axios from 'axios'
//  import "./Navbar.css"


  
function Login() {
     const navigate = useNavigate();
    const [inputField, setInputField] = useState({
        email: "",
        password: ""
       
    })

    
    const serverUrl =process.env.REACT_APP_API
    const { id } = useParams()
    console.log()

    const [errField, setErrField] = useState({
       
        emailErr: "",
        passwordErr: "",
       
    })

    const inputHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value  })
    }

   


    const submitButton = (e) => {
        e.preventDefault()
        // const {name,email,password} = inputField;
         console.log('inputField',inputField)
       
        
        
         localStorage.setItem("login",true)
        if (validForm()) {
           // let url = 'https://cors-anywhere.herokuapp.com/https://b2a7-122-160-167-80.in.ngrok.io/login'
           let url = `${serverUrl}/login`
            axios.post(url,inputField).then((response)=>{
                  console.log(">>res",response.message)

                  response?.data?.data?.map((item)=>{
                   
                     console.log(">>>>response.data",item)
                     if(item.type==='company'){
                        
                        toast.success("Comapny Login Successfully")
                        setTimeout(()=>{
                            navigate(`/user_list/${item._id}`)
                          },1000)
                       
                      }
                      else{
                        toast.success("Admine Login Successfully")
                        setTimeout(()=>{
                            navigate("/company_list/user_list")
                          },1000)
                     }
                  })
                  
                
                 
                
            }).catch((err)=>{
               console.log(err.message)
            }) 
        } else {
            console.log('invalid')
            // toast.error("Invalid password")
        }
        validForm()
        setInputField("")
    }


    // useEffect(()=>{
    //     // if (validForm()) {
    //         // let url = 'https://cors-anywhere.herokuapp.com/https://b2a7-122-160-167-80.in.ngrok.io/login'
    //         let url = `${serverUrl}/login`
    //         const login = localStorage.getItem("login")
    //          axios.post(url,inputField).then((response)=>{
    //                console.log(">>res",response.message)
 
    //                response?.data?.data?.map((item)=>{
                    
    //                   console.log(">>>>response.data",item)
    //                   if(item.type==='company' && login){
                         
    //                      toast.success("Comapny Login Successfully")
    //                      setTimeout(()=>{
    //                          navigate(`/user_list/${item._id}`)
    //                        },1000)
                        
    //                    }
    //                    else{
    //                      toast.success("Admine Login Successfully")
    //                      setTimeout(()=>{
    //                          navigate("/company_list/user_list")
    //                        },1000)
    //                   }
    //                })
                   
                 
                  
                 
    //          }).catch((err)=>{
    //             console.log(err.message)
    //          }) 
    //     //  } else {
    //     //      console.log('invalid')
    //     //      // toast.error("Invalid password")
    //     //  }
        
    // },[])

    const validForm = () => {
        let formIsValid = true
        const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        setErrField({
            emailErr: "",
            passwordErr: "",
        })
        
        if (inputField.email === '') {
            formIsValid = false
            setErrField(prevState => ({
                ...prevState, emailErr: "** Please Enter Email"
            }))
        }
        
        if (inputField.email != '' && !validEmailRegex.test(inputField.email )) {
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
       
       
        return formIsValid
    }

    



    return (
        <>
            <div className='container'>
            <ToastContainer/>
                <div className='row login'>
                    <div className='login_outer'>
                        <h3 className='heading'>ScreenCast</h3><br />
                        <div className='col-md-2'>
                        </div>
                        <div className='main'>
                        
                            <form autoComplete='off' action="/login-user" method='post'>
                            
                                <div className='email input-box'>
                                    <label className='form-label'>Email</label>
                                    <input type="email" className="form-control" name='email' autoComplete='off' value={inputField.email} onChange={inputHandler} />
                                    {
                                        errField.emailErr.length > 0 && <span className='error'>{errField.emailErr}</span>
                                    }
                                </div>
                                <div className='email input-box'>
                                    <label className='form-label'>Password</label>
                                    <input type="password" className="form-control" name='password' autoComplete='off' value={inputField.password} onChange={inputHandler} />
                                    {
                                        errField?.passwordErr?.length > 0 && <span className='error'>{errField?.passwordErr}</span>
                                    }
                                </div>
                                
                                <div>
                                    <button type="submit" className='btn btn-primary login_sub' onClick={submitButton}>Login</button>
                                
                                </div>
                                <p className='link_p'>Not have an account?<Link to={"/register"}>Sign Up Here</Link></p>
                            </form>

                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}
export default Login;