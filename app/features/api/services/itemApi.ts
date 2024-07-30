import { Todo } from '@/app/interfaces/todo'
import {apiSlice} from './apiSlice'

export const todoSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
           getTodos: builder.query<Todo[], void>({
            query: () => '/todos',
        }),
        addTodos: builder.mutation<Todo,Todo>({ //2nd arg is type of arg it will take
            query:(todo) => ({
                url:'/todos',
                method:'POST',
                body:todo,
            })
        }),
        updateTodo:builder.mutation<string,Todo>({
            query:(todo)=>({
                url:`/todos/${todo.id}`,
                method:'PUT',
                body:todo
            })
        }),

        deleteTodo:builder.mutation<void,number>({
            query:(id)=>({
                url:`/todos/${id}`,
                method:'DELETE',
                
            })
        })
    })
})


export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
  } = todoSlice;