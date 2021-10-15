<script lang='ts' setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li class='dropdown-option' :class="{ 'is-disabled': disabled }">
    <slot />
  </li>
</template>

<style scoped>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
