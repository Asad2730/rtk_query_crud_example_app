
'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from "react"
import { useGetTodosQuery, useAddTodosMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../features/api/services/apiSlice'
import { Todo } from '../interfaces/todo'




const TodoList = () => {
    const [newTodo, setNewTodo] = useState("")
    const {data:todos,error,isLoading,isSuccess,isError} = useGetTodosQuery()
    const [addTodo] = useAddTodosMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo:Todo = {id:1,title:newTodo,completed:false}
        addTodo(todo)
    }

    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value)
    };
   
    const handleUpdateTodo = async (todo: Todo) => {
        await updateTodo({ ...todo, completed: !todo.completed });
    };

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id);
    };
    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleTodoChange}
                    placeholder="Enter new todo"
                />
            </div>
            <button type="submit" className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );


    let content;
    if(isLoading){
      content = <p>Loading...</p>
    }
    else if(isSuccess){
        content = <p>{JSON.stringify(todos)}</p>
    }
    else if(isError){
       content = <p>{JSON.stringify(error)}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList