import React,{useState,useEffect} from "react";
import {Link,useParams,useNavigate} from "react-router-dom"
import axios from 'axios'
function UserList() {
    const [data, setData] = useState([])
    const { id } = useParams()
   
    const [inputField, setInputField] = useState({
        time: "" 
    })
    // const [inputCompany, setInputCompany] = useState({
    //     companyid:"63e4c368253176cc86f4da86",
    //     time:""
    // })
     const navigate = useNavigate()
    const [inputCompany, setInputCompany] = useState('')

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",data)
    
    useEffect(()=>{
        
            loadCompany()
        
    },[])

    const serverUrl = process.env.REACT_APP_API
    console.log(process.env.REACT_APP_API)
    const serverUrl1 = process.env.REACT_APP_SERVER
    
    const loadCompany=async ()=>{
        const result = await axios.get(`${serverUrl}/get-all-companies`)
            console.log("result>>>>>>>>>>>>>>",result.data.data[0]._id)
        if(result.status === 201){
            setData(result.data)
        }
         
    
    }
 console.log(">>>>>>data",data)

   const inputTimeChange=(e)=>{
    setInputField({ ...inputField, [e.target.name]: e.target.value  })

       console.log(">e.target.name>>>>>>>>>>",e.target.name)
       console.log(">e.target.value>>>>>>>>>>",e.target.value)
   }

   const submitTimeHandler = (e) =>{
             e.preventDefault()
             let url = `${serverUrl1}/change_time_allcompanies`
            axios.post(url,inputField,{mode:"no-cors"}).then((response)=>{
                  console.log(">>res",response)
  
            }).catch((err)=>{
               console.log(err.message)
            }) 

   }

    const changeCompanyTime=(e)=>{
      setInputCompany({
        time:e.target.value,
        companyid:e.target.id, 
    })
          
        //   const { id, value } = e.target;
        //   setInputCompany(prev => ({ ...prev, [e.target.id]: e.target.value}));
    }

    const companyHandler=(e)=>{
          e.preventDefault()
          let url = `${serverUrl1}/change_time_allusers`
          axios.post(url,inputCompany,{mode:"no-cors"}).then((response)=>{
                console.log(">.............>res",response)

          }).catch((err)=>{
             console.log(err.message)
          }) 
         
    }

     const logoutHandler =(e)=>{
      e.preventDefault();
      const login = localStorage.removeItem("login")
      if(login){
        navigate("/login")
      }
     
     }

    return (
        <>
           <nav className="navbar bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand bg_das">Dashboard</a>
                    
                    <li className="nav-item dropdown">
                   
          <a className="nav-link dropdown-toggle sett"  role="button" data-bs-toggle="dropdown" aria-expanded="true">
            setting
          </a>
          <ul className="dropdown-menu">
            <li><input type="text" step='1' placeholder="00:00:00" min="00:00:00" max="20:00:00" name="time" value={inputField.time} onChange={inputTimeChange}/></li>
            <li><button type="submit" className='btn btn-primary' onClick={submitTimeHandler}>send</button></li>
            
          </ul>
        </li>
        <button type="submit" className='btn btn-primary' onClick={logoutHandler}>LogOut</button>
                </div>
            </nav>

            <div className="table-outer" >
            <div className="user_table_inner" >
            <h3 className='heading' > All Companies </h3><br />
            <table className="table table-success">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Set Interval</th>

                    </tr>
                </thead>
                <tbody>
                    
                   {data && data?.data?.map((item,index)=>{
                             return(
                                 <tr key={index}>
                                     <th scope='row'>{index+1}</th>
                                     <td><Link to={`/user_list/${item._id}`}>{item.companyname}</Link></td>
                                      <td>{item.email}</td> 
                                     <td>{item.mobile}</td>
                                     <td>
                                        {/* <input type="text" name={item._id}  value={inputCompany.companyid} onChange={changeCompanyTime} style={{display:"none"}}/> */}
                                        <input type="text" step='1' min="00:00:00" max="20:00:00"
                                        
                                        
                                         id={item._id}
                                          onChange={changeCompanyTime}
                                         /> 
                                         {console.log("data>>>>>>>>",inputCompany.time)}
                                        <span><button type="submit" className='btn btn-primary' onClick={companyHandler} >send</button></span>
                                        </td>
                                     
                                     

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
export default UserList;