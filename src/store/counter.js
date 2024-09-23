import { defineStore } from "pinia";

import { computed, ref } from "vue";


//仓库创建数据
//定义store

//'counter'是仓库唯一标识，（）=>箭头函数

export const useCounterStore = defineStore('counter',()=>{
    //声明数据 state - count
    const count = ref(100);
    //声明操作数据的方法action
    const addCount = ()=> count.value++;
    const subCount =()=>count.value--;
    //声明基于数据派生父计算属性
    const double =computed(()=> count.value *2)
    //声明数据state-msg
    const msg = ref('hello pinia')

    return {
        count,
        msg,
        addCount,
        subCount,
        double
    }

})