import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface initialState {
    mapInitialPosition: {
      lat: number;
      lng: number;
    },
    pickup: {
      value: string;
      disabled: boolean;
    },
    destination:{
      value: string;
      disabled: boolean;
    }
}

const initialState:initialState = {
    mapInitialPosition: {
      lat: 6.5224,
      lng: 3.3792
    },
    pickup: {
      value: '',
      disabled: false,
      
    },
    destination: {
      value: '',
      disabled: false,
    }

    
}

export const slice = createSlice ({
    name: 'slice',
    initialState,
    reducers: {
      // updateInitialPosition: (state, action:  PayloadAction<{lat: number, lng: number}>) => {
      //   state.mapInitialPosition = action.payload;
      // },
      updatePickup: (state, action: PayloadAction<string>) => {
        state.pickup.value = action.payload;
      }, updateDestination: (state, action: PayloadAction<string>) => {
        state.destination.value = action.payload;
      },
      updatePickupDisable: (state, action: PayloadAction<boolean>) => { 
        state.pickup.disabled = action.payload;
      },
      updateDestinationDisable: (state, action: PayloadAction<boolean>) => {
        state.destination.disabled = action.payload;
      }
    }
})


export const { updatePickup, updateDestination, updatePickupDisable, updateDestinationDisable} = slice.actions;

export default slice.reducer;