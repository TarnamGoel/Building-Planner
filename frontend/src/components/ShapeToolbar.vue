<template>
  <div>
    <button @click="$emit('select-shape', 'line')">Line</button>
    <button @click="$emit('select-shape', 'rect')">Rectangle</button>
    <button @click="$emit('select-shape', 'circle')">Circle</button>
  </div>
</template>
