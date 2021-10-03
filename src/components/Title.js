import React from "react"
import {BrowserRouter as Router,Route, Link, Redirect} from "react-router-dom"

const Title = (props)=>{
    let {token,setToken,}=props
    //console.log(username)

    function logoutFunc(event){
        event.preventDefault()
        setToken("")//sets token to empty string
        localStorage.removeItem("token")//removes token from local storage
    }
    
    return(
        <div id="title">
            <h1>FitnessTrackr</h1>
            <div id="title-buttons">
                {/* {token ? <h3 id="title-welcome">{`Hello ${user.username}`}</h3>: null} */}
                {token ? <button id="logout" onClick={logoutFunc}>Logout</button>:<Link to = "/login">Login</Link>}
            <Link to = "/all-routines">All Routines</Link>
            </div>
        </div>
    )
}

export default Title;