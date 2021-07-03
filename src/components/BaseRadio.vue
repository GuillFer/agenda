<template>
  <div class="radio-btn">
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
      v-bind="$attrs"
    >
    <label for="pets" v-if="label">{{ label }}</label>
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style scoped>
  .radio-btn {
    display:flex;
    justify-content:center;
  }
</style>
