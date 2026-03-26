<template>
  <page class="example" />
</template>

<style lang="scss">
$base-width: 20rpx;
$radius: 6px;

@mixin card($padding) {
  padding: $padding;
  border-radius: $radius;
}

page {
  width: $base-width;
  height: 10px;

  @include card(8px);

  .example {
    width: 10rpx;
  }
}
</style>
