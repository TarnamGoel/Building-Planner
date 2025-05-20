<template>
  <button @click="save">Save Drawing</button>
</template>

<script setup>
import { inject } from 'vue';
import { saveImage } from '../services/api';

const canvasRef = inject('canvasRef');

const save = async () => {
  const image = canvasRef.value.toDataURL('image/png');
  await saveImage(image);
  alert('Saved successfully!');
};
</script>
