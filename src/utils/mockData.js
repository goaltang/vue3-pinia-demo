import Mock from "mockjs";

// 生成随机弹幕数据
function generateRandomDanmaku(count = 10) {
  const danmakuList = [];
  for (let i = 0; i < count; i++) {
    danmakuList.push(
      Mock.mock({
        "id|+1": 1,
        name: "@name", // 随机生成弹幕发送者名字
        content: "@sentence(5, 15)", // 弹幕内容为一句话
        timestamp: '@datetime("yyyy-MM-dd HH:mm:ss")', // 随机时间戳
        color: Mock.Random.color(), // 随机颜色
      })
    );
  }
  return danmakuList;
}

// Mock获取点赞数和是否已点赞
//正则表达式b不要写错了
Mock.mock(/\/likes\/\d+/, "get", (options) => {
  console.log('Mock拦截到GET请求:', options.url);  // 输出请求的URL
  return {
    likes: 100,
    isLiked: false,
  };
});

//点赞接口
Mock.mock("/likes", "post", (options) => {
  console.log('Mock拦截到POST请求，参数:', options.body);  // 输出请求体
  return {
    message: "点赞成功！",
  };
});

//取消点赞接口
Mock.mock(/\/likes\/\d+/, "delete", (options) => {
  console.log('Mock拦截到DELETE请求:', options.url);  // 输出请求的URL
  return {
    message: "取消点赞成功！",
  };
});

// 模拟分页数据接口
Mock.mock(/\/data\?page=\d+/, 'get', (options) => {
  const page = parseInt(options.url.match(/page=(\d+)/)[1]);
  const data = Mock.mock({
    'items|10': [{ // 每页10条数据
      id: '@id',
      name: '@name',
      content: '@sentence(5, 10)'
    }]
  });

  console.log('Mock拦截到GET请求:', options.url);  // 输出请求的URL

  return {
    items: data.items,
    currentPage: page,
    totalPages: 5 // 总共5页数据
  };
});


export { generateRandomDanmaku };
