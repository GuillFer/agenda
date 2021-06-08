<template>
  <h1>Events</h1>
  <div class="events">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import axios from 'axios'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data () {
    return {
      events: null
    }
  },
  created () {
    axios.get('https://my-json-server.typicode.com/GuillFer/agenda/events')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .events {
    display:flex;
    flex-direction:column;
    align-items:center;
  }
</style>
