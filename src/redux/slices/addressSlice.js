import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";


const initialState = {
  addresses: [],

};

export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (userId,thunkAPI) => {
    if(userId){
      onSnapshot(doc(db, "users",userId), (doc) => {
        const address = doc.data().address
        console.log(doc.data());
        thunkAPI.dispatch(addressActions.setInitialState({address}));
      });

    }else{
      const address = []
      console.log("not user");
      thunkAPI.dispatch(addressActions.setInitialState({address}));

    }

  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
        state.addresses = action.payload
        console.log(action.payload);
    }
  },
});

export const addressActions = addressSlice.actions;

export const addressReducer = addressSlice.reducer;
export const addressSelector = (state) => state.addressReducer;
