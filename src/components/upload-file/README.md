## 使用方法

```jsx
import Upload from '@/components/upload/index'
<Upload
  accept=".jpg,.jpeg,.png,.gif,.bmp"
  ref={uploadRef}
  disabled={disabled}
  length={10}
  onGetList={onGetList}
/>
accept 默认为空或者不传则不限制文件类型
disabled 表示是否禁用
length 默认为 9 张图片
onGetList 每次上传完会把现在里面所有的图片返回给你
showName 是否显示文件名称 默认 false
```

## 回显

```jsx
const uploadRef: any = useRef()
格式为
[
  {
  url: string //文件类型
  name?: string //名字
  acceptType: string //文件类型
  }
]
```


