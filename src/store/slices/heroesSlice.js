import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../BaseUrl';

// Initial state
const initialState = {
  heroes: [],
  status: 'idle',
  error: null,
  nominationData: {
    step1: {},
    step2: {},
    step3: {}
  }
};

// Async thunks
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const response = await axios.get(`${BASE_URL}/heroes`);
  return response.data;
});

export const addNewHero = createAsyncThunk(
  'heroes/addNewHero',
  async (heroData, { rejectWithValue, getState }) => {
    try {
      // Get authentication token from state (adjust based on your auth setup)
      const token = getState().auth?.token; // Adjust this path based on your auth state structure
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(`${BASE_URL}/heroes`, heroData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Submission failed');
    }
  }
);

export const deleteHero = createAsyncThunk(
  'heroes/deleteHero',
  async (heroId) => {
    await axios.delete(`${BASE_URL}/heroes/${heroId}`);
    return heroId;
  }
);

export const fetchHeroById = createAsyncThunk(
  'heroes/fetchHeroById',
  async (heroId) => {
    const response = await axios.get(`${BASE_URL}/heroes/${heroId}`);
    return response.data;
  }
);

// New nomination submission thunk that uses addNewHero
export const submitNomination = createAsyncThunk(
  'heroes/submitNomination',
  async (nominationData, { rejectWithValue, dispatch }) => {
    try {
      // Transform form data to match API requirements
      const apiData = {
        full_name: nominationData.heroName,
        story: nominationData.fullStory,
        location: nominationData.location,
        tags: nominationData.impactTags || [],
        photo_url: nominationData.photoUrl || '' // Handle photo URL appropriately
      };

      const result = await dispatch(addNewHero(apiData)).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    saveStep1Data: (state, action) => {
      state.nominationData.step1 = action.payload;
    },
    saveStep2Data: (state, action) => {
      state.nominationData.step2 = action.payload;
    },
    saveStep3Data: (state, action) => {
      state.nominationData.step3 = action.payload;
    },
    clearNominationData: (state) => {
      state.nominationData = { step1: {}, step2: {}, step3: {} };
    },
    resetSubmissionStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Existing cases
      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
      })
      // Nomination submission cases
      .addCase(submitNomination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitNomination.fulfilled, (state) => {
        state.status = 'succeeded';
        state.nominationData = { step1: {}, step2: {}, step3: {} };
      })
      .addCase(submitNomination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  saveStep1Data, 
  saveStep2Data, 
  saveStep3Data, 
  clearNominationData,
  resetSubmissionStatus
} = heroesSlice.actions;

export default heroesSlice.reducer;