import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('data', {
  state: () => ({
    dataList: [],    // 存储数据的数组
    currentPage: 1,  // 当前页码
    totalPages: 5,   // 总页数，假设为5
    isLoading: false // 控制加载状态
  }),
  actions: {
    async fetchData() {
      if (this.isLoading || this.currentPage > this.totalPages) return;

      this.isLoading = true;
      try {
        const response = await axios.get(`/data?page=${this.currentPage}`);
        console.log('返回的数据:', response.data.items); // 查看返回的数据是否正确
        this.dataList = [...this.dataList, ...response.data.items];
        this.currentPage++;
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  // 启用状态持久化
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'my_data_list',  // localStorage中的key名
//         storage: localStorage,  // 使用 localStorage 持久化
//       },
//     ],
//   },
});
