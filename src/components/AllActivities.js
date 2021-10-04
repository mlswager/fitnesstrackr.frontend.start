import React, { useState,useEffect, } from "react"
import axios from "axios"
import AddActivity from "./AddActivity"

const AllActivities = (props) =>{
    let {token,user,refresh,setRefresh}=props

    const[activitiesList,setActivitiesList]=useState([])

/*---load page---*/
    useEffect(()=>{
        const loadActivities = async()=>{
            try{
                const activitiesList = await axios.get(`/api/activities`)
                console.log("activities: ",activitiesList.data)
                setActivitiesList(activitiesList.data.reverse())
            }
            catch(error){
                console.log("activities load error: ",error)
                alert("There was an issue loading your activities")
            }
        }
    loadActivities()
    },[refresh])


    /*---return---*/
    return(
        <div>
            <AddActivity
            token={token}
            setRefresh={setRefresh}
            />
            <h2>Activities</h2>
            {activitiesList.map(function(element){
                return(
                    <div key={element.id} className="activities">
                        <h3>{element.name}</h3>
                        <p>description: {element.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default AllActivities