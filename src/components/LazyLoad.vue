<template>
    <div class="container" ref="scrollContainer">
        <div v-for="item in dataList" :key="item.id" class="item">
            <h4>{{ item.name }}</h4>
            <p>{{ item.content }}</p>
        </div>
        <div v-if="isLoading" class="loading">
            加载中...
        </div>
        <div v-if="currentPage > totalPages" class="end">
            已加载完所有数据
        </div>
        <div ref="loadTrigger" class="trigger"></div> <!-- 作为IntersectionObserver的触发元素 -->
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDataStore } from '../store/dataStore';
// import { watch } from 'vue';
import { ref } from 'vue';

const store = useDataStore();
const { dataList, fetchData, isLoading, currentPage, totalPages } = store;
const scrollContainer = ref(null);
const loadTrigger = ref(null);

// 监控数据变化
// watch(dataList, (newList) => {
//     console.log('当前数据列表:', newList);
// });

onMounted(() => {
    fetchData(); // 初始化加载第一页数据
    // 使用 IntersectionObserver 监听底部的触发器是否可见
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isLoading && currentPage <= totalPages) {
            fetchData(); // 当触发器元素可见时，加载下一页数据
        }
    });

    if (loadTrigger.value) {
        observer.observe(loadTrigger.value); // 开始观察触发器
    }
});

// const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollTop + clientHeight >= scrollHeight - 10) {
//         fetchData(); // 滚动到底部时加载下一页
//     }
// };
</script>

<style scoped>
.container {
    height: 400px;
    overflow-y: scroll;
}

.item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.loading,
.end {
    text-align: center;
    padding: 20px;
}

.trigger {
    height: 1px;
    /* 用于触发 IntersectionObserver 的小元素 */
}
</style>