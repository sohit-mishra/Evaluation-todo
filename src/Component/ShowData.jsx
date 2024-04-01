import React from 'react';
import {Box, Flex, Text, Button, Grid, Card, ButtonGroup } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ShowData({ data, setData }) {
  const navigate = useNavigate();

  const onHandleEdit = id => {
    navigate(`/edit/${id}`);
  };

  const onHandleCreate = ()=> {
    navigate(`/create`);
  };

  const onHandleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8080/todo/${id}`);
      const updatedData = data.filter(todo => todo.id !== id);
      setData({ type: 'FETCH_SUCCESS', payload: updatedData });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
<Box flexDirection="column">
    <Button variant="solid" colorScheme="blue" margin="30px auto" display="block" onClick={onHandleCreate}>
    Create <EditIcon />
  </Button>
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} padding="20px 40px">
      {data?.map(todo => (
        <Card key={todo.id} marginBottom="4" padding="30px">
          <Link to={`/task/${todo.id}`} style={{ textDecoration: 'none' }}>
            <Flex flexDirection="column">
              <Text>id: {todo.id}</Text>
              <Text>Title: {todo.title}</Text>
              <Text>Description: {todo.description}</Text>
              <Text>Status: {todo.status}</Text>
              <Text>Due Date: {todo.dueDate}</Text>
            </Flex>
          </Link>
          <ButtonGroup marginTop="4">
            <Button variant="solid" colorScheme="blue" onClick={() => onHandleEdit(todo.id)}>
              Edit <EditIcon />
            </Button>
            <Button variant="solid" colorScheme="red" onClick={() => onHandleDelete(todo.id)}>
              Delete <DeleteIcon />
            </Button>
          </ButtonGroup>
        </Card>
      ))}
    </Grid>
    </Box>
  );
}
