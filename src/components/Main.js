import  React, {useState, useEffect} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import { FaCheck } from "react-icons/fa";
import { todos } from '../todos.js';

export const Main = () => {

const [completed, setCompleted] = useState(false);
const [allTodos, setAllTodos] = useState([]); 
const [newTask, setNewTask] = useState("");
const [completedTodos, setCompletedTodos] = useState([]);

const handleAddTask = ()=>{
  let newTodoItem = {
    todo: newTask,
    completed: false
  }
   
  if(newTask !== ""){
      let updatedTodoList = [...allTodos];
      updatedTodoList.push(newTodoItem);
       
      setAllTodos(updatedTodoList);

      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('todolist', JSON.stringify(updatedTodoList)); 

      setNewTask("");
  }
};

const handleDeleteTodo = (index)=>{
  let deletedTodo = [...allTodos];
  deletedTodo.splice(index,1);

  localStorage.setItem('todolist',JSON.stringify(deletedTodo));
  setAllTodos(deletedTodo);
};

const handleComplete = (index)=>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth()+1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
  
  let filteredItem = {
    ...allTodos[index],
    completedOn: completedOn
  }

  let updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.push(filteredItem);
  setCompletedTodos(updatedCompletedArr);
  handleDeleteTodo(index);
  localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
 
};

const handleDeleteCompletedTodo = (index)=>{
  let deletedTodo = [...completedTodos];
  deletedTodo.splice(index,1);

  localStorage.setItem('completedTodos',JSON.stringify(deletedTodo));
  setCompletedTodos(deletedTodo);
};

 useEffect(()=>{
  const storedTodos =JSON.parse(localStorage.getItem('todos'));
  const savedTodo = JSON.parse(localStorage.getItem('todolist'));
  const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
  
  if(storedTodos && savedTodo){
    setAllTodos(storedTodos && savedTodo);
  } 

  if(savedCompletedTodo){
    setCompletedTodos(savedCompletedTodo);
  }

  }, []);

return (
      <div className="ui container ">  
          <div className="ui form">
              <input type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)} id="task" placeholder="Enter a task" />
              <button type='button'  onClick={handleAddTask} className="ui button" id="btn" >Add</button> 
          </div>
          <div className="btn-area"> 
                <button className={`ui button ${completed===false && "active"}`} onClick={()=>setCompleted(false)}>
                To Do
                </button>
                <button className={`ui button ${completed===true && "active"}`} onClick={()=>setCompleted(true)}> 
                Completed
                </button>
          </div>
          <div className="todo-list">
               { 
                completed===false  &&  allTodos.map((item, index)=>{
                  return (
                        <div className="todo-list-item" key={index}>
                            <div>
                              <p>{item.todo}</p>
                            </div>
                            <div className="icons"> 
                              <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
                              <FaCheck className='check-icon' onClick={()=>handleComplete(index)}  title='Complete?'/>
                            </div>
                        </div>
                  );
                })
               }
               {
                  completed===true  &&  completedTodos.map((item, index)=>{
                        return (
                        <div className="todo-list-item" key={index}>
                            <div>
                              <p>{item.todo}</p>
                              <p><small>Completed on:{item.completedOn}</small></p>
                            </div>
                            <div className="icons"> 
                              <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
                            </div>
                        </div>
                      );
                })
               }
          </div>
      </div>
      );
    }
