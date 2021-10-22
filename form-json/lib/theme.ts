import { computed, ComputedRef, defineComponent, ExtractPropTypes, inject, PropType, provide, ref } from 'vue'
import { useContext } from './context'
import { FieldPropsDefine, Theme } from './types'
import { isObject } from './utils'

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)
    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  }
})

export function getWidget(
  name: keyof Theme['widgets'],
  props?: ExtractPropTypes<typeof FieldPropsDefine>
) {
  const formContext = useContext()
  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return ref(uiSchema.widget)
    }
    if (schema.format) {
      if (formContext.formatMapRef.value[schema.format]) {
        return ref(formContext.formatMapRef.value[schema.format])
      }
    }
  }
  const context = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)

  if (!context) throw Error('vjsf theme required')

  return computed(() => context.value.widgets[name])
}

export default ThemeProvider
