import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Props {
  errorMessage: string;
  mapInitialPosition: {
    lat: number;
    lng: number;
  },
  pickup: {
    value: string;
    disabled: boolean;
    coordinates: {
      lat: number;
      lng: number;
    }
  },
  destination:{
    value: string;
    disabled: boolean;
    coordinates: {
      lat: number;
      lng: number;
    }
  }
}

const initialState:Props = {
   errorMessage: "Route not found. Select an alternative  location route and try again...",
    mapInitialPosition: {
      lat: 6.5224,
      lng: 3.3792
    },
    pickup: {
      value: '',
      disabled: false,
      coordinates: {
        lat: 0,
        lng: 0
      }
      
    },
    destination: {
      value: '',
      disabled: false,
      coordinates: {
        lat: 0,
        lng: 0
      }
    }

    
}

export const slice = createSlice ({
    name: 'slice',
    initialState,
    reducers: {
      updateErrorMessage: (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
      },
      updateInitialPosition: (state, action:  PayloadAction<{lat: number, lng: number}>) => {
        state.mapInitialPosition = action.payload;
      },
      updatePickup: (state, action: PayloadAction<string>) => {
        state.pickup.value = action.payload;
      }, 
      updateDestination: (state, action: PayloadAction<string>) => {
        state.destination.value = action.payload;
      },
      updatePickupDisable: (state, action: PayloadAction<boolean>) => { 
        state.pickup.disabled = action.payload;
      },
      updateDestinationDisable: (state, action: PayloadAction<boolean>) => {
        state.destination.disabled = action.payload;
      },
      updatePickupCoordinates: (state, action: PayloadAction<{lat: number, lng: number}>) => {
        state.pickup.coordinates = action.payload;
      },
      updateDestinationCoordinates: (state, action: PayloadAction<{lat: number, lng: number}>) => {
        state.destination.coordinates = action.payload;
      }
    }
})


export const {updateErrorMessage, updateInitialPosition, updatePickup, updateDestination, updatePickupDisable, updateDestinationDisable, updatePickupCoordinates, updateDestinationCoordinates} = slice.actions;

export default slice.reducer;