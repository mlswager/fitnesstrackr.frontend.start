import React, {useState} from "react"
import axios from "axios"

const Register = (props) =>{
    let {token,setToken}=props

    //set username and password as state
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")

    //interact with api to post the username and password to database
    async function registration(){
        let user = {"username":username,"password":password}
        //console.log(user)
        try{
            //console.log("---start registration---")
            const registerResponse = await axios.post(`/api/users/register`,user)
            //console.log("-registerResponse: ",registerResponse,"-")
            setToken(registerResponse.data.token)
            //console.log("token: ",registerResponse.data.token)
            localStorage.setItem("token",registerResponse.data.token)
            props.history.push("/") //go to home page
        }

    catch(error){
        console.log("user registration error: ",error)
        alert("There was an issue with your user registration")
    }
    }
    function handlesubmit(event){
        event.preventDefault()
        registration()
    }

    return(
        <div id="registration-screen">
            <h2>Register</h2>
            <form id="registerID" onSubmit={handlesubmit}>
                <label htmlFor = "username">Username</label>
                <input type="text" name="username" value={username} onChange={function(event){setUserName(event.target.value)}}/>
                <label htmlFor = "password">Password</label>
                <input type="password" name="password" value={password} onChange={function(event){setPassword(event.target.value)}}/>
                <button type="Submit">Register</button>
            </form>
        </div>
    )

}

export default Register;