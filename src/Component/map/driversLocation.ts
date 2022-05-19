import axios from "axios";
import { GOOGLE_API_KEY } from "../const/api";

export let driversLocations:any =  [
  
]

//console.log(driversLocations);

const proxy = "https://mighty-island-92084.herokuapp.com/"
const  config:object = {
  method: 'get',
  url: ` ${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=6.5224%2C3.3792&radius=3000&type=colleges&keyword=cruise&key=${GOOGLE_API_KEY}`,
  headers: { }
};

axios(config)
.then(res => {
  console.log(res.data);
  for (let i = 0; i < res.data.results.length; i++) {
    driversLocations.push({
      lat: res.data.results[i].geometry.location.lat,
      lng: res.data.results[i].geometry.location.lng
    })
  }
  console.log(driversLocations);
})
.catch(function (error) {
  console.log(error);
});





  
export const locationOptions = {
  imagePath: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45166/black-circle-emoji-clipart-xl.png'
}

export const createKey =(location) => {
  return `${location.lat} + ${location.lng}`
}



// { lat: 6.513691, lng: 3.394079 },
  // { lat: 6.530064, lng:  3.365586},
  // {lat: 6.506186, lng: 3.395796},
  // {lat: 6.527076, lng: 3.381704},
  // {lat: 6.517443, lng: 3.348079 },
  // {lat: 6.553940, lng: 3.368676 },