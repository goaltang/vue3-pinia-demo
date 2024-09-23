<script setup>
import { useCounterStore } from "./store/counter";
// import DanMuKu from "./components/DanMuKu.vue";
import LikeButton from "./components/LikeButton.vue";
import LazyLoad from "./components/LazyLoad.vue";


const counterStore = useCounterStore();
console.log(counterStore);
</script>

<template>
  <LikeButton />
  <LazyLoad />
</template>

<style scoped></style>
