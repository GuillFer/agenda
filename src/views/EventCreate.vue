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
  methods: {
    sendForm () {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user
      }
      console.log(this.event)
      EventService.postEvent(event)
        .then(() => {
          this.$store.commit('ADD_EVENT', event)
          this.postSuccess()
          this.$refs.eventForm.reset()
        })
        .catch((error) => {
          console.log(error)
        })
      // this.$router.push({
      //   name: 'EventList'
      // })
    },
    postSuccess () {
      this.$store.commit('FLASH', 'Created !')
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

  form >>> .field {
    width:100%;
  }

  form >>> .field {
    margin:8px auto 16px;
  }

</style>
