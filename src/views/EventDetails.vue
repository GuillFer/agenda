<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p v-if="event.extras.catering">Catering</p>
    <p v-if="event.extras.music">Music</p>
    <router-link :to="{name: 'EventEdit', params: {id: event.id}}">Edit this event</router-link>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data () {
    return {
      event: null
    }
  },
  created () {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      })
  }
}
</script>
