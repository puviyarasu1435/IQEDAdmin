import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../API/User.Api";

// const initialState = {
//   auth: {
//     email: null,
//     password: null,
//   },
//   name: null,
//   profileImage: null,
//   userName: null,
//   age: null,
//   schoolName: null,
//   grade: null,
//   mobileNumber: null,
//   earnings: {
//     streak: {
//       count: null,
//       lastUpdate: null,
//       iqGems: null,
//       rank: null,
//       xp: null,
//     },
//     careerPathProgress: {
//       sections: [],
//     },
//     CompletedTopic: [],
//     AchivedQuest: [],
//   },
// };
const initialState = {
  UserCount: 0,
  WeekRegisterCount: null,
  WeekLogin: null,
  UserList: [],
};

const UserSlice = createSlice({
  name: "UserState",
  initialState,
  reducers: {
    UpdateUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    ResetUser: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(UserApi.endpoints.GetUser.matchFulfilled, (state, action) => {
      console.log(action.payload);
      Object.assign(state, action.payload);
    });
    builder.addMatcher(UserApi.endpoints.GetUser.matchPending, (state, action) => {
      console.log("Loading...");
    });
  },
});

export const { UpdateUser, ResetUser } = UserSlice.actions;
export default UserSlice;
