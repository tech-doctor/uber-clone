import axios from "axios";
import { GOOGLE_API_KEY } from "../const/api";
import { store } from "../../Store";

export let driversLocations:any =  []

const currentAddress = store.getState().root.mapInitialPosition;
const { lat, lng } = currentAddress;

const proxy = "https://mighty-island-92084.herokuapp.com/"
const  config:object = {
  method: 'get',
  url: ` ${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=3000&type=restaurants&keyword=hospital&key=${GOOGLE_API_KEY}`,
  headers: { }
};

axios(config)
.then(res => {
  for (let i = 0; i < res.data.results.length; i++) {
    driversLocations.push({
      lat: res.data.results[i].geometry.location.lat,
      lng: res.data.results[i].geometry.location.lng
    })
  }
  //console.log(driversLocations);
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
