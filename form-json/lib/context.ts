import { CommonFieldType, CommonWidgetDefine, Schema } from './types'
import { inject, Ref } from 'vue'

// 保证Key唯一
export const SchemaFormContextKey = Symbol()

// 在需要使用父级数据的子辈组件或者孙辈等下级组件中注入数据
// 不论子组件有多深，只要调用了inject那么就可以注入provider中的数据
// 而不是局限于只能从当前父组件的prop属性来获取数据
export function useContext() {
  const context:
    | {
    SchemaItem: CommonFieldType
    formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
    transformSchemaRef: Ref<(schema: Schema) => Schema>
  }
    | undefined = inject(SchemaFormContextKey)

  if (!context) {
    throw Error('SchemaForm needed')
  }

  return context
}
