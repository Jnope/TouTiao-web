import router from "@/router";
import { createStore } from "vuex";

export default createStore({
  state: {
    //用户信息
    user: [
      {
        name: "admin1",
        pass: "admin111",
        status: 1,
        fans: ['user'],
        focus: ["新华"],
        goods: 0,
      },
      {
        name: "user",
        pass: "user1111",
        status: 0,
        fans: [],
        focus: [],
        goods: 0,
      },
      {
        name: "in",
        pass: "in111111",
        status: 0,
        fans: [],
        focus: [],
        goods: 0,
      },
      {
        name: "新华",
        pass: "xinhua11",
        status: 0,
        fans: [],
        focus: [],
        goods: 0,
      },
      {
        name: "人民",
        pass: "renmin11",
        status: 0,
        fans: [],
        focus: [],
        goods: 0,
      },
    ],
    //toper内更多显示的内容
    allContent: [
      "娱乐",
      "体育",
      "美食",
      "时尚",
      "游戏",
      "旅游",
      "数码",
      "历史",
      "国际",
      "图片",
    ],
    //toper内更多框被选中的选项
    chooseCon: "娱乐",
    //toper选中的地点
    finalLoca: "北京",
    //toper和body-news的头部被选中选项
    topStatus: [false, true, false, false, false, false, false, false],
    //新闻内容
    news: [
      {
        id: 1,
        name: "新华",
        title: "111",
        content: "",
        tag: ["新华", "111", "北京"],
        rank: 2,
        comments: [
          { id: 1, name: "新华", about: "2333333", goods: [], comments:[{name: "in", about: "2333333"}] },
          { id: 2, name: "人民", about: "2333333", goods: [], comments:[]},
          { id: 3, name: "admin1", about: "2333333", goods: [], comments:[]},
        ],
        goods: ["admin1"],
        collects: ["in", "admin1"],
      },
      {
        id: 2,
        name: "新华",
        title: "111222",
        content: "",
        tag: ["北京"],
        rank: 1,
        comments: [],
        goods: [],
        collects: ["in", "admin1"],
      },
      {
        id: 3,
        name: "新华",
        title: "1112223333",
        content: "",
        tag: ["video"],
        rank: 3,
        comments: [],
        goods: [],
        collects: ["in", "admin1"],
      },
      {
        id: 4,
        name: "新华",
        title: "2223333",
        content: "",
        tag: ["上海"],
        rank: 4,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 5,
        name: "新华",
        title: "111333",
        content: "",
        tag: [],
        rank: 5,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 6,
        name: "新华",
        title: "222444",
        content: "",
        tag: ["all"],
        rank: 6,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 7,
        name: "人民",
        title: "222333",
        content: "",
        tag: [],
        rank: 7,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 8,
        name: "人民",
        title: "111444",
        content: "",
        tag: ["广州"],
        rank: 8,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 9,
        name: "人民",
        title: "111222333",
        content: "",
        tag: ["深圳", "video"],
        rank: 9,
        comments: [],
        goods: [],
        collects: ["新华"],
      },
      {
        id: 10,
        name: "人民",
        title: "222333444",
        content: "",
        tag: ["tax"],
        rank: 10,
        comments: [],
        goods: [],
        collects: ["in"],
      },
      {
        id: 11,
        name: "admin1",
        title: "222444",
        content: "",
        tag: ["video", "tax"],
        rank: 11,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 12,
        name: "admin1",
        title: "111444",
        content: "",
        tag: ["all"],
        rank: 12,
        comments: [],
        goods: [],
        collects: [],
      },
      {
        id: 13,
        name: "admin1",
        title: "all",
        content: "",
        tag: ["北京", "video"],
        rank: 13,
        comments: [],
        goods: [],
        collects: ["人民", "in"],
      },
      {
        id: 14,
        name: "人民",
        title: "222333444",
        content: "",
        tag: ["up"],
        rank: 14,
        comments: [],
        goods: [],
        collects: [],
      },
    ],
    //新闻页面主题展示的新闻
    showidnews: {},
    //新闻页面用户的其他新闻
    showothernews: [],
    //新闻是否被点赞和收藏
    goodAndCollect: [false, false],
    //搜索内容
    searchContent:[],
  },
  getters: {
    //用户登录状态
    stat: (state) => {
      for (let item of state.user) {
        if (item.status == 1) {
          return 1;
        }
      }
      return 0;
    },
    //登录的用户名
    nam: (state) => {
      for (let item of state.user) {
        if (item.status == 1) {
          return item.name;
        }
      }
      return "none";
    },
    //用户粉丝、赞和关注数
    userelse: (state) => {
      let loguser = state.user.filter((item) => {
        return item.status == 1;
      });
      return [
        loguser[0].goods,
        loguser[0].fans.length,
        loguser[0].focus.length,
      ];
    },
    //获取用户粉丝、关注列表
    userelseinfo:(state)=>{
      let loguser = state.user.filter((item) => {
        return item.status == 1;
      });
      return [
        loguser[0].fans,
        loguser[0].focus,
      ];
    },
    //更多框的内容
    conten: (state) => {
      return state.allContent.filter((a) => {
        return a != state.chooseCon;
      });
    },
    hotnews: (state) => {
      let hots = state.news.filter((item) => {
        return item.rank < 11;
      });
      // console.log(hots.length);
      return hots.sort(function (a, b) {
        return a.rank - b.rank;
      });
    },
    hotvideo: (state) => {
      let videos = state.news.filter((item) => {
        return item.tag.includes("video") || item.tag.includes("all");
      });
      // let ranks = videos.map((item)=>{return item.rank});
      if (videos.length <= 10) {
        return videos.sort((a, b) => {
          return a.rank - b.rank;
        });
      } else {
        videos.sort((a, b) => {
          return a.rank - b.rank;
        });
        return videos.slice(0, 10);
      }
    },
    //home主页根据toper选择显示不同新闻
    chooseNew: (state) => {
      let judge;
      //获取用户选择的内容——为数字形式的字符串
      for (let i in state.topStatus) {
        if (state.topStatus[i] == true) {
          judge = i;
          judge = parseInt(judge);
        }
      }
      // console.log(judge);
      // console.log(typeof(judge));
      let loginNow = "noone";
      for (let item of state.user) {
        if (item.status == 1) {
          loginNow = item;
        }
      }
      // console.log(loginNow.focus);
      let choonews = [];
      switch (judge) {
        case 0:
          // console.log(judge);
          if (loginNow !== "noone") {
            if (loginNow.focus.length != 0) {
              for (let i of loginNow.focus) {
                choonews = choonews.concat(
                  state.news.filter((item) => {
                    return item.name == i;
                  })
                );
              }
            }
            break;
          } else {
            choonews = [];
            break;
          }

        case 1:
          choonews = state.news;
          // console.log(choonews);
          break;

        case 2: {
          choonews = state.news;
          choonews.sort((a, b) => {
            return a.rank - b.rank;
          });
          break;
        }
        case 3: {
          choonews = state.news.filter((item) => {
            return (
              item.tag.includes(state.finalLoca) || item.tag.includes("all")
            );
          });
          break;
        }
        case 4: {
          choonews = state.news.filter((item) => {
            return item.tag.includes("video") || item.tag.includes("all");
          });
          break;
        }
        case 5: {
          choonews = state.news.filter((item) => {
            return item.tag.includes("tax") || item.tag.includes("all");
          });
          break;
        }
        case 6: {
          choonews = state.news.filter((item) => {
            return item.tag.includes("science") || item.tag.includes("all");
          });
          break;
        }
        case 7: {
          choonews = state.news.filter((item) => {
            return (
              item.tag.includes(state.chooseCon) || item.tag.includes("all")
            );
          });
          break;
        }
      }
      return choonews;
    },
    //获取登录的用户发表或收藏的新闻
    userNews: (state, getters) => {
      // console.log(state.userStatus);
      if (state.userStatus == 0) {
        // console.log(0);
        return state.news.filter((item) => {
          return item.name == getters.nam;
        });
      } else {
        // console.log(1);
        return state.news.filter((item) => {
          return item.collects.includes(getters.nam);
        });
      }
    },
    //获取搜索内容
    searchnews: (state) =>{
      // console.log(state.searchContent);
      return state.news.filter((item)=>{
        let n=0;
        state.searchContent.some((a)=>{
          let re = new RegExp(a);
          if(re.test(item.title)||re.test(item.tag.join(' '))){
            // console.log(re);
            n = 1;
            return true;
          }
        }); 
        return n ==1;
      });
    },
  },
  mutations: {
    //登录函数
    //payload为[name,pass]
    signin(state, payload) {
      for (let item of state.user) {
        item.status = 0;
      }
      //在对象数组中查找所有键为key的值
      let findKeyValue = (list, key) => {
        return list.map((item) => {
          return item[key];
        });
      };
      //查找所有已有name
      let allName = findKeyValue(state.user, "name");
      // console.log(allName);
      // console.log(payload[0]);
      if (allName.includes(payload[0])) {
        let index = state.user.findIndex((item) => {
          return item.name == payload[0];
        });
        // console.log(index);
        if (state.user[index].pass == payload[1]) {
          state.user[index].status = 1;
          router.push({ name: "home" });
        } else {
          window.alert("密码错误");
        }
      } else {
        if (payload[0] == "") {
          return;
        }
        window.alert("用户不存在");
      }
    },
    //注册函数
    signup(state, payload) {
      for (let item of state.user) {
        item.status = 0;
      }
      //payload为[{name:'xx',pass:'xx',status:1}]
      let findKeyValue = (list, key) => {
        return list.map((item) => {
          return item[key];
        });
      };
      let allName = findKeyValue(state.user, "name");
      if (allName.includes(payload.name)) {
        window.alert("用户名已存在，请登录");
      } else {
        if (payload.name == "") {
          return;
        }
        if (payload.pass == "") {
          return;
        }
        state.user.push(payload);
        // console.log(state.user);
        router.push({ name: "home" });
      }
    },
    //退出登录
    logout(state) {
      for (let item of state.user) {
        item.status = 0;
      }
    },
    //更多选项框内容变化
    changeContent(state, payload) {
      state.chooseCon = payload;
    },
    //变更地点
    changeLoca(state, payload) {
      state.finalLoca = payload;
    },
    //变更toper选择
    changeChoose(state, payload) {
      for (let item in state.topStatus) {
        state.topStatus[item] = false;
      }
      state.topStatus[payload] = true;
    },
    //变更用户页面选择
    changeUserChoose(state, payload){
      if(payload ==0){state.userStatus =0; }
      else{state.userStatus =1;}
    },
    //根据新闻id更新要展示的新闻内容
    chooseidnews(state, payload){
      //payload为新闻id
      let choosenew = state.news.filter((item)=>{return item.id == payload});
      state.showidnews = choosenew[0];
      // console.log(state.showidnews)
    },
    //根据新闻id更新用户所有发表新闻
    chooseidallnews(state, payload){
      if(state.news.filter((item)=>{
        return item.name == payload
      }).length <=10){
        state.showothernews = state.news.filter((item)=>{
          return item.name == payload
        });
      }else{
        state.showothernews = state.news.filter((item)=>{
          return item.name == payload
        }).slice(0,10);
      }
      // console.log(state.showothernews)
    },
    //根据登录用户和新闻id提交改变新闻的点赞和收藏状态
    loadGoodAndCollect(state, payload){
      //payload为新闻id
      let judge = false;
      let name = '';
      for (let item of state.user) {
        if (item.status == 1) {
          judge = true;
          name = item.name
        }
      }
      // console.log(judge, name);
      if(judge == false){
        state.goodAndCollect = [false, false];
      }else{
        state.news.filter((item)=>{
          if(item.id == payload){
            if(item.goods.includes(name)){
              state.goodAndCollect[0] = true;
            }
            if(item.collects.includes(name)){
              state.goodAndCollect[1] = true;
            }
            return
          }
        })
      }
    },
    //添加或取消新闻的点赞、评论和收藏
    addnewsinfo(state, payload){
      //payload为需要添加的信息的种类：1点赞，2评论，3收藏；和人物；和内容：评论内容
      if(payload[0] ==1){
        // console.log(state.showidnews.goods);
        // console.log(payload[1]);
        if(state.showidnews.goods.includes(payload[1])){
          state.showidnews.goods = state.showidnews.goods.filter((item)=>{
            return item !=payload[1];
          });
          // console.log(state.showidnews.goods);
          state.goodAndCollect[0] =false;
        }else{
          state.showidnews.goods.push(payload[1]);
          state.goodAndCollect[0] =true;
        }
      }
      else if(payload[0] ==3){
        if(state.showidnews.collects.includes(payload[1])){
          state.showidnews.collects = state.showidnews.collects.filter((item)=>{
            return item !=payload[1];
          });
          state.goodAndCollect[1] =false;
        }else{
          state.showidnews.collects.push(payload[1]);
          state.goodAndCollect[1] =true;
        }
      }
      else{
        state.showidnews.comments.push({name: payload[1], about: payload[2], goods:[], comments:[]})
      }
      //无需更改news，引物showidnews属性值指向news
    },
    //提交或取消评论的点赞和评论
    addcommentinfo(state, payload){
      if(payload[0] ==1){
        // console.log(state.showidnews.goods);
        // console.log(payload[1]);
        if(state.showidnews.comments[payload[1]].goods.includes(payload[2])){
          state.showidnews.comments[payload[1]].goods = 
          state.showidnews.comments[payload[1]].goods.filter((item)=>{
            return item != payload[2];
          });
        }else{
          state.showidnews.comments[payload[1]].goods.push(payload[2]);
        }
      }else{
        state.showidnews.comments[payload[1]].comments.push({name: payload[2], about: payload[3]});
      }
    },
    //提交关注
    addFocus(state, payload){
      //payload[目前登录的用户名, 需关注的用户名]
      // console.log(payload);
      // console.log(payload[0].value);
      for(let item in state.user){
        if(state.user[item].name == payload[0]){
          // console.log(1);
          if(state.user[item].focus.includes(payload[1])){
            state.user[item].focus.map((val, index)=>{
              if(val == payload[1]){
                state.user[item].focus.splice(index, 1);
                // console.log(state.user[item].focus);
              }
            });
          }
          else {state.user[item].focus.push(payload[1]);}
        }
      }
    },
    //提交搜索数组
    getSearch(state, payload){
      //payload为搜索内容
      state.searchContent = [...new Set(payload.split(' '))].filter((item)=>{
        return item != '';
      })
    },
  },
  actions: {},
  modules: {},
});
