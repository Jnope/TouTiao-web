<template>
  <div>
    <toper :statu="statu" :namm="namm" class="toper"></toper>
    <div class="body">
      <div class="left">
        <div class="out">
          <div v-if="!goodAndCollect[0]">
            <img src="@/assets/images/good.png" @click="changenewsinfo(1)" />
          </div>
          <div v-else>
            <img src="@/assets/images/gooded.png" @click="changenewsinfo(1)" />
          </div>
          <div>{{ choosenews.goods.length }}点赞</div>
        </div>
        <div class="out">
          <div><img src="@/assets/images/comment.png" /></div>
          <div>{{ choosenews.comments.length }}评论</div>
        </div>
        <div class="out">
          <div v-if="!goodAndCollect[1]">
            <img src="@/assets/images/collect.png" @click="changenewsinfo(3)" />
          </div>
          <div v-else>
            <img
              src="@/assets/images/collected.png"
              @click="changenewsinfo(3)"
            />
          </div>
          <div>{{ choosenews.collects.length }}收藏</div>
        </div>
        <div class="out">
          <div><img src="@/assets/images/share.png" /></div>
          <div>分享</div>
        </div>
      </div>
      <div class="news">
        <div class="title">{{ choosenews.title }}</div>
        <div class="name">{{ choosenews.name }}</div>
        <div v-if="choosenews.content !== undefined" class="nocontent">
          未定义内容
        </div>
        <div v-else class="content">{{ choosenews.content }}</div>
        <div class="comment">
          <div>评论数：{{ choosenews.comments.length }}</div>
          <div v-if="statu == 1">
            <textarea
              placeholder="说点什么"
              rows="3"
              cols="60"
              v-model="inputcomment"
            />
            <div @click="changenewsinfo(2)">提交</div>
          </div>
          <div v-for="(item, index) in choosenews.comments" :key="index">
            <div class="commtop">
              <div>{{ item.name }}</div>
              <div @click="changecommentinfo(1,index)">{{ item.goods.length }}点赞</div>
            </div>
            <div class="comm">{{ item.about }}</div>
            <div class="incomments">
              <div @click="changeshow(index)">回复</div>
              <div v-show="isshow ==index">
                <div v-if="statu == 1">
                <textarea placeholder="说点什么" v-model="inputcomment"></textarea>
                <div @click="changecommentinfo(2, index);changeshow(index)">提交</div>
                </div>
                <div v-else>请登录</div>
              </div>
              <div v-for="(item1, index1) in item.comments" :key="index1">
                <div class="commtop">
                  <div>{{ item1.name }}</div>
                </div>
                <div>{{ item1.about }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="info">
          <div>{{ choosenews.name }}</div>
          <div
            @click="submitFocus"
            v-if="userelseinfo[1].includes(choosenews.name)"
          >
            已关注
          </div>
          <div @click="submitFocus" v-else>关注</div>
        </div>
        <div class="papers">
          <div v-if="userallNews.length > 1">TA的作品</div>
          <div v-for="(item, index) in userallNews" :key="index">
            {{ item.title }}
          </div>
        </div>
        <body-hot></body-hot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import toper from "@/components/toper.vue";
import bodyHot from "@/components/body-hot.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { toper, bodyHot },
  setup() {
    let route = useRoute();
    let store = useStore();
    //当有本地储存时，获取本地储存的store值
    if (sessionStorage.getItem("store")) {
      store.replaceState(
        Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
      // console.log("singlenews");
    }
    //获取传入的新闻id
    let chooseid = JSON.parse(sessionStorage.getItem("chooseid"));
    let choosename = JSON.parse(sessionStorage.getItem("choosename"));
    // console.log(chooseid, choosename);
    // store.commit('chooseidnews',parseInt(chooseid));
    //提交更改显示的新闻内容
    store.commit("chooseidnews", chooseid);
    store.commit("chooseidallnews", choosename);
    //提交新闻显示的点赞和收藏状态
    store.commit("loadGoodAndCollect", chooseid);
    //获取新闻内容
    let choosenews = computed(() => {
      return store.state.showidnews;
    });
    // console.log(choosenews.value.name);

    //获取该新闻用户发表的文章
    // store.commit('chooseidallnews', choosenews.name);
    let userallNews = computed(() => {
      return store.state.showothernews;
    });
    //获取用户状态、信息
    let statu = computed(() => {
      return store.getters.stat;
    });
    let namm = computed(() => {
      return store.getters.nam;
    });
    let goodAndCollect = computed(() => {
      return store.state.goodAndCollect;
    });
    //绑定输入的评论
    let inputcomment = ref("");
    //提交新闻的点赞、评论和收藏的更改
    let changenewsinfo = (a) => {
      if (statu.value == 1) {
        if (a == 1) {
          store.commit("addnewsinfo", [1, namm.value]);
        } else if (a == 3) {
          store.commit("addnewsinfo", [3, namm.value]);
        } else {
          if (inputcomment.value.length != 0) {
            store.commit("addnewsinfo", [2, namm.value, inputcomment.value]);
          } else {
            return;
          }
        }
      }
    };
    //提交评论的点赞和评论
    let changecommentinfo =(a, b) =>{
      // console.log(a,b);
      if (statu.value == 1) {
        if (a == 1) {
          store.commit("addcommentinfo", [1, b, namm.value]);
        } else {
          if (inputcomment.value.length != 0) {
            store.commit("addcommentinfo", [2, b, namm.value, inputcomment.value]);
          } else {
            return;
          }
        }
      }
    };
    let isshow = ref(NaN);
    let changeshow =(a)=>{
      // console.log(a);
      if(isNaN(isshow.value)){
        isshow.value =a;
      }else{
        isshow.value =NaN;
      }
      // console.log(isshow);
    };
    //获取登录用户的信息
    let userelseinfo = computed(() => {
      return store.getters.userelseinfo;
    });
    //提交关注
    let submitFocus = () => {
      store.commit("addFocus", [namm.value, choosenews.value.name]);
    };
    onMounted(() => {
      //刷新前将store储存于本地
      window.addEventListener("beforeunload", () => {
        // console.log('singlenews.store');
        sessionStorage.setItem("store", JSON.stringify(store.state));
      });
    });
    onBeforeUnmount(()=>{
      //离开页面时
      // console.log(1);
      sessionStorage.setItem('store', JSON.stringify(store.state));
    });
    onUnmounted(()=>{
      window.removeEventListener("beforeunload", () => {
        // console.log('singlenews.store');
        sessionStorage.setItem("store", JSON.stringify(store.state));
      });
    });
    return {
      statu,
      namm,
      goodAndCollect,
      chooseid,
      choosenews,
      userallNews,
      changenewsinfo,
      changecommentinfo,
      inputcomment,
      submitFocus,
      userelseinfo,
      isshow,
      changeshow,
    };
  },
});
</script>

<style lang="scss" scoped>
.toper {
  z-index: 500;
  position: fixed;
}
.body {
  position: relative;
  top: 40px;
  display: grid;
  grid-template-columns: auto 800px 300px auto;
  .left {
    grid-column: 1;
    position: relative;
    margin-right: 30px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    .out {
      font-size: 20px;
      margin-top: 20px;
      text-align: center;
      width: 80px;
      img {
        transform: scale(1.3);
      }
      img:hover {
        cursor: pointer;
      }
    }
  }
  .news {
    grid-column: 2;
    .title {
      font-size: 40px;
      font-weight: bold;
    }
    .name {
      margin-bottom: 40px;
      font-size: 15px;
    }
    .nocontent {
      font-size: 18px;
      color: red;
      margin-bottom: 40px;
    }
    .content {
      font-size: 18px;
      margin-bottom: 40px;
    }
  }
  .right {
    grid-column: 3;
  }
}
.commtop{
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}
.comm{
  width: 80%;
  margin-top: 10px;
  font-size: 15px;
}
.incomments{
  width: 80%;
  margin-left: 2em;
}
</style>
