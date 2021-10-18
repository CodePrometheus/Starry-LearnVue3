<script lang='ts' setup>
import useDomCreate from '@/hooks/UseDomCreate'

const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['modal-on-close', 'modal-on-confirm'])

useDomCreate('modal')
const onClose = () => {
  emits('modal-on-close')
}
const onConfirm = () => {
  emits('modal-on-confirm')
}
</script>

<template>
  <teleport to='#modal'>
    <div class='modal d-block' tabindex='-1' v-if='visible'>
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title'>{{ title }}</h5>
            <button type='button' class='btn-close' data-bs-dismiss='modal'
                    aria-label='Close'></button>
          </div>
          <div class='modal-body'>
            <slot />
          </div>
          <div class='modal-footer'>
            <button
              type='button'
              class='btn btn-secondary'
              data-bs-dismiss='modal'
              @click='onClose'
            >
              Close
            </button>
            <button
              type='button'
              class='btn btn-primary'
              @click='onConfirm'
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
