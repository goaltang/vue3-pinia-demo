import { defineStore } from "pinia";
import axios from "axios";

export const useLikeStore = defineStore('like',{
    state:()=>({
        likes:0,//点赞数
        isLiked: false,//是否点赞点赞就不能再点赞
    }),

    actions:{
        async toggleLike(rid){
            try {
                if (this.isLiked) {
                    await axios.delete(`/likes/${rid}`);
                    console.log(rid)
                    this.likes--;
                } else {
                    await axios.post(`/likes`,{rid})
                    this.likes++;
                }
                this.isLiked=!this.isLiked;
            } catch (error) {
                console.error("获取当前点赞状态失败：",error)
            }
        },
        async fetchLikes(rid){
            try {
                const response = await axios.get(`/likes/${rid}`);
                console.log(rid);
                this.likes = response.data.likes;
                this.isLiked = response.data.isLiked;
            } catch (error) {
                console.log("获取当前点赞数失败",error)
            }
        }
    }
})