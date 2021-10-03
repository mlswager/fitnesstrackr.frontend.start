import React, {useState} from "react"
import axios from "axios"

const AddRoutineActivities = (props)=>{
    let{token,activitiesList,routineId,setRefresh}=props
    /*---set state---*/
    const [changeActivity,setChangeActivity]=useState("")
    const [count,setCount]=useState(0)
    const [duration,setDuration]=useState(0)
    /*---function to post to database---&*/
    async function postRoutineActivities(){
        let requiredParams={
            activityId: changeActivity,
            count: count,
            duration: duration
        }
        //console.log("changeActivity: ",changeActivity," routineId: ",routineId)
        try{
            if(isNaN(count) || isNaN(duration) ){
                alert("There was an issue with adding an activity to your routine\ncount and duration must be numbers")
            }
            else{
                const response = await axios.post(`/api/routines/${routineId}/activities`,requiredParams,{
                    headers: {Authorization: `Bearer ${token}`,}
                })
                setRefresh(`addactivity ${response.data.id}`)
            }
        }
        catch(error){
            console.log("routine add activity error: ",error)
            alert("There was an issue with adding an activity to your routine")
        }
    }
    /*---sets changeActivity to selected activity id from dropdown---*/
    function changeChangeActivity(event){
        setChangeActivity(event.target.value)
    }
    /*---tells postRoutineActivity to run when submit button is selected---*/
    function submitRoutineActivity(event){
        event.preventDefault()
        postRoutineActivities() 
    }

    /*---map through activities list for dropdowndisplay---*/
    let activityDisplay = activitiesList.map(function(element){
        let activity=element.name
        return(
            <option key = {element.id} value = {element.id}>
                {activity}
            </option>
            )
    })

    /*---return---*/
    return(
        <form className="routine-activity-dropdown" onSubmit={submitRoutineActivity}>
                <label htmlFor="select-activity">add activity to routine</label>
                <select 
                    name="activity"
                    id="select-activity"
                    value={changeActivity} 
                    onChange={changeChangeActivity}>
                    <option value="any">Any</option>
                    {activityDisplay}
                </select>
                <label htmlFor = "routine-activity-count">count</label>
                <input type="text" name="routine-activity-count" value={count} onChange={function(event){setCount(event.target.value)}}/>
                <label htmlFor = "routine-activity-duraction">duration</label>
                <input type="text" name="routine-activity-duraction" value={duration} onChange={function(event){setDuration(event.target.value)}}/>
                <button type="Submit">add activity</button>
        </form>
    )
}
export default AddRoutineActivities