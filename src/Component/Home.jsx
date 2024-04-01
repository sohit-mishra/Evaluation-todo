import React, { useEffect, useReducer, useState } from 'react';
import { Box, Select } from '@chakra-ui/react';
import Loading from './Loading';
import ShowData from './ShowData';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  todoData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        todoData: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      let params = {};

      if (sort !== "") {
        params._sort = sort;
      }
      
      if (filter !== "") {
        params.status = filter;
      }

      try {
        const response = await axios.get('http://localhost:8080/todo', { params });
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.message });
      }
    };

    fetchData();
  }, [sort, filter]);

  const { error, loading, todoData } = state;

  if (error) {
    return <Box>Error: {error}</Box>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box flexDirection="row" padding="20px 40px">
        <Box>
          <label>
            Sort by:
            <Select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="dueDate">Due Date</option>
            </Select>
          </label>
        </Box>

        <Box>
          <label>
            Filter by status:
            <Select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="">All</option>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </Select>
          </label>
        </Box>
      </Box>

      <ShowData data={todoData} setData={dispatch} />
    </>
  );
}
