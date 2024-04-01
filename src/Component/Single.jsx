import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Flex, Text} from '@chakra-ui/react';
import axios from 'axios';
import Loading from './Loading';

export default function Single() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/todo/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[]);

  return (
    <div>
      {data ? (
        <Card marginBottom="4" padding="30px">
          <Flex flexDirection="column">
            <Text>ID: {data.id}</Text>
            <Text>Title: {data.title}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Status: {data.status}</Text>
            <Text>Due Date: {data.dueDate}</Text>
          </Flex>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
}
