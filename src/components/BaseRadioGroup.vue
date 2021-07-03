<template>
  <div :class="{horizontal: !vertical}" class="radio-btns">
    <BaseRadio
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .radio-btns {
    margin:8px 0 32px;
    display:flex;
    justify-content:space-evenly;
    flex-direction:column;
  }

  .horizontal {
    flex-direction:row;
  }
</style>
