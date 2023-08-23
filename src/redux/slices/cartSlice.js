import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";


const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  user: {},
};

export const fetchUserData = createAsyncThunk(
  "cart/fetchUserData",
  async (userId,thunkAPI) => {

    if(userId){
      onSnapshot(doc(db, "users",userId), (doc) => {
        const items = doc.data().cartItems
        thunkAPI.dispatch(cartActions.setInitialState({items}));
      });

    }else{
      const items = []
      thunkAPI.dispatch(cartActions.setInitialState({items}));

    }

  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.cartItems = action.payload.items;
      state.totalQuantity = state.cartItems.reduce((total,item)=>total + Number(item.quantity),0)
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== existingItem.id
        );
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
