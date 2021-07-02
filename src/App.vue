<template>
  <div id="nav">
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'EventCreate' }">Create Event</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>

  <router-view/>
  <div id="flash" v-if="flashMessage">{{ flashMessage }}</div>
</template>

<script>

export default {
  computed: {
    flashMessage () {
      return this.$store.state.flashMessage
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:32px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#flash {
  position: fixed;
  top: 16px;
  left: 16px;
  color:white;
  background-color:green;
  padding: 4px;
  border-radius: 8px;
  animation-name: fade;
  animation-duration: 5s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
