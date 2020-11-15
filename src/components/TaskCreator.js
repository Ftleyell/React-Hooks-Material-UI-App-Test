import React, {useState} from 'react'

export const TaskCreator = props => {

const [newTaskName,setNewTaskName] = useState('')

const updateNewTaskValue = e => setNewTaskName(e.target.value)

const createNewTask = () => {
    props.callback(newTaskName)
    setNewTaskName('')
}

    return (
        <div>
            <input 
            type="text"
            value={newTaskName}
            onChange={updateNewTaskValue}
            />
            <button onClick={createNewTask}>
                ADD
            </button>
        </div>
    )
}