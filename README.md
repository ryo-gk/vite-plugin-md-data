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
    ViteMdData({ 
      path: './dev/posts/',
      callback: (data) => data.filter(d => d.publised === true), // Callback to process for markdown data.
      asRaw: false, // Not parse the content to HTML if `true`.
      declaration: { // Generate d.ts file.
        outDir: './types/' // Path to which generate a declaration.
      }
    })
  ]
}
```

And you can import path, frontmatter, and content via `virtual:vite-plugin-md-data` like below.

```vue
<script setup>
import { data } from 'virtual:vite-plugin-md-data'

console.log(data)// [{ path: '...', frontmatter: { ... }, content: '<h2>...</h2>...' }, { ... }]
</script>
```

Also, this may be needed.
