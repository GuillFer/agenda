<template>
<h1>Create an event</h1>

<div class="form-container">

  <form @submit.prevent="sendForm" ref="eventForm">

    <BaseSelect
      :options="categories"
      v-model="event.category"
      label="Select a category"
    />

    <h3>Name & describe your event</h3>

    <BaseInput
      v-model="event.title"
      label="Title"
      type="text"
    />

    <BaseInput
      v-model="event.description"
      label="Description"
      type="text"
    />

    <h3>Where is your event?</h3>

    <BaseInput
      v-model="event.location"
      label="Location"
      type="text"
    />

    <h3>When is your event?</h3>
    <BaseInput
      v-model="event.date"
      label="Date"
      type="text"
    />

    <BaseInput
      v-model="event.time"
      label="Time"
      type="text"
    />

    <h3>Extras</h3>
    <BaseCheckbox
      v-model="event.extras.catering"
      label="Catering"
    />

    <BaseCheckbox
      v-model="event.extras.music"
      label="Music"
    />

    <h3>Are pets allowed ?</h3>

    <BaseRadioGroup
      v-model="event.pets"
      name="pets"
      :options="petOptions"
    />

    <button type="submit">Submit</button>
  </form>
</div>

</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import EventService from '@/services/EventService.js'

export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
        extras: {
          catering: false,
          music: false
        },
        pets: 0
      },
      petOptions: [
        { label: 'Yes', value: 0 },
        { label: 'No', value: 1 }
      ]
    }
  },
  created () {
    if (this.editing) {
      EventService.getEvent(this.$route.params.id)
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
  },
  methods: {
    sendForm () {
      if (this.editing) {
        const event = this.event
        EventService.updateEvent(event)
          .then(() => {
            this.$store.commit('UPDATE_EVENT', event)
            this.postSuccess('Edited')
            this.$router.push({ name: 'EventDetails', params: { id: this.event.id } })
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const event = {
          ...this.event,
          id: uuidv4(),
          organizer: this.$store.state.user
        }
        EventService.postEvent(event)
          .then(() => {
            this.$store.commit('ADD_EVENT', event)
            this.postSuccess('Created')
            this.$refs.eventForm.reset()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    postSuccess (postType) {
      this.$store.commit('FLASH', `${postType} !`)
      setTimeout(() => {
        this.$store.commit('FLASH', null)
      }, 5000)
    }
  }
}
</script>

<style scoped>
  .form-container {
    max-width:50%;
    display:flex;
    justify-content:center;
    margin:auto;
  }

  .form-container form {
    display:flex;
    flex-direction:column;
    width:75%;
  }

  form:deep(.field) {
    width:100%;
  }

  form:deep(.field) {
    margin:8px auto 16px;
  }

</style>
