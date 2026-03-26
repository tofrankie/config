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

<style lang="scss">
$spacing: 12px;

@mixin card($radius) {
  padding: $spacing;
  border-radius: $radius;
}

.example {
  width: 10px;
  height: 20px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  font-size: 14px;
  content: 'x';
  background-image: url('https://placehold.co/600x400/png');

  @include card(8px);

  &:hover {
    color: #333;
  }

  .item {
    margin-top: $spacing;
  }
}
</style>
