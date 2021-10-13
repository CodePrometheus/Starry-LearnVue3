import { createUseStyles } from 'vue-jss'
import { defineComponent, onBeforeMount, onMounted, PropType, ref, shallowRef, watch } from 'vue'
import * as Monaco from 'monaco-editor'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5
  },
  title: {
    backgroundColor: '#eee',
    padding: '10px 0',
    paddingLeft: 20
  },
  code: {
    flexGrow: 1
  }
})

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true
    },
    onChange: {
      type: Function as PropType<(value: string, event: Monaco.editor.IModelContentChangedEvent) => void>,
      required: true
    },
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: function(props) {
    const editorRef = shallowRef()
    const containerRef = ref()
    let _subscription: Monaco.IDisposable | undefined
    let __preventTriggerChangeEvent = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false
          }
        }
      ))

      // 实时的返回
      _subscription = editor.onDidChangeModelContent((event) => {
        // console.log('---------->', __preventTriggerChangeEvent)
        if (!__preventTriggerChangeEvent) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeMount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __preventTriggerChangeEvent = true
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v
              }
            ]
          )
          editor.pushUndoStop()
          __preventTriggerChangeEvent = false
        }
      }
    )

    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      return (
        <div class={ classes.container }>
          <div class={ classes.title }>
            <span>{ props.title }</span>
          </div>
          <div class={ classes.code } ref={ containerRef } />
        </div>
      )
    }
  }
})
