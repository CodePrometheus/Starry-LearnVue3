import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { useContext } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    const context = useContext()
    return () => {
      const { schema, rootSchema, value, errorSchema, uiSchema } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      // 遍历
      return Object.keys(properties).map((k: string, idx: number) => {
        return (
          <SchemaItem
            schema={ properties[k] }
            rootSchema={ rootSchema }
            value={ currentValue[k] }
            key={ idx }
            onChange={ (v: any) => handleObjectFieldChange(k, v) }
            errorSchema={ errorSchema[k] || {} }
            uiSchema={ uiSchema.properties ? uiSchema.properties[k] || {} : {} }
          />
        )
      })
    }
  }
})
