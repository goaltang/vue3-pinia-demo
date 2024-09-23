<script setup>
import { useCounterStore } from '@/store/counter';

const counterStore = useCounterStore();

</script>

<template>
    <div>
        <h3>
            33333333333
            -0{{ counterStore.count }}
            - <button @click="counterStore.subCount">-</button>
        </h3>
    </div>
</template>

<style scoped></style>
