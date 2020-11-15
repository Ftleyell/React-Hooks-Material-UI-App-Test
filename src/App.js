import React, { useState,useEffect } from "react"
import './App.css';
import {TaskRow} from './components/TaskRow'
import {TaskBanner} from './components/TaskBanner'
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from './components/VisibilityControl'

function App() {

  const [userName, setUserName] = useState("Frani");

  const [taskItems, setTaskItems] = useState([]);

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data != null){
      setTaskItems(JSON.parse(data))
    }else{
      setUserName("User")
      setTaskItems([])
      setShowCompleted(true)
    }
  },[])

  useEffect( () => {
    localStorage.setItem(
      'tasks',
      JSON.stringify(taskItems)
      
    )
  },[taskItems])

  const createNewTask = taskName =>{
    if (!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems,{id:taskItems.length+1,name:taskName,done:false}])
    }
  }

  const toggleTask = task =>
  setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))

  const TaskTableRows = (doneValue) => 
    taskItems
    .filter(task => task.done === doneValue)
    .map(task =>(
      <TaskRow task={task} key={task.id} toggleTask={toggleTask}/>
    ))
  

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator callback={createNewTask}/>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {TaskTableRows(false)}
        </tbody>
      </table>
      <div>
        <VisibilityControl
        description="SHOW COMPLETED TASKS"
        isChecked={showCompleted}
        callback={checked => setShowCompleted(checked)}
        />
      </div>
      {
        showCompleted && (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {TaskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
