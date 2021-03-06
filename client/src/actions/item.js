import axios from 'axios';
import {
  GET_ITEMS,
  GET_ITEM_BY_MONTH,
  CREATE_ITEM,
  REMOVE_ITEM,
  REDUCE_ITEM_BY_50,
  REDUCE_ITEM_BY_90
} from './types';

// Get All Items
export const getItems = () => async dispatch => {
  const res = await axios.get('/api/items');
  dispatch({
    type: GET_ITEMS,
    payload: res.data
  });
};

// Get Items By Month
export const getItemsByMonth = (month, year) => async dispatch => {
  const res = await axios.get(`/api/items/${month}/${year}`);
  dispatch({
    type: GET_ITEM_BY_MONTH,
    payload: res.data
  });
};

// Create Item
export const createItem = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await axios.post('/api/items/', formData, config);
  dispatch({
    type: CREATE_ITEM,
    payload: res.data
  });
};

// Reduce item by 50%
export const reduceItemBy50 = id => async dispatch => {
  const res = await axios.patch(`api/items/50/${id}`);
  // console.log(res.data);
  dispatch({
    type: REDUCE_ITEM_BY_50,
    payload: res.data
  });
};

// Reduce item by90%
export const reduceItemBy90 = id => async dispatch => {
  const res = await axios.patch(`api/items/90/${id}`);
  console.log(res.data);
  dispatch({
    type: REDUCE_ITEM_BY_90,
    payload: res.data
  });
};

// Remove Item
export const removeItem = id => async dispatch => {
  const res = await axios.delete(`api/items/${id}`);
  dispatch({
    type: REMOVE_ITEM,
    payload: res.data
  });
};
