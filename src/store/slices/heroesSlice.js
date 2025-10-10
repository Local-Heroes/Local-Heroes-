import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../BaseUrl';

// Initial state
const initialState = {
  heroes: [],
  status: 'idle',
  error: null,
  filteredHeroes: [],
  currentHero: null, // ADD THIS LINE
  nominationData: {
    step1: {},
    step2: {},
    step3: {}
  },
  filters: {
    search: '',
    tags: [],
    location: '',
    impactArea: ''
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0
  }
};

// Async thunks
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const response = await axios.get(`${BASE_URL}/heroes`);
  return response.data;
});

export const addNewHero = createAsyncThunk(
  'heroes/addNewHero',
  async (heroData, { rejectWithValue, }) => {
    try {
    const token = localStorage.getItem('token') ;
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
  async (heroId, { rejectWithValue,  }) => {
    try {
 const token = localStorage.getItem('token') ;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.delete(`${BASE_URL}/heroes/${heroId}`, config);
      return heroId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Delete failed');
    }
  }
);

export const fetchHeroById = createAsyncThunk(
  'heroes/fetchHeroById',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/heroes/${heroId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Fetch hero failed');
    }
  }
);

// New nomination submission thunk that uses addNewHero
export const submitNomination = createAsyncThunk(
  'heroes/submitNomination',
  async (nominationData, { rejectWithValue, dispatch }) => {
    try {
      const apiData = {
        full_name: nominationData.heroName,
        story: nominationData.fullStory,
        location: nominationData.location,
        tags: nominationData.impactTags || [],
        photo_url: nominationData.photoUrl || ''
      };

      const result = await dispatch(addNewHero(apiData)).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thank a hero
export const thankHero = createAsyncThunk(
  'heroes/thankHero',
  async (heroId, { rejectWithValue, }) => {
    try {
const token = localStorage.getItem('token') ;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.post(`${BASE_URL}/heroes/${heroId}/thank`, {}, config);
      return { heroId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Thank failed');
    }
  }
);

// Add comment to hero
export const addComment = createAsyncThunk(
  'heroes/addComment',
  async ({ heroId, text }, { rejectWithValue, }) => {
    try {
     const token = localStorage.getItem('token') ;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        `${BASE_URL}/heroes/${heroId}/comments`,
        { text },
        config
      );
      return { heroId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Comment failed');
    }
  }
);

// Delete comment
export const deleteComment = createAsyncThunk(
  'heroes/deleteComment',
  async ({ heroId, commentId }, { rejectWithValue, }) => {
    try {
      const token = localStorage.getItem('token') ;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.delete(`${BASE_URL}/heroes/${heroId}/comments/${commentId}`, config);
      return { heroId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Delete comment failed');
    }
  }
);

// Get Hero Comments
export const fetchHeroComments = createAsyncThunk(
  'heroes/fetchHeroComments',
  async (heroId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/heroes/${heroId}/comments`);
      return { heroId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Fetch comments failed');
    }
  }
);

// Slice
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
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        tags: [],
        location: '',
        impactArea: ''
      };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    filterHeroes: (state) => {
      const { search, tags, location, impactArea } = state.filters;
      
      let filtered = state.heroes;

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(hero => 
          hero.full_name.toLowerCase().includes(searchLower) ||
          hero.story.toLowerCase().includes(searchLower) ||
          hero.location.toLowerCase().includes(searchLower) ||
          hero.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      if (tags.length > 0) {
        filtered = filtered.filter(hero =>
          tags.every(tag => hero.tags.includes(tag))
        );
      }

      if (location) {
        filtered = filtered.filter(hero =>
          hero.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (impactArea) {
        filtered = filtered.filter(hero =>
          hero.tags.includes(impactArea)
        );
      }

      state.filteredHeroes = filtered;
      state.pagination.totalItems = filtered.length;
    },
    clearCurrentHero: (state) => {
      state.currentHero = null; // ADD THIS REDUCER
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch heroes
      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroes = action.payload;
        state.filteredHeroes = action.payload;
        state.pagination.totalItems = action.payload.length;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Add new hero
      .addCase(addNewHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
        state.filteredHeroes.push(action.payload);
        state.pagination.totalItems += 1;
      })
      
      // Delete hero
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
        state.filteredHeroes = state.filteredHeroes.filter(hero => hero.id !== action.payload);
        state.pagination.totalItems -= 1;
      })
      
      // Fetch hero by ID - ADD THIS CASE
      .addCase(fetchHeroById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentHero = action.payload;
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currentHero = null;
      })
      
      // Nomination submission
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
      })
      
      // Thank hero
      .addCase(thankHero.fulfilled, (state, action) => {
        const { heroId } = action.payload;
        console.log("Thanked hero ID:", heroId);
        console.log("Current Hero before update:", state.currentHero);
        
        // Update current hero if it's the one being thanked
        if (state.currentHero && state.currentHero._id === heroId) {
          state.currentHero.thanks_count = (state.currentHero.thanks_count || 0) + 1;
          state.currentHero.user_has_thanked = true;
        }
        
        // Update hero in heroes list
        const existingHero = state.heroes.find(hero => hero._id === heroId);
        if (existingHero) {
          existingHero.thanks_count = (existingHero.thanks_count || 0) + 1;
          existingHero.user_has_thanked = true;
        }
        
        // Update hero in filtered list
        const filteredHero = state.filteredHeroes.find(hero => hero._id === heroId);
        if (filteredHero) {
          filteredHero.thanks_count = (filteredHero.thanks_count || 0) + 1;
          filteredHero.user_has_thanked = true;
        }
      })
      
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { heroId, comment } = action.payload;
        
        // Update current hero
        if (state.currentHero && state.currentHero._id === heroId) {
          if (!state.currentHero.comments) {
            state.currentHero.comments = [];
          }
          state.currentHero.comments.push(comment);
        }
        
        // Update hero in heroes list
        const existingHero = state.heroes.find(hero => hero._id === heroId);
        if (existingHero) {
          if (!existingHero.comments) {
            existingHero.comments = [];
          }
          existingHero.comments.push(comment);
        }
        
        // Update hero in filtered list
        const filteredHero = state.filteredHeroes.find(hero => hero._id === heroId);
        if (filteredHero) {
          if (!filteredHero.comments) {
            filteredHero.comments = [];
          }
          filteredHero.comments.push(comment);
        }
      })
      
      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { heroId, commentId } = action.payload;
        
        // Update current hero
        if (state.currentHero && state.currentHero._id === heroId && state.currentHero.comments) {
          state.currentHero.comments = state.currentHero.comments.filter(c => c.id !== commentId);
        }
        
        // Update hero in heroes list
        const existingHero = state.heroes.find(hero => hero._id === heroId);
        if (existingHero && existingHero.comments) {
          existingHero.comments = existingHero.comments.filter(c => c.id !== commentId);
        }
        
        // Update hero in filtered list
        const filteredHero = state.filteredHeroes.find(hero => hero._id === heroId);
        if (filteredHero && filteredHero.comments) {
          filteredHero.comments = filteredHero.comments.filter(c => c.id !== commentId);
        }
      })
      
      // Fetch hero comments
      .addCase(fetchHeroComments.fulfilled, (state, action) => {
        const { heroId, comments } = action.payload;
        
        // Update current hero
        if (state.currentHero && state.currentHero._id === heroId) {
          state.currentHero.comments = comments;
        }
        
        // Update hero in heroes list
        const existingHero = state.heroes.find(hero => hero._id === heroId);
        if (existingHero) {
          existingHero.comments = comments;
        }
        
        // Update hero in filtered list
        const filteredHero = state.filteredHeroes.find(hero => hero._id === heroId);
        if (filteredHero) {
          filteredHero.comments = comments;
        }
      });
  }
});

export const { 
  saveStep1Data, 
  saveStep2Data, 
  saveStep3Data, 
  clearNominationData,
  resetSubmissionStatus,
  setFilters, 
  clearFilters, 
  setCurrentPage, 
  filterHeroes,
  clearCurrentHero // EXPORT THIS ACTION
} = heroesSlice.actions;

export default heroesSlice.reducer;