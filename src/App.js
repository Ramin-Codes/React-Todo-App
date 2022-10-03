import React, { useCallback, useState } from 'react'



function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState([])
  

  /*----------TodoTextFunc----------*/
  const setTodoTextFunc = useCallback((e) => {
    setTodoText(e.target.value)
  }, [])


  /*----------SubmitForm----------*/
  const submitForm = useCallback(e => {
    e.preventDefault()
    if (!todoText.trim()) return

    setTodos([
      {
        id: todos.length ? todos[0].id + 1 : 1,
        text: todoText ,
        done: false
      },
      ...todos, 
    ])
    setTodoText('')

  }, [todoText, todos])



  /*----------HandleCheckbox----------*/
  const handleCheckbox = useCallback((todo, index) => () => {
    const newTodos = [...todos]
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    })
    setTodos(newTodos)
  }, [todos])



  /*----------RemoveTodo----------*/
  const removeTodo = useCallback((todo) => () => {
    setTodos(todos.filter(todoItem => todoItem !== todo))
  }, [todos])



  /*----------MarkAllDone----------*/
  const markAllDone = useCallback(() => {
    setTodos(todos.map(todo => ({
      ...todo,
      done: true
    })))
  }, [todos])




  return (
    <div id='app'>

      {/*----------FormInput----------*/}
      <form onSubmit={submitForm}>
        <input type="text" value={todoText} onChange={setTodoTextFunc} />
        <button>Add Todo</button>
      </form>

      {/*----------Todos----------*/}
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {
          todos?.map((todo, index) => {
            return (
              <li key={todo.id}>

                <p style={{ textDecoration: todo.done && 'line-through'}}>{todo.text}</p>

                <input 
                  type="checkbox" 
                  checked={todo.done} 
                  onChange={handleCheckbox(todo, index)}
                />
                
                <button onClick={removeTodo(todo)}>remove</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App;


