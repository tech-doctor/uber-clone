 import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 import {GOOGLE_API_KEY} from '../Component/const/api';

 interface address {
  plus_code: object,
  results: object[],
  status: any,
}

interface cordinates {
  lat: number,
  lng: number,
}


export const currentAddress = createApi({
  reducerPath: 'geocode',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://maps.googleapis.com/maps/api/`,
  }),
  endpoints: (builder) => ({
    getAddress: builder.query<address, cordinates>({
    query: ({lat,lng}) =>  `geocode/json?latlng=${lat}, ${lng}&result_type=street_address&key=${GOOGLE_API_KEY}`,
    })
  })
})

export const { useGetAddressQuery } = currentAddress;