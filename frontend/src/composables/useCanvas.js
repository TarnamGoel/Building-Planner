import { ref } from 'vue';

export function useCanvas(canvasRef) {
  let ctx = null;
  let isDrawing = false;
  const currentShape = ref('line');

  function initCanvas() {
    ctx = canvasRef.value.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
  }

  function startDrawing(e) {
  if (!canvas.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Check if clicking on an existing shape
  for (let i = shapes.value.length - 1; i >= 0; i--) {
    const shape = shapes.value[i];
    if (isInsideShape(x, y, shape)) {
      draggingShapeIndex = i;
      dragOffsetX = x - shape.startX;
      dragOffsetY = y - shape.startY;
      isDrawing = false;
      return;
    }
  }

  // Else start new drawing
  isDrawing = true;
  startX = x;
  startY = y;
}

function isInsideShape(x, y, shape) {
  const { type, startX, startY, endX, endY } = shape;

  if (type === 'line') {
    const distance = Math.abs(
      (endY - startY) * x - (endX - startX) * y + endX * startY - endY * startX
    ) / Math.hypot(endX - startX, endY - startY);
    return distance < 5;
  }

  if (type === 'rect') {
    return (
      x >= Math.min(startX, endX) &&
      x <= Math.max(startX, endX) &&
      y >= Math.min(startY, endY) &&
      y <= Math.max(startY, endY)
    );
  }

  if (type === 'circle') {
    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const dx = x - startX;
    const dy = y - startY;
    return dx * dx + dy * dy <= radius * radius;
  }

  return false;
}

  function draw(e) {
  if (!ctx.value || !canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (draggingShapeIndex !== null) {
    const shape = shapes.value[draggingShapeIndex];
    const dx = x - dragOffsetX;
    const dy = y - dragOffsetY;
    const width = shape.endX - shape.startX;
    const height = shape.endY - shape.startY;

    shape.startX = dx;
    shape.startY = dy;
    shape.endX = dx + width;
    shape.endY = dy + height;

    redrawCanvas();
    return;
  }

  if (!isDrawing) return;

  lastMouseX = x;
  lastMouseY = y;

  redrawCanvas();

  // Draw preview shape
  drawShape({
    type: currentShape,
    startX,
    startY,
    endX: x,
    endY: y,
    color: props.selectedColor,
  });
}


  function stopDrawing() {
  if (draggingShapeIndex !== null) {
    draggingShapeIndex = null;
    return;
  }

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

function redrawCanvas() {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  shapes.value.forEach(drawShape);
}


  return {
    initCanvas,
    startDrawing,
    draw,
    stopDrawing,
    isInsideShape,
    redrawCanvas,
    currentShape,
  };
}
