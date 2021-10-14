import { defineComponent, inject } from 'vue'
import { FieldPropsDefine } from '../types'
import { SchemaFormContextKey } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      console.log('typeof v : ', typeof v)
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    const context: any = inject(SchemaFormContextKey)

    return () => {
      const { schema, rootSchema, value } = props
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
          />
        )
      })
    }
  }
})
