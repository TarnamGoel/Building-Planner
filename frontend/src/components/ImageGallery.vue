<template>
  <div>
    <h2>Saved Drawings</h2>
    <div v-for="img in images" :key="img._id">
      <img :src="img.image" width="100" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchImages } from '../services/api';

const images = ref([]);

onMounted(async () => {
  images.value = await fetchImages();
});
</script>
