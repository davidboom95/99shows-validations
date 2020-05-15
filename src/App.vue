<template lang="pug">
.container.mx-auto.w-full(style="max-width: 800px;")
  .video-wrapper.w-full.relative
    video#videoBG(
      ref="video"
      playsinline
      autoplay
      loop 
      muted)
        source(src="video.webm" type="video/webm")
        source(src="video.webp" type="video/webp")
        img(src="video.mp4" type="video/mp4")
    .video-overlay.absolute.inset-0.pointer-events-none
  form#lead-form.mx-auto.w-64.z-20(autocomplete="on" @submit.prevent style="max-width:700px;")
    img.mx-auto.w-32.z-50.rounded-full.shadow-lg(src="logo.svg")
    h1.z-50.text-3xl.font-bold compra y vende
    h2.text-xl.oswald.z-50
      p PRODUCCIONES
      p LETRAS
      p BEATS
      p MASTERS
    div(style="display:grid; gap:1rem;" v-if="!registered")
      input.h-full.w-full.p-4.bg-gray-200(v-model="email" required="true" type="email" placeholder="Email")
      input.h-full.w-full.p-4.bg-gray-200(v-model="name" required="true" type="nombre" placeholder="Nombre")
      select.h-full.w-full.p-4.bg-gray-200.text-black(v-model="role")
        option(:value="null" disabled) Selecciona
        option(value="compositor") Compositor
        option(value="productor") Productor
        option(value="interprete") Interprete
    .z-50.bg-green-500.text-green-100.font-bold.text-xl(v-else) Registrado
    .bg-red-600.font-bold.text-white.rounded-full.p-2.text-center(v-if="error") {{error}}
    button.text-white.z-50(v-if="!registered" @click="submit" type="submit") Pre-registro
  .spotlights.fixed.inset-0s
  .h-32
</template>
<script>
import { firebaseInstance as firebase } from "./main.js";
export default {
  name: "App",
  data: () => ({
    user: {},
    email: "",
    name: "",
    phone: "",
    role: null,
    error: "",
    registered: false,
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      firebase
        .firestore()
        .collection("leads")
        .add({
          email: this.email,
          name: this.name,
          role: this.role
        })
        .then(() => this.registered = true)
        .catch(console.log);
    }
  },
};
</script>
<style scoped>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #000000;
}
.oswald {
  font-family: "Oswald", Helvetica, Arial, sans-serif;
}
input,
button {
  padding: 0.5rem;
  outline: none;
}
#lead-form {
  color: #B00AEA;
  display: grid;
  grid-gap: 1.5rem;
  margin-top: -15vw;
  z-index: 99999 !important;
}
#videoBG {
  z-index: -1;
}
input, select {
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 200px rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 0;
}
video,
picture {
  /* override other styles to make responsive */
  width: 100% !important;
  height: auto !important;
}
button {
  background: linear-gradient(#B00AEA, black 150%);
  text-shadow: 0 1px 2px black;
}
.video-overlay {
  background: radial-gradient(ellipse, transparent, white 70%),
    linear-gradient(white 10%, transparent 20%, transparent 70%, white 80%);
}
.spotlights {
  pointer-events: none;
  background: linear-gradient(
      to left bottom,
      transparent 500px,
      rgb(255, 0, 0, 0.3)
    ),
    linear-gradient(to right bottom, transparent 500px, rgb(0, 0, 255, 0.3));
}
</style>