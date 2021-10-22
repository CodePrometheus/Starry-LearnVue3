import { defineComponent } from 'vue'
import { CommonWidgetDefine, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {

    const handleChange = (v: any) => {
      console.log('v', v)
      props.onChange(v)
    }

    const NumberWidgetRef = getWidget('NumberWidget')

    return () => {
      const NumberWidget = NumberWidgetRef.value as CommonWidgetDefine
      const { value, errorSchema, schema } = props
      return (
        <NumberWidget
          value={ value }
          onChange={ handleChange }
          errors={ errorSchema.__errors }
          schema={ schema }
        />
      )
    }
  }
})
