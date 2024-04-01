import React, { useEffect, useReducer, useState } from 'react';
import { Box, Input, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [todoData, setTodoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/todo/${id}`);
        setTodoData(response.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( { 
      title: state.title,
      description: state.description,
      status: todoData.status, 
      dueDate: todoData.dueDate,
    })
    if (!state.title.trim() || !state.description.trim()) return;
    try {
      await axios.put(`http://localhost:8080/todo/${id}`, { 
        title: state.title,
        description: state.description,
        status: todoData.status, 
        dueDate: todoData.dueDate,
      });
      dispatch({ type: 'RESET' });
      navigate("/"); 
    } catch (error) {
      console.error('Error updating todo:', error);
      alert("An error occurred while updating todo.");
    }
  };

  if (!todoData) {
    return <div>Loading...</div>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" margin="0 auto" width="400px">
      <form onSubmit={handleSubmit} style={{width:"400px"}}>
        <Box mb={4}>
          <Input
            placeholder="Title"
            value={state.title || todoData.title}
            onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
          />
        </Box>
        <Box mb={4}>
          <Textarea
            placeholder="Description"
            value={state.description || todoData.description}
            onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
          />
        </Box>
        <Button type="submit" colorScheme="blue">
          Update Todo
        </Button>
      </form>
    </Box>
  );
}
