import React,{useState} from "react"
import axios from "axios"

const AddActivity = (props)=>{
    let {token,setRefresh}=props

    const[activityName,setActivityName]=useState("")
    const[activityDescription,setActivityDescription]=useState("")

    async function addActivity(){
        try{
            let requiredParams = {
                name:activityName,
                description:activityDescription,
            }
            const response = await axios.post(`/api/activities`,requiredParams,{
                headers: {Authorization: `Bearer ${token}`,}
            })
            // console.log("requiredParams: ",requiredParams)
            //console.log("response: ",response)
            setRefresh(`add activity${response.data.id}`)
        }
        catch(error){
            console.log("activity add error: ",error)
            alert("There was an issue with adding your activity")
        }

    }
    function addHandleSubmit(event){
        event.preventDefault()
        addActivity()
    }
    return(
        <div id="routine-add">
            {
            token ? <div id="addactivity">
                <h2>Create a new Activity</h2>
                <form id="activity-addactivity" onSubmit={addHandleSubmit}>
                <label htmlFor = "addactivity-name">Activity Name</label>
                <input type="text" name="addactivity-name" value={activityName} onChange={function(event){setActivityName(event.target.value)}}/>
                <label htmlFor = "addactivity-description">Activity description</label>
                <input type="text" name="addactivity-description" value={activityDescription} onChange={function(event){setActivityDescription(event.target.value)}}/>
                <button type="Submit">Create Activity</button>
                </form>
            </div> 
            : <div id="activity-add">
                <h2>Please Log in to create a new Activity</h2>
            </div>
            }
        </div>
    )
}

export default AddActivity