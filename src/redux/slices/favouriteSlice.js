import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: [],
  totalFavQuantity: 0,
};

const favSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.favItems.find(
        (item) => item.id === newItem.id
      );
      if(!existingItem){
       state.favItems.push(
          {
            id: newItem.id,
            productName: newItem.productName,
            imgUrl: newItem.image,
            price: newItem.price,
          }
        )
        state.totalFavQuantity++;
        
      }
      console.log(state.favItems);
     

    },

    removeFavItem: (state, action) => {
      const id = action.payload.id;
      const existingItem = state.favItems.find((item) => item.id === id);
      if (existingItem) {
        state.favItems = state.favItems.filter(
          (item) => item.id !== existingItem.id
        );
      }
      state.totalFavQuantity--;
    },
  },
});

export const favActions = favSlice.actions;

export const favReducer = favSlice.reducer;
export const favSelector = (state) => state.favReducer;
