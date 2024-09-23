<template>
    <div>
        <button @click="toggleLike">
            {{ isLiked ? '取消点赞' : '点赞' }} ({{ likes }})
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLikeStore } from '@/store/like.js';
import { storeToRefs } from 'pinia';

const likeStore = useLikeStore();
const { likes, isLiked } = storeToRefs(likeStore);

const rid = 123; // 动漫ID

const toggleLike = () => {
    likeStore.toggleLike(rid);
};

onMounted(() => {
    likeStore.fetchLikes(rid);
});
</script>

<style scoped>
button {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>