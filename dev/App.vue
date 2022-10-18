<template>
  <div :style="{ margin: '32px 16px' }">
    <h1>Posts</h1>
    <div v-for="(d, i) in data" :key="i" :style="{ borderTop: '1px solid gray', padding: '4px' }">
      <p v-for="(v, k) in d.frontmatter" :key="k">
        {{ k }}: {{ v }}
      </p>
      <div v-html="d.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { data } from 'virtual:vite-plugin-md-data'
console.log(data)
</script>
