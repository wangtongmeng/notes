### DialogOptions

调用 `showDialog` 等方法时，支持传入以下选项：

| 参数              | 说明                     | 类型     | 默认值 |
| ----------------- | ------------------------ | -------- | ------ |
| title             | 标题                     | string   | -      |
| content           | 正文                     | string   | -      |
| showFooter        | 是否隐藏底部按钮栏       | boolean  | true   |
| showCancelButton  | 是否隐藏确定按钮         | boolean  | true   |
| showConfirmButton | 是否隐藏取消按钮         | boolean  | true   |
| confirmButtonText | 确定按钮文案             | string   | “确定” |
| cancelButtonText  | 取消按钮文案             | string   | “取消” |
| showCloseIcon     | 是否显示关闭图标(右上角) | boolean  | false  |
| overlay           | 是否显示遮罩层           | boolean  | true   |
| closeOnClickModal | 是否点击蒙层关闭         |          |        |
| onConfirm         | 确定按钮回调             | Function | -      |
| onCancel          | 取消按钮回调             | Function | -      |
| onClose           | 弹窗关闭回调             | Function | -      |

### Props

通过组件调用 `Dialog` 时，支持以下 Props：

| 参数              | 说明                     | 类型     | 默认值 |
| ----------------- | ------------------------ | -------- | ------ |
| v-model:visible   | 是否显示弹窗             | boolean  | -      |
| title             | 标题                     | string   | -      |
| content           | 正文                     | string   | -      |
| showFooter        | 是否隐藏底部按钮栏       | boolean  | true   |
| showCancelButton  | 是否隐藏确定按钮         | boolean  | true   |
| showConfirmButton | 是否隐藏取消按钮         | boolean  | true   |
| confirmButtonText | 确定按钮文案             | string   | “确定” |
| cancelButtonText  | 取消按钮文案             | string   | “取消” |
| showCloseIcon     | 是否显示关闭图标(右上角) | boolean  | false  |
| overlay           | 是否显示遮罩层           | boolean  | false  |
| closeOnClickModal | 是否点击蒙层关闭         |          |        |
| onConfirm         | 确定按钮回调             | Function | -      |
| onCancel          | 取消按钮回调             | Function | -      |
| onClose           | 弹窗关闭回调             | Function | -      |

### Events

通过组件调用 `Dialog` 时，支持以下事件：

| 参数    | 说明               | 回掉参数 |
| ------- | ------------------ | -------- |
| confirm | 点击确认按钮时触发 | -        |
| cancel  | 点击取消按钮时触发 | -        |
| close   | 关闭弹窗时触发     | -        |

### Slots

通过组件调用 `Dialog` 时，支持以下插槽：

| 参数    | 说明               | 回掉参数 |
| ------- | ------------------ | -------- |
| default | 自定义正文         | -        |
| title   | 自定义标题         | -        |
| footer  | 自定义底部按钮区域 | -        |