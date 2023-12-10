import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurant: {
    imgUrl: null,
    id: null,
    rating: null,
    title: null,
    genre: null,
    long: null,
    lat: null,
    dishes: null,
    shorDescription: null,
    address: null,
  },
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
