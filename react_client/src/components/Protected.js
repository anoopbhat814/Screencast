import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Protected(props){
    const {Component} = props;


    const navigate = useNavigate()

    useEffect(()=>{
        const login = localStorage.getItem("login")
           if(!login){
            navigate("/login")
           }
    })
    

    return(
        <>
        <Component/>
        </>
    )
}
export default Protected;