import { computed, defineComponent } from 'vue'
import { CommonWidgetDefine, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {

    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const TextWidgetRef = computed(() => {
      return getWidget('TextWidget', props).value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine
      const { value, schema, errorSchema } = props

      return (
        <TextWidget
          value={ value }
          onChange={ handleChange }
          schema={ schema }
          errors={ errorSchema.__errors }
          options={ widgetOptionsRef.value }
        />
      )
    }

  }
})
