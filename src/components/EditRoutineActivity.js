import React,{useState} from "react"
import axios from "axios"

const EditRoutineActivity = (props=>{
    let {token, routineActivityId, setRefresh,elementA}=props

    const [count,setCount]=useState(0)
    const [duration,setDuration]=useState(0)
    const[CountDurationToggle,setCountDurationToggle]=useState(true)

    async function editRoutineActivity(){
        //console.log("routineActivityId: ",routineActivityId)
        console.log("elementA: ",elementA)
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
                setCountDurationToggle(!CountDurationToggle)
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

    
    console.log(CountDurationToggle)

    return(
        <div key = {elementA.id} className="routine-activity-countduration">
                <p className="routine-activity-count">count: {elementA.count}</p>
                <p className="routine-activity-duration">duration: {elementA.duration}</p>
                {CountDurationToggle ? 
                    <button onClick={()=>{setCountDurationToggle(!CountDurationToggle);setRefresh(`edit`)}}>Edit</button>
                :
                    <form className="routine-activity-edit" onSubmit={editHandleSubmit}>
                        <label htmlFor = "edit-count">count</label>
                        <input type="edit-name" value={count} name="edit-count" onChange={function(event){setCount(event.target.value)}}/>
                        <label htmlFor = "edit-duration">duration</label>
                        <input type="edit-name" name = "edit-duration" value={duration} onChange={function(event){setDuration(event.target.value)}}/>
                        <button type="Submit">save</button>
                        <button onClick={()=>{setCountDurationToggle(!CountDurationToggle);setRefresh(`edit`)}}>cancel</button>
                    </form>
                }
        </div>
    )
})

export default EditRoutineActivity