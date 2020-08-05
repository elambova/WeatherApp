const api = "http://192.168.1.105:5050/";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getInfo = (city) =>
  fetch(`${api}getInfo?city=${city}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const loadData = () =>
  fetch(`${api}loadData`, { headers })
    .then((res) => res.json())
    .then((data) => data);
