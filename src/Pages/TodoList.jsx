import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const TodoList = () => {

    const [todo, setTodo] = useState('')
    const [status, setStatus] = useState(false);
    const [todoArray, setTodoArray] = useState([])

    //create post
    const postTodo = async () => {
        try {
            axios.post("http://localhost:5000/csbs/addtodo", { todo });
            setTodo('')
            setStatus(true)
            getTodo()
            setTimeout(() => setStatus(false), 3000);
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTodo()
    }, [])

    //read get

    const getTodo = async () => {
        await axios.get('http://localhost:5000/csbs/gettodo')
            .then((resopnse) => {
                setTodoArray(resopnse.data)
            })
            .catch((err) => {
                console.error(err);
            })
    }


    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/csbs/deletetodo/${id}`);
            getTodo()
        }
        catch (err) {
            console.error(err)
        }

    }

    const updateTodo = async (id, data) => {
        try {
            await axios.put(`http://localhost:5000/csbs/updatetodo/${id}`, { todo: data });
            getTodo()
        }
        catch (err) {
            console.error(err);
        }
    }
    const newTodo = async (id, data) => {
        const newData = prompt("Enter your new todo", data);
        if (newData.trim() == "") {
            newTodo(id)
        }
        updateTodo(id, newData);
    }

    return (
        <div className='card w-150 bg-amber-100 p-5 mt-20 ml-80 rounded-4xl flex flex-col items-center'>
            <Typography className='m-1' variant="h4" component="h2">
                Todo
            </Typography>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <Box sx={{ width: 200, maxWidth: '100%' }}>
                        <TextField
                            fullWidth
                            label="fullWidth"
                            id="fullWidth"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </Box></div>
                <div>
                    <button onClick={postTodo} className='rounded-2xl bg-amber-900 px-2 py-1 ml-3'>
                        Add
                    </button>
                </div>
            </div>
            {status && <div style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: "999",
            }}>

                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    todo
                </Alert>
            </div>}

            <div>
                <ul className='op'>
                    {
                        todoArray.map((res) => (
                            <li key={res._id} className='li1'>
                                <h3>{res.todo}</h3>
                                <div>

                                    <IconButton aria-label="update" size="small" onClick={() => newTodo(res._id, res.todo)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton aria-label="delete" size="small" onClick={() => deleteTodo(res._id)} >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default TodoList