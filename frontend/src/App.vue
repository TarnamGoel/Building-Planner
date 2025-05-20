<template>
  <div>
    <ShapeToolbar @select-shape="setShape" />
    <label>
      Pick Color:
      <input type="color" v-model="selectedColor" />
    </label>
    <CanvasArea :selectedShape="selectedShape" :selectedColor="selectedColor" />
    <SaveButton />
    <ImageGallery />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ShapeToolbar from './components/ShapeToolbar.vue';
import CanvasArea from './components/CanvasArea.vue';
import SaveButton from './components/SaveButton.vue';
import ImageGallery from './components/ImageGallery.vue';

const selectedShape = ref('line');
const selectedColor = ref('#000000');
const canvasRef = ref(null);

// Provide canvasRef to child components
provide('canvasRef', canvasRef);

const setShape = (shape) => {
  selectedShape.value = shape;
};
</script>
