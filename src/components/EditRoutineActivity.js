import React,{useState} from "react"
import axios from "axios"

const EditRoutineActivity = (props=>{
    let {token, routineActivityId, setRefresh}=props

    const [count,setCount]=useState(0)
    const [duration,setDuration]=useState(0)

    async function editRoutineActivity(){
        //console.log("routineActivityId: ",routineActivityId)
        try{
            if(isNaN(count) || isNaN(duration) ){
                alert("There was an issue with adding an activity to your routine\ncount and duration must be numbers")
            }
            else{
                let requiredParams = {
                    count:count,
                    duration:duration
                }
                const response = await axios.patch(`/api/routine_activities/${routineActivityId}`,requiredParams,{
                    headers: {Authorization: `Bearer ${token}`}
                })
                setRefresh(`editcountduration ${response.data.id}`)
            }   
        }
        catch(error){
            console.log("routine activity edit error: ",error)
            alert("There was an issue editing the activity for your routine")
        }
    }

    function editHandleSubmit(event){
        event.preventDefault()
        editRoutineActivity()
    }

    return(
        <form className="routine-activity-edit" onSubmit={editHandleSubmit}>
            <label htmlFor = "edit-count">count</label>
            <input type="edit-name" value={count} name="edit-count" onChange={function(event){setCount(event.target.value)}}/>
            <label htmlFor = "edit-duration">duration</label>
            <input type="edit-name" name = "edit-duration" value={duration} onChange={function(event){setDuration(event.target.value)}}/>
            <button type="Submit">Edit Activity</button>
        </form>
    )

})

export default EditRoutineActivity