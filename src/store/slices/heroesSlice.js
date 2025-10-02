import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../BaseUrl';


// Initial state
const initialState = {
  heroes: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch heroes
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const response = await axios.get(`${BASE_URL}/heroes`);
  return response.data;
});


// async thunk to add a new hero
export const addNewHero = createAsyncThunk(
    'heroes/addNewHero',
     async (initialHero) => {
  const response = await axios.post(`${BASE_URL}/heroes`, initialHero);
  return response.data;
});

// async thunk to delete a hero
export const deleteHero = createAsyncThunk(
    'heroes/deleteHero',
     async (heroId) => {
  await axios.delete(`${BASE_URL}/heroes/${heroId}`);
  return heroId;
}); 


// async thunk to get hero by id
export const fetchHeroById = createAsyncThunk(
    'heroes/fetchHeroById',
     async (heroId) => {
  const response = await axios.get(`${BASE_URL}/heroes/${heroId}`);
  return response.data;
});


// async Thank Hero POST /api/heroes/:id/thank
export const thankHero = createAsyncThunk(
    'heroes/thankHero',
     async (heroId) => {
  const response = await axios.post(`${BASE_URL}/heroes/${heroId}/thank`);
  return response.data;
});         


// asyn thunk add comment to hero POST /api/heroes/:id/comments
export const addCommentToHero = createAsyncThunk(
    'heroes/addCommentToHero',
     async ({heroId, comment}) => {
  const response = await axios.post(`${BASE_URL}/heroes/${heroId}/comments`, {comment});
  return response.data;
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,

  extraReducers: (builder) => {

    // Handle fetchHeroes actions
    builder.addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroes = action.payload;
        state.error = null;
      })
      builder.addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    //   Handle addNewHero actions
        builder.addCase(addNewHero.pending, (state) => {
            state.status = 'loading';
          })
          builder.addCase(addNewHero.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.heroes.push(action.payload);
            state.error = null;
          })
          builder.addCase(addNewHero.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
  },
});

export default heroesSlice.reducer;