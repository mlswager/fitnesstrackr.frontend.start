import React,{useState,useEffect} from "react"
import axios from "axios"

import AddRoutine from "./AddRoutine"
import AddRoutineActivities from "./AddRoutineActivity"
import EditRoutineActivity from "./EditRoutineActivity"

const AllRoutines = (props)=>{
    let {token,setToken,user}=props

    /*------set state------*/
    const[refresh,setRefresh]=useState("")
    const[allRoutines,setAllRoutines]=useState([])
    const[myRoutines,setMyRoutines]=useState([])
    const[routineId,setRoutineId]=useState("")
    const[activitiesList,setActivitiesList]=useState([])
    //console.log("user: ",user)
    /*------Load page------*/
    useEffect(()=>{
        const loadPostsTokenYes = async()=>{
            /*---create list of routines to display---*/
            const allRoutinesResponse = await axios.get("/api/routines")
            //console.log("allroutines: ",allRoutinesResponse.data)
            
            const myRoutinesResponse = await axios.get(`/api/users/${user.username}/routines`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("myroutines: ",myRoutinesResponse.data)
            setMyRoutines(myRoutinesResponse.data.reverse())
            
            const filteredArray = allRoutinesResponse.data.filter(element =>{
                return element.creatorId !== user.id
            })
            setAllRoutines(filteredArray.reverse())
        }
        const loadPostsTokenNo = async()=>{
            const allRoutinesResponse = await axios.get("/api/routines")
            //console.log("allroutines: ",allRoutinesResponse.data)
            setAllRoutines(allRoutinesResponse.data.reverse())
        }
        if(token){
            console.log("---tokenYES---")
            loadPostsTokenYes()
        }
        else{
            console.log("---tokenNO---")
            loadPostsTokenNo()
        }

        /*---get a list of all activities---*/
        async function getActivities(){
            try{
                const activitiesList = await axios.get(`/api/activities`)
                console.log("activities: ",activitiesList.data)
                setActivitiesList(activitiesList.data)
            }
            catch(error){
                console.log("routine get activities error: ",error)
                alert("There was an issue getting your activities")
            }
        }
        if(token){
            console.log("---activitiesYES---")
            getActivities()
        }

    },[user,refresh])

    /*------delete routine function------*/
    async function deleteRoutine(routineId){
        try{
            const response = await axios.delete(`api/routines/${routineId}`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            setRefresh(`delete routine ${routineId}`)
        }
        catch(error){
            console.log("routine delete error: ",error)
            alert("There was an issue with deleting your routine")
        }
    }
    /*------remove routine activity function------*/
    async function removeRoutineActivity(routineActivityId){
        try{
            console.log("routineActivityId: ",routineActivityId)
            const response = await axios.delete(`/api/routine_activities/${routineActivityId}`,{
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log("response: ",response)
            setRefresh(`remove activity${routineActivityId}`)
        }
        catch(error){
            console.log("routine activity remove error: ",error)
            alert("There was an issue with removing the activity from your routine")
        }
    }


    /*------return------*/
    return(
        <div id="routines-screen">
            <AddRoutine
            token={token}
            setRefresh={setRefresh}
            />
            {<h2>My Routines</h2>}
            {myRoutines.map(function(elementR){
                let routineId=elementR.id
                return(
                    <div key={elementR.id} className="routine-myroutine">
                        <h3>{elementR.name}</h3>
                        <p className="routine-creatorname">creator: {elementR.creatorName}</p>
                        {<button className="routine-delete" onClick={()=>{deleteRoutine(elementR.id)}}>Delete Routine</button>}
                        <p className="routine-goal">goal: {elementR.goal}</p>
                        {<AddRoutineActivities
                        token={token}
                        activitiesList={activitiesList}
                        routineId={routineId}
                        setRefresh={setRefresh}
                        />}
                        {elementR.activities.map(function(elementA){
                            let routineActivityId = elementA.routineActivityId
                            return(
                                <div key={elementA.id} className="routine-activities">
                                    <h3>{elementA.name}</h3>
                                    {<button className="routine-activity-delete" onClick={()=>{removeRoutineActivity(elementA.routineActivityId)}}>Remove Activity</button>}
                                    <p className="routine-activity-count">count: {elementA.count}</p>
                                    <p className="routine-activity-duration">duration: {elementA.duration}</p>
                                    {<EditRoutineActivity
                                    token={token}
                                    routineActivityId={routineActivityId}
                                    setRefresh={setRefresh}
                                    />}
                                    <p className="routine-activity-description">description: {elementA.description}</p>
                                </div>
                            )
                        })}
                    </div> 
                )
            })}
            {<h2>Public Routines</h2>}
            {allRoutines.map(function(elementR){
                return(
                    <div key={elementR.id} className="routine-myroutine">
                        <h3>{elementR.name}</h3>
                        <p className="routine-creatorname">creator: {elementR.creatorName}</p>
                        <p className="routine-goal">goal: {elementR.goal}</p>
                        {elementR.activities.map(function(elementA){
                            return(
                                <div key={elementA.id} className="routine-activities">
                                    <h3>{elementA.name}</h3>
                                    <p className="routine-activity-count">count: {elementA.count}</p>
                                    <p className="routine-activity-duration">duration: {elementA.duration}</p>
                                    <p className="routine-activity-description">description: {elementA.description}</p>
                                </div>
                            )
                        })}
                    </div>    
                )
            })}
        </div>
    )

}
export default AllRoutines