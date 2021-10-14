<template>
  <input type='text' :value='value' @input='handleChange' />
</template>

<script lang='ts' setup='props'>
import { Schema } from '../types'

const props = defineProps<{
  value: any
  onChange: (v: string) => void
  schema: Schema
}>()

const handleChange = (v: any) => {
  console.log(v)
  props.onChange(v.target.value)
}
</script>
