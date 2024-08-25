// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  nickname: '',
  provider: '',
  snsid: '',
  pwd: '',
  phone: '',
  profileimg: '',
  profilemsg: '',
  followers: [],
  followerings: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { email, nickname, provider, phone, snsid, pwd , profileimg, profilemsg } = action.payload;
      state.email = email;
      state.nickname = nickname;
      state.provider = provider;
      state.snsid = snsid;
      state.pwd = pwd;
      state.phone=phone;
      state.profileimg = profileimg;
      state.profilemsg = profilemsg;
    },
    logoutAction: (state) => {
      state.email = '';
      state.nickname = '';
      state.provider = '';
      state.phone="";
      state.snsid = '';
      state.pwd = "";
      state.profileimg = '';
      state.profilemsg = '';
      state.followers = [];
      state.followerings = [];
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
