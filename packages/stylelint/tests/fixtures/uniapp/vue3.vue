<script setup>
defineOptions({
  options: {
    virtualHost: false,
    styleIsolation: 'shared',
  },
})

// your code...
</script>

<template>
  <view class="example" />
  <view
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
:global(page) {
  width: 20rpx;
  height: 10px;
}

.example {
  width: 10px;
  height: 20px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  font-size: 14px;
  content: 'x';
  background-image: url('https://placehold.co/600x400/png');
}

.example :deep(.sub) {
  width: 10rpx;
}
</style>
