<template>
  <svg
    :width='size'
    :height='size'
    viewBox='0 0 48 48'
    fill='none'
  >
    <path
      d='M40 20C40 26.8077 35.7484 32.6224 29.7555 34.9336H24H18.2445C12.2516 32.6224 8 26.8077 8 20C8 11.1634 15.1634 4 24 4C32.8366 4 40 11.1634 40 20Z'
      :fill='colors[1]'
      :stroke='colors[0]'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M29.7555 34.9336L29.0764 43.083C29.0332 43.6013 28.5999 44 28.0798 44H19.9201C19.4 44 18.9668 43.6013 18.9236 43.083L18.2444 34.9336'
      :stroke='colors[0]'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M18 17V23L24 20L30 23V17'
      :stroke='colors[2]'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
</template>
<script>
export default {
  name: 'CSvgTips',
  props: {
    colors: Object,
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>
