import { computed, defineComponent } from 'vue'
import { FieldPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField'
// import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField'
import { retrieveSchema } from './utils'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

export default defineComponent({
  props: FieldPropsDefine,

  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return retrieveSchema(schema, rootSchema, value)
    })

    return () => {

      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value
      const type = schema.type
      let Component: any

      // 策略中转
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        case SchemaTypes.ARRAY:
          Component = ArrayField
          break
        default:
          console.warn(`${ type } is not supported`)
      }

      return <Component
        { ...props }
        schema={ retrievedSchema }
      />
    }
  }
})
