import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine } from '../../lib'
import { withFormItem } from '../../lib/theme-default/FormItem'

export const PasswordWidget = withFormItem(
  defineComponent({
    props: CommonWidgetPropsDefine,
    setup(props) {
      const handleChange = (e: any) => {
        const v = e.target.value
        e.target.value = props.value
        props.onChange(v)
      }

      return () => {
        const { value } = props
        return (
          <input
            type='password'
            value={ value as any } onInput={ handleChange } />
        )
      }
    }
  })
)
