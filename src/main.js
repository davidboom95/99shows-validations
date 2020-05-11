import * as firebase from "firebase/app"
import Vue from "vue"
import App from "./App.vue"
import "tailwindcss/dist/tailwind.css"
// Firebase App (the core Firebase SDK) is always required and must be listed first

// Add the Firebase products that you want to use
import "firebase/firestore"

export const firebaseInstance = firebase.initializeApp({
  apiKey: "AIzaSyBKhIAYfzfyvcM9_FULL_qCHVTBWqg_TDs",
  authDomain: "shows-validation.firebaseapp.com",
  databaseURL: "https://shows-validation.firebaseio.com",
  projectId: "shows-validation",
  storageBucket: "shows-validation.appspot.com",
  messagingSenderId: "646071480897",
  appId: "1:646071480897:web:c539bd1afc033e2b47ccc0"
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
