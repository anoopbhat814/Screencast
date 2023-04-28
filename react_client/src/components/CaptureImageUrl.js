import React, { useState, useEffect } from "react"
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import Pagination from "./Pagination";

function CaptureImageUrl() {
  const [data, setData] = useState([])
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [imagesUrl, setImagesUrl] = useState()

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)


  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    loadImageUrl()
  }, [])

  const serverUrl = process.env.REACT_APP_BASE_URL
  const loadImageUrl = async () => {
    //let url = "http://192.168.1.35:8080/find_screenshot"
    const result = await axios.post(`${serverUrl}/find_screenshot`, { user_id: "2342bgbfhf5324" })
    console.log(">>>>>>result>.>>>>", result)
    
    
    if (result.status === 201) {
      setLoading(false)
      setData(result.data.data)
      result.data.data.map((elem) => {
        console.log(">>>>>>elem>>>>>>>", elem.image)
        setImagesUrl(elem.image)
      })

    }
  }
  console.log("<<<<<<imagesUrl>>>>>>>", imagesUrl)
  const changeHangle = (e) => {
    console.log(e.target.value)
    setDate(e.target.value)

  }

  const searchDateHandler = async (e) => {
    e.preventDefault()
    //  let url = "http://192.168.1.35:8080/find_screenshot"
    const result = await axios.post(`${serverUrl}/find_screenshot`, { user_id: "2342bgbfhf5324", date: date })
    console.log(result)
    setData(result.data.data)

  }

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("login")
    navigate("/login")

  }
  const handleShowDialog = (e) => {
    e.preventDefault()
    setModal(true)
    // setState(!state)
    // console.log("cliked");
  };

const indexOfLastPost = currentPage * postPerPage
const indexOfFirstPost = indexOfLastPost - postPerPage 
 const currentPosts =  data.slice(indexOfFirstPost,indexOfLastPost)

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);
    console.log("paginate>>>>",paginate)

 if (loading) {
  return <h2>Loading...</h2>;
}

  const imageUrl = `${serverUrl}/capture/screenshot_captureTue Feb 14 2023 09:31:38 GMT+0000 (Coordinated Universal Time).png`
  return (
    <>

      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <h2>Filter By Date</h2>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="date" placeholder="Search" aria-label="Search" onChange={changeHangle}/>
        <button className="btn btn-outline-success" type="submit" onClick={searchDateHandler}>Search</button>
      </form>
    </div>
  </div>
</nav> */}
      <nav className="navbar bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand bg_das" to={`/user_list/${id}`} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
          </svg> Return To User </NavLink>
          <button type="submit" className='btn btn-primary' onClick={logoutHandler}>LogOut</button>
        </div>

      </nav>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="date" placeholder="Search" aria-label="Search" onChange={changeHangle} />
        <button className="btn btn-outline-success" type="submit" onClick={searchDateHandler}>Search</button>
      </form>
      <div className="user_table_outer table-outer">
        <div className="user_table_inner">

          <div className="card_flex">
            {
              data && currentPosts?.map((m, index) => {
                return (
                  <div key={index} className="card">
                    <img className="small" src={`${serverUrl}/capture/${m.image}`} onClick={handleShowDialog} />
                  </div>
                )
              })
            }


            <Modal
              size="xl"
              isOpen={modal}
              toggle={() => setModal(!modal)}
             
            >
              <ModalHeader
                toggle={() => setModal(!modal)}
              >
                PopUp
              </ModalHeader>
              <ModalBody className="pop_image">
                <img className="image_small" src={`${serverUrl}/capture/${imagesUrl}`} />
              </ModalBody>

            </Modal>


            <Pagination
        postsPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
          </div>
        </div>
      </div>

    </>
  )
}

export default CaptureImageUrl;