<template>
  <div class="form-group field">
    <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label v-if="label">{{ label }} {{modelValue}}</label>
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
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .form-group {
    display:flex;
    justify-content:center;
  }

  input {
    width:max-content;
    display:flex;
    align-items:center;
  }

  label {
    text-align:left;
    padding-left:8px;
    display:flex;
    align-items:center;
  }
</style>
