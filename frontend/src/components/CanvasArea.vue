<template>
  <canvas
    ref="canvas"
    width="600"
    height="400"
    @mousedown="startDrawing"
    @mousemove="draw"
    @mouseup="stopDrawing"
    @mouseleave="stopDrawing"
    style="border: 1px solid black;"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue';

const props = defineProps({
  selectedShape: String,
  selectedColor: String,
});

// Inject canvasRef from parent (optional)
const injectedCanvasRef = inject('canvasRef', null);

const canvas = ref(null);
const ctx = ref(null);

let isDrawing = false;
let startX = 0;
let startY = 0;
let currentShape = 'line';
let lastMouseX = 0;
let lastMouseY = 0;

// Store all drawn shapes
const shapes = ref([]); // { type, startX, startY, endX, endY }

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    if (injectedCanvasRef) {
      injectedCanvasRef.value = canvas.value;
    }
  }
});

// Watch for shape selection changes
watch(() => props.selectedShape, (newShape) => {
  if (newShape) {
    currentShape = newShape;
  }
});

function startDrawing(e) {
  if (!canvas.value) return;
  isDrawing = true;
  const rect = canvas.value.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
}

function draw(e) {
  if (!isDrawing || !ctx.value || !canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const endX = e.clientX - rect.left;
  const endY = e.clientY - rect.top;

  lastMouseX = endX;
  lastMouseY = endY;

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  shapes.value.forEach(drawShape);

  drawShape({
    type: currentShape,
    startX,
    startY,
    endX,
    endY,
  });
}

function stopDrawing() {
  if (!isDrawing) return;
  isDrawing = false;

  shapes.value.push({
    type: currentShape,
    startX,
    startY,
    endX: lastMouseX,
    endY: lastMouseY,
    color: props.selectedColor,
    });
}

function drawShape(shape) {
  if (!ctx.value) return;

  const { type, startX, startY, endX, endY, color } = shape;

  ctx.value.strokeStyle = color || '#000000';

  if (type === 'line') {
    ctx.value.beginPath();
    ctx.value.moveTo(startX, startY);
    ctx.value.lineTo(endX, endY);
    ctx.value.stroke();
  } else if (type === 'rect') {
    const width = endX - startX;
    const height = endY - startY;
    ctx.value.strokeRect(startX, startY, width, height);
  } else if (type === 'circle') {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    ctx.value.beginPath();
    ctx.value.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.value.stroke();
  }
}

function getCanvasImage() {
  return canvas.value?.toDataURL('image/png') || null;
}

defineExpose({
  getCanvasImage,
});
</script>
