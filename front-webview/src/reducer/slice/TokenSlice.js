import { createSlice } from '@reduxjs/toolkit';

export const TokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        authenticated: false,
        accessToken: null,
    },
    reducers: {
        SET_TOKEN: (state, action) => {
            console.log(action.payload)
            state.authenticated = true;
            state.accessToken = action.payload;
        },
        DELETE_TOKEN: (state,action) =>{
            state.authenticated = false;
            state.accessToken = null;
        }
    }
})

export const { SET_TOKEN, DELETE_TOKEN } = TokenSlice.actions;

export default TokenSlice.reducer;