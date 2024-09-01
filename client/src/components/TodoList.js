import {gql, useQuery} from '@apollo/client'
import {ScaleLoader} from 'react-spinners'

const GET_TODOS = gql`
query getTodos {
  todos {
    id,
    title,
    completed
  }
}
`
export default function TodoList(){
    const {loading, error, data} = useQuery(GET_TODOS)

    return(
        <>
           
           {loading ? (
            <ScaleLoader
            height={35}
            width={4}
            color='#010a08'
            aria-label='scale-loading'
            />
                ) : error ? (
                    <p>Something went wrong</p>
                ) : (
            <div>
            {data.todos?.length === 0 ? ( 
                <p>No todos found.</p>
            ) : (
                <ul>
                {data.todos.map((todo) => ( 
                    <li key={todo.id}>
                    {todo.title}
                    </li>
                ))}
                </ul>
            )}
        </div>
      )}
        </>
    )
}