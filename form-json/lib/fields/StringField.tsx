import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {

    const handleChange = (v: any) => {
      props.onChange(v)
    }


    return () => <div>String Field</div>

  }
})
