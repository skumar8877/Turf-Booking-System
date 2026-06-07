// import axios from "axios";

// const API = axios.create({
//     baseURL: "/api"
// });

// export default API;

import axios from "axios";

const API = axios.create({
    baseURL: "https://turf-booking-system-production.up.railway.app/api/availability"
});

export default API;