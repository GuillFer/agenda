<template>
  <h1>Events</h1>
  <div class="events">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <router-link
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >Prev</router-link>
    <router-link
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
    >Next</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: ['page'],
  data () {
    return {
      events: null,
      totalEvents: 0
    }
  },
  created () {
    watchEffect(() => {
      EventService.getEvents(this.$store.state.eventsPerPage, this.page)
        .then(response => {
          this.events = response.data
          this.$store.state.events = response.data
          console.log(response.headers)
          this.totalEvents = response.headers['x-total-count']
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage () {
      const totalPages = Math.ceil(this.totalEvents / this.$store.state.eventsPerPage)
      return this.page < totalPages
    }
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
