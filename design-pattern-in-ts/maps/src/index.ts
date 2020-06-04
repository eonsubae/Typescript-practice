// import { User, red } from './User';
// import red from './User';
// import defaultColor from './User';
// import { User } from './User';
// import { Company } from './Company';
import { google } from 'googlemaps';

// const user = new User();

// console.log(user);

// const company = new Company();

// console.log(company);

new google.maps.Map(document.getElementById('map'), {
  zoom: 1,
  center: {
    lat: 0,
    lng: 0,
  },
});
