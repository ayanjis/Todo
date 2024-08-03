import React, { useEffect, useState, useRef } from 'react'
import './CSS/Todo.css'
import TodoItems from './TodoItems'
import UpdatePopup from './UpdatePopup'

let count = 0

function Todo() {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [popupContent, setPopupContent] = useState({})

  const [todos, setTodos] = useState([])
  const inputRef = useRef(null)

  const add = () => {
    setTodos([...todos, { no: count++, text: inputRef.current.value, display: '' }])
    if (inputRef.current.value == '') {
      localStorage.removeItem('todos_count', count)
    } else {
      localStorage.setItem('todos_count', count)
    }
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos')))
    count = localStorage.getItem('todos_count')
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log(todos)
      localStorage.setItem('todos', JSON.stringify(todos))
    }, 100);
  }, [todos])

  const revTodos = [].concat(todos).reverse()

  return (
    <div>
      <div className="todo">
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
        {/* <form className="todo-add" onSubmit={handleSubmit(submit)}> */}
          {/* <input className='todo-input' ref={inputRef} type="text" name={name} placeholder='Add your task' { ...register(name, { required: true }) }/> */}
          <input className='todo-input' ref={inputRef} type="text" placeholder='Add your task'/>
          <button onClick={() => { add() }} className="todo-add-btn">ADD</button>
        </div>
        <div className="todo-list">
          {
            revTodos.map((item, index) => {
              return <TodoItems key={index} 
              setTodos={setTodos} no={item.no} 
              setShowUpdatePopup={setShowUpdatePopup} 
              setPopupContent={setPopupContent}
              display={item.display} 
              text={item.text} />
            })
            
          }
        </div>
      </div>

      {
        showUpdatePopup && <UpdatePopup
          setShowUpdatePopup={setShowUpdatePopup}
          popupContent={popupContent}
        />
      }
    </div>
  )
}

export default Todo
