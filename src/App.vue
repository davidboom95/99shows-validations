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
    .video-overlay.absolute.inset-0
  form#lead-form.mx-auto.w-64(style="max-width:700px;")
    img.mx-auto.w-16.z-50(src="logo.svg")
    h1.text-white.z-50.text-3xl.font-bold compra y vende
    h2.text-xl.text-white.oswald.z-50
      p PRODUCCIONES
      p LETRAS
      p BEATS
      p MASTERS
    .z-50(v-if="!registered" style="padding: 1px; background: radial-gradient(ellipse at 45px 100%, gray 40%, black);")
      input.h-full.w-full.bg-black(v-model="email" type="email" placeholder="Email")
      input.h-full.w-full.bg-black(v-model="name" type="nombre" placeholder="Nombre")
      input.h-full.w-full.bg-black(v-model="phone" type="phone" placeholder="Teléfono")
    .z-50.bg-green-500.text-green-100.font-bold.text-xl(v-else) Registrado
    .bg-red-600.text-white.font-bold(v-if="error") {{error}}
    button.text-white.z-50(v-if="!registered" @click="submit" type="submit") Pre-registro
  .spotlights.fixed.inset-0
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
    error: "",
    registered: false,
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      const { email, name, phone } = this;
      if (!email || !name || !phone) {
        this.error = "Debes llenar los datos 👆";
        return;
      }
      firebase
        .firestore()
        .collection("leads")
        .add({
          email: this.email,
          name: this.name,
          phone: this.phone
        })
        .then(res => this.registered = true)
        .catch(console.log);
    }
  },
};
</script>
<style>
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
  display: grid;
  grid-gap: 1.5rem;
  margin-top: -15vw;
  z-index: 99999 !important;
}
#videoBG {
  z-index: -1;
}
input {
  background: rgb(255, 255, 255, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 200px rgba(255, 255, 255, 0.5);
  color: white;
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
  background: radial-gradient(transparent, black 70%),
    linear-gradient(black 10%, transparent 20%, transparent 70%, black 80%);
}
.spotlights {
  background: linear-gradient(
      to left bottom,
      transparent 500px,
      rgb(255, 0, 0, 0.3)
    ),
    linear-gradient(to right bottom, transparent 500px, rgb(0, 0, 255, 0.3));
}
</style>