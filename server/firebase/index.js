// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDhhXfxG3e9MNXASh8xuiSkwRFECcVxLmY",
  authDomain: "charity-52896.firebaseapp.com",
  projectId: "charity-52896",
  storageBucket: "charity-52896.appspot.com",
  messagingSenderId: "1033722366948",
  appId: "1:1033722366948:web:f839de3a27c006b100d5f1",
  measurementId: "G-8VMMYYNZNJ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;