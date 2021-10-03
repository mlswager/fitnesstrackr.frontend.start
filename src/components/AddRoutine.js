import React,{useState} from "react"
import axios from "axios"

const AddRoutines = (props)=>{
    let {token,setRefresh}=props
    
    const[routineName,setRoutineName]=useState("")
    const[routineGoal,setRoutineGoal]=useState("")
    const[routineIsPublic,setRoutineIsPublic]=useState(false)

/*------add routine------*/
    async function addRoutine(){
        try{
            let requiredParams = {
                name:routineName,
                goal:routineGoal,
                isPublic:routineIsPublic
            }
            
            const response = await axios.post(`/api/routines`,requiredParams,{
                headers: {Authorization: `Bearer ${token}`,}
            })
            // console.log("requiredParams: ",requiredParams)
            //console.log("response: ",response)
            setRefresh(`add ${response.data.id}`)
        }
        catch(error){
            console.log("routine add error: ",error)
            alert("There was an issue with adding your routine")
        }
    }
    function addHandleSubmit(event){
        event.preventDefault()
        addRoutine()
    }
    return(
        <div id="routine-add">
            {
            token ? <div id="addroutine">
                <h2>Create a new Routine</h2>
                <form id="routine-addroutine" onSubmit={addHandleSubmit}>
                <label htmlFor = "addroutine-name">Routine Name</label>
                <input type="text" name="addroutine-name" value={routineName} onChange={function(event){setRoutineName(event.target.value)}}/>
                <label htmlFor = "addroutine-goal">Routine Goal</label>
                <input type="text" name="addroutine-goal" value={routineGoal} onChange={function(event){setRoutineGoal(event.target.value)}}/>
                <button type="Submit">Create Routine</button>
                </form>
            </div> 
            : <div id="routine-add">
                <h2>Please Log in to create a new Routine</h2>
            </div>
            }
        </div>
    )
}

export default AddRoutines;