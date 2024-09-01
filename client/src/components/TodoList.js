import {gql, useQuery} from '@apollo/client'
import { useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import {ScaleLoader} from 'react-spinners'
import Table from 'react-bootstrap/Table'
import { FaTrash } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { MdDone } from "react-icons/md"

const GET_TODOS = gql`
query getTodos {
  todos {
    id,
    title,
    completed
  }
}
`
const DELETE_TODO = gql`
mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    id,
    title,
    completed
  }
}
`

export default function TodoList(){

    const [deleteTodo] = useMutation(DELETE_TODO)
    const removeTodo = (id) => {
        deleteTodo({
            variables:{id:id},
            refetchQueries:[{query: GET_TODOS}]
        })
    }

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>To Do</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.todos.map((todo)=>(
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td><FaEdit /></td>
                                <td>
                                    <Button 
                                        variant="danger"
                                        onClick={()=>{removeTodo(todo.id)}}
                                        >
                                        <FaTrash />
                                    </Button>
                                </td>
                                <td><MdDone /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
      )}
        </>
    )
}