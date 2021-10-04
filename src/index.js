import React, {useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {BrowserRouter as Router,Route} from "react-router-dom"

/*---import component functions*/
import Register from "./components/Register"
import Login from "./components/Login"
import Title from "./components/Title"
import AllRoutines from "./components/AllRoutines"
import AllActivities from './components/AllActivities'


/*---demo---*/
// async function fetchMyData() {
//   let { data } = await axios.get('/api/routines')

//   console.log(data)
// }
// fetchMyData()
// ReactDOM.render(<h1>Hello World</h1>, document.getElementById('app'))

/*---set states---*/
const App = ()=>{
  const[token,setToken]=useState("")
  const[user,setUser]=useState("")
  const[refresh,setRefresh]=useState("")
  


  /*---grab token from local storage when needed---*/
  useEffect(()=>{
    localStorage.getItem("token") ? setToken(localStorage.getItem("token")):setToken("")
    
    const getUser = async()=>{
      const gotUser = await axios.get(`/api/users/me`,{
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      })
      //console.log("gotUser: ",gotUser.data)
      setUser(gotUser.data)

  }
  if(localStorage.getItem("token")){
    getUser()
  }

  },[])
    
  //set paths
  return <div id="app">
    <Router>

    <Title
    token={token}
    setToken={setToken}
    />

    <Route //registration page path
      path="/register"
      render={(renderprops) => 
        <Register
          {...renderprops}
          token={token}
          setToken={setToken}
        />}
     />
    <Route //Login page path
      path="/login"
      render={(renderprops)=>
        <Login 
          {...renderprops}
          token={token}
          setToken = {setToken}
        />}    
    />
    <Route
      path="/all-routines"
      render={()=>
        <AllRoutines 
          token={token}
          user = {user}
          refresh= {refresh}
          setRefresh = {setRefresh}
        />}
    />
    <Route
      path="/all-activities"
      render={()=>
        <AllActivities 
          token={token}
          user = {user}
          refresh = {refresh}
          setRefresh = {setRefresh}
        />}
    />
</Router>
  </div>
}


ReactDOM.render(<App/>,document.getElementById('app'))

