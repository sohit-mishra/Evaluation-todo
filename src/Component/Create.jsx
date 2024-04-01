import React, { useReducer } from 'react';
import { Box, Input, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios'; 

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

export default function Create() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.title.trim() || !state.description.trim()) return;
    try {
      await axios.post('http://localhost:8080/todo', { 
        title: state.title,
        description: state.description,
        status: 'incomplete',
        dueDate: new Date().toISOString().split('T')[0],
      });
      dispatch({ type: 'RESET' });
      alert("Todo added successfully!");
    } catch (error) {
      console.error('Error adding todo:', error);
      alert("An error occurred while adding todo.");
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" margin="0 auto" width="400px">
  <form onSubmit={handleSubmit} style={{width:"400px"}}>
    <Box mb={4}>
      <Input
        placeholder="Title"
        value={state.title}
        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
      />
    </Box>
    <Box mb={4}>
      <Textarea
        placeholder="Description"
        value={state.description}
        onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
      />
    </Box>
    <Button type="submit" colorScheme="blue">
      Add Todo
    </Button>
  </form>
</Box>

  );
}
