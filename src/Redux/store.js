import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./Slice/UserSlice";
import { UserApi } from "./API/User.Api";

export const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(UserApi.middleware),
});

setupListeners(store.dispatch);
