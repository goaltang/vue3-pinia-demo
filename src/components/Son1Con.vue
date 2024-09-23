<script setup>
import { useCounterStore } from "@/store/counter";

const counterStore = useCounterStore();
</script>

<template>
    <div>
        <h2>
            我是son1 -{{ counterStore.count }} -{{ counterStore.double }} -
            <button @click="counterStore.addCount">+</button>
        </h2>
    </div>
</template>

<style scoped></style>
