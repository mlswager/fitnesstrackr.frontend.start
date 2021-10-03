import React, {useState} from "react"
import axios from "axios"
import {BrowserRouter as Router,Route, Link, Redirect} from "react-router-dom"

const Login = (props)=>{
    let{token,setToken}=props

    //set username and password as state
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

    //interact with api to post the username and password to database
    async function Login(){
        let user = {"username":username,"password":password}
        //console.log(user)
        try{
            //console.log("---start login---")
            const loginResponse = await axios.post(`/api/users/login`,user)
            //console.log("-loginResponse: ",loginResponse,"-")
            setToken(loginResponse.data.token)
            //console.log("token: ",loginResponse.data.token)
            //console.log(loginResponse.data.user.username)
            localStorage.setItem("token",loginResponse.data.token)
            props.history.push("/") //go to home page

        }
        catch(error){
            console.log("user login error: ",error)
            alert("There was an issue with your user login")
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        Login()
    }

    return(
        <div id="login-screen">
            <h2>Login</h2>
            <form id="loginID" onSubmit={handleSubmit}>
                <label htmlFor = "username">Username</label>
                <input type="text" name="username" value={username} onChange={function(event){setUserName(event.target.value)}}/>
                <label htmlFor = "password">Password</label>
                <input type="password" name="password" value={password} onChange={function(event){setPassword(event.target.value)}}/>
                <button type="Submit">Login</button>
                <p>New User? </p><Link to = "/register">Click Here</Link>
                
            </form>
        </div>
    )

}


export default Login;