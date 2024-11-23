// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// // import { apiSlice } from "../services/apiSlices";
// // import { productSlice } from "../services/productSlice";
// import userSliceReducer, { loginSuccess, logout } from "../services/userSlice";

// // let allMiddlewares = [apiSlice, productSlice]; //It is custom slice which can be used in the middleware

// export const store = configureStore({
//   reducer: {
//     // [apiSlice.reducerPath]: apiSlice.reducer,
//     // [productSlice.reducerPath]: productSlice.reducer,
//     user: userSliceReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       allMiddlewares.map((item) => item.middleware),
//     ), //   map.middleware.map(item => item.midleware)
//   // getDefaultMiddleware().concat(apiSlice.middleware),
// });

// setupListeners(store.dispatch);


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../services/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Add userSlice to the store
  },
});