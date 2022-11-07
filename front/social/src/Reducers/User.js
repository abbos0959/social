import { createReducer } from "@reduxjs/toolkit";

const initialState = {
   isauth: false,
};

export const userReducer = createReducer(initialState, {
   LoginRequest: (state) => {
      state.loading = true;
   },
   LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isauth = true;
   },
   LoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isauth = false;
   },
   RegisterRequest: (state) => {
      state.loading = true;
   },
   RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isauth = true;
   },
   RegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isauth = false;
   },

   LoadUserRequest: (state) => {
      state.loading = true;
   },
   LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isauth = true;
   },
   LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isauth = false;
   },
});
