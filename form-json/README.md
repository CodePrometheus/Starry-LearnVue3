# Starry-JsonForm

### schema

json schema 对象，定义数据，也是定义表单的依据

### value

表单的数据结果，在表单编辑从外部改变该 `value` 时，会通过 `onChange` 透出 `value`

### onChange

在表单有任何变化时会触发该回调方法，并把新值返回

### locale

`ajv-i18n`

### contextRef

传入一个vue3的 `Ref` 对象，挂载 `doValidate` 方法，主动让表单进行校验

### uiSchema

对表单的展现进行一系列的定制
