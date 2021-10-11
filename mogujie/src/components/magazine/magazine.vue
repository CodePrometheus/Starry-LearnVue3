<template>
  <div :style="'position: relative; background: url('+image+') center; background-size: cover;'">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'CMagazine',
  props: {
    image: String,
    des: String
  }
}
</script>
