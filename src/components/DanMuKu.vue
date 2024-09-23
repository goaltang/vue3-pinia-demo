<template>
    <div style="position: relative; width: 100%;">
        <!-- 视频播放器 -->
        <video ref="videoRef" width="100%" controls @play="handlePlay" @pause="handlePause">
            <source :src="videoSrc" type="video/mp4" />
        </video>

        <!-- 弹幕组件，使用自定义弹幕结构 -->
        <vue-danmaku ref="danmakuRef" v-model:danmus="danmakuList" loop :channels="5" useSlot
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"
            :pause="!isPlaying">
            <template v-slot:dm="{ danmu }">
                <span>{{ danmu.content }}</span>
            </template>
        </vue-danmaku>
    </div>

    <!-- 控制按钮和弹幕输入 -->
    <el-button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</el-button>
    <el-button @click="toggleDanmakuVisibility">{{ isDanmakuVisible ? '关闭弹幕' : '显示弹幕' }}</el-button>
    <el-popover placement="bottom" title="Title" :width="200" trigger="click">
        <p>弹幕速度</p>
        <p>弹幕</p>
        <template #reference>
            <el-button class="m-2">弹幕设置</el-button>
        </template>
    </el-popover>
    <el-input v-model="input" placeholder="发送弹幕" :disabled="!isDanmakuVisible" />
    <el-button @click="sendDanmaku" type="primary" :disabled="!isDanmakuVisible">发送</el-button>

    <!-- 打印弹幕列表 -->
    <!-- 弹幕列表 -->
    <div class="danmaku-list">
        <h3>弹幕列表</h3>
        <el-scrollbar style="height: 300px;">
            <div v-for="item in danmakuList" :key="item.id" class="danmaku-item">
                <el-card :body-style="{ padding: '10px' }">
                    <div>{{ item.content }}</div>
                    <div class="meta">{{ item.timestamp }}</div>
                </el-card>
            </div>
        </el-scrollbar>
    </div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useDanmakuStore } from '@/store/danmaku';
import vueDanmaku from 'vue3-danmaku';
import videoSrc from '@/assets/videos/barca1.mp4'
import { generateRandomDanmaku } from '@/utils/mockData'

// Pinia Store
const store = useDanmakuStore();
const input = ref('');
const danmakuList = computed(() => store.danmakuList);
const videoRef = ref(null);
const danmakuRef = ref(null);


const isPlaying = computed(() => store.isPlaying);
const isDanmakuVisible = computed(() => store.isDanmakuVisibility);

// 控制播放按钮
const togglePlay = () => {
    if (isPlaying.value) {
        videoRef.value.pause(); // 暂停视频
        danmakuRef.value.pause(); // 暂停弹幕
    } else {
        // 尝试播放视频，并处理可能的 NotAllowedError
        videoRef.value.play().catch(error => {
            if (error.name === 'NotAllowedError') {
                console.error('Video cannot be played automatically. Please click the play button.');
            } else {
                console.error('Playback failed:', error);
            }
        });
        danmakuRef.value.play(); // 播放弹幕
    }
    store.togglePlay(); // 更新 Pinia 状态
};

// 显示/隐藏弹幕
const toggleDanmakuVisibility = () => {
    store.toggleDanmakuVisibility();
    if (danmakuRef.value) {
        isDanmakuVisible.value ? danmakuRef.value.show() : danmakuRef.value.hide();
    }
};

const sendDanmaku = () => {
    if (input.value.trim()) {
        const newDanmaku = {
            id: Date.now(),
            content: input.value,
            timestamp: new Date().toLocaleString(),  // 使用本地时间格式
            color: '#FF0000' // 默认颜色
        };
        console.log('发送的弹幕:', newDanmaku);  // 打印发送的弹幕
        store.addDanmaku(newDanmaku); // 将弹幕添加到 Pinia store
        input.value = '';
    }
};


// 监听视频播放和暂停事件，立即同步状态
const handlePlay = () => {
    store.isPlaying = true;  // 更新 Pinia 中的状态
    danmakuRef.value.play(); // 弹幕开始播放
};

const handlePause = () => {
    store.isPlaying = false;  // 更新 Pinia 中的状态
    danmakuRef.value.pause(); // 弹幕暂停
};

// 监听播放状态变化，控制弹幕同步
watch(isPlaying, (newVal) => {
    if (videoRef.value && danmakuRef.value) {
        if (newVal) {
            videoRef.value.play();
            danmakuRef.value.play();  // 确保弹幕同步播放
        } else {
            videoRef.value.pause();
            danmakuRef.value.pause();  // 确保弹幕同步暂停
        }
    }
    console.log('Danmaku List:', newVal); // 确保数据正确
});

// 在组件挂载时，确保弹幕和视频的播放状态同步
onMounted(() => {
    // 初始化弹幕列表
    const initialDanmakuList = generateRandomDanmaku(10);
    store.danmakuList = initialDanmakuList;

    // 页面加载时不自动播放视频和弹幕，等待用户点击播放
    if (videoRef.value && danmakuRef.value) {
        videoRef.value.pause(); // 暂停视频
        danmakuRef.value.pause(); // 暂停弹幕
    }

    console.log('组件挂载时的弹幕列表:', danmakuList.value);  // 打印初始弹幕列表
});
</script>


<style scoped>
.el-collapse {
    border: 1px solid red;
    /* 给弹幕列表加个边框，方便调试 */
}

.danmaku-list {
    margin-top: 20px;
}

.danmaku-item {
    margin-bottom: 10px;
}

.meta {
    font-size: 12px;
    color: #999;
}
</style>