<template>
  <h1>Not Found</h1>
  <h3>This {{ resource }} doesn't exist</h3>
  <router-link :to="{ name: 'EventList' }">Back to events list</router-link>
</template>

<script>

export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>
