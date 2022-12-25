<script lang="ts" setup>

interface Props {
  active: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:active', value: boolean): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div :class="{ active: props.active }" class="hamburger" @click="emit('update:active', !props.active)">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>


<style lang="scss" scoped>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 7px;

  cursor: pointer;

  transform: scale(1.2);

  .line {
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), opacity 0.55s ease;

    height: 2px;
    width: 25.5px;

    background-color: var(--text-medium);

    &:nth-child(1) {
      transform-origin: 0 50%;
    }

    &:nth-child(2) {
      transform-origin: 0 50%;
    }

    &:nth-child(3) {
      transform-origin: 0 50%;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .line {
        background-color: var(--primary-dark);
      }
    }
  }

  &.active {
    .line:nth-child(1) {
      transform: translate(0, 0) rotate(45deg);
    }

    .line:nth-child(2) {
      opacity: 0;
      transform: scale(0, 1);
    }

    .line:nth-child(3) {
      transform: translate(0, 0) rotate(-45deg);
    }
  }
}
</style>