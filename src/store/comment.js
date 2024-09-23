import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    loading: false,
  }),
  actions: {
    async fetchComments() {
      this.loading = true;
      try {
        console.log('Fetching comments...');
        const response = await axios.get("/api/comments");
        console.log('Response:', response); // 检查响应
        this.comments = response.data.comments;
      } catch (error) {
        console.error("获取评论失败", error);
      } finally {
        this.loading = false;
      }
    },
    toggleLike(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment && !comment.likedByUser) {
        comment.likes++;
        comment.likedByUser = true;
      }
    },
    toggleLikeReply(replyId, commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      const reply = comment?.replies.find((r) => r.id === replyId);
      if (reply && !reply.likedByUser) {
        reply.likes++;
        reply.likedByUser = true;
      }
    },
    toggleExpand(commentId) {
      const comment = this.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.expanded = !comment.expanded;
      }
    },
  },
});
