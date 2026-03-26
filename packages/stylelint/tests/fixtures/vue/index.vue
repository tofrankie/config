<template>
  <div class="example" />
  <div
    style="
      width: 10px;
      height: 20px;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      font-size: 14px;
      content: 'x';
      background-image: url('https://placehold.co/600x400/png');
    "
  />
</template>

<style scoped>
.example {
  width: 10px;
  height: 20px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  font-size: 14px;
  content: 'x';
  background-image: url('https://placehold.co/600x400/png');
}
</style>
