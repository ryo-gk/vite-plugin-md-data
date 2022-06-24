# vite-plugin-md-data

## Getting Started
Install

```shell
> npm install -D vite-plugin-md-data 
```

Add the below to `vite.config.js`.
You have to pass the options having `path` property which is used to specify the directory containing markdown files.

```js
import vue from '@vitejs/plugin-vue'
import ViteMdData from 'vite-plugin-md-data'

export default {
  plugins: [
    vue(),
    ViteMdData({ path: './dev/posts/' })
  ]
}
```

And you can import path, frontmatter, and content via `virtual:vite-plugin-md-data` like below.

```vue
<script setup>
import { data } from 'virtual:vite-plugin-md-data'

console.log(data)// [{ path: '...', frontmatter: { ... }, content: '' }, { ... }]
</script>
```

Also, this may be needed.

```ts
declare module 'virtual:vite-plugin-md-data' {
  export interface MdData {
    path: string
    content: string
    frontmatter: Record<string, any>
  }

  // If you pass the dataName options, you need to change the name to it.
  export const data: MdData[]
}
```
