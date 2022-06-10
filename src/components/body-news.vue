<template>
  <div class="bodynews">
    <div class="top">
      <!-- 动态属性绑定 -->
      <div :class="{ active: chooseArray[0] }" @click="submitChoose(0)">
        关注
      </div>
      <div :class="{ active: chooseArray[1] }" @click="submitChoose(1)">
        推荐
      </div>
      <div :class="{ active: chooseArray[2] }" @click="submitChoose(2)">
        热点
      </div>
      <div class="dropdown" ref="wholebody">
        <div @click="showSite">
          <span :class="{ active: chooseArray[3] }" @click="submitChoose(3)">{{
            finalLocation
          }}</span>
          <img src="@/assets/images/down.png" />
        </div>
        <div class="dropsite" v-show="isshow3">
          <select v-model="location">
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广州">广州</option>
            <option value="深圳">深圳</option>
          </select>
          <div>
            <button @click="showSite">取消</button>
            <button @click="submitSite">确认</button>
          </div>
        </div>
      </div>
      <div :class="{ active: chooseArray[4] }" @click="submitChoose(4)">
        西瓜视频
      </div>
      <div :class="{ active: chooseArray[5] }" @click="submitChoose(5)">
        财经
      </div>
      <div :class="{ active: chooseArray[6] }" @click="submitChoose(6)">
        科技
      </div>
      <div :class="{ active: chooseArray[7] }" @click="submitChoose(7)">
        {{ chooseContent }}
      </div>
      <div class="drop">
        <span>更多</span>
        <div class="dropcontent">
          <div
            v-for="(item, index) in content"
            :key="index"
            @click="submitContent(item), submitChoose(7)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="allNews">
      <div v-if="chooseNews.length == 0 && chooseArray[0]" class="tosign">
        <router-link to="/sign">请登录</router-link>
      </div>
      <div v-for="(item, index) in chooseNews" :key="index" class="singleNews">
        <div class="title" @click="toNews(item.id, item.name)">
          {{ item.title }}
        </div>
        <div class="tinyinfo">
          <div>{{ item.name }}</div>
          <div>{{ item.comments.length }}评论</div>
        </div>
        <div v-if="chooseNews.length == 0">没有更多内容</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let router = useRouter();
    let store = useStore();
    let wholebody = ref();
    //获取登录状态
    let statu = computed(() => {
      return store.getters.stat;
    });
    // console.log(statu);
    //判断显示地点选择框与否的值
    let isshow3 = ref(false);
    //获取用户选择的toper内容
    let chooseArray = computed(() => {
      return store.state.topStatus;
    });
    // console.log(chooseArray);
    //选择地点
    let location = ref("北京");
    //获取vuex地点
    let finalLocation = computed(() => {
      return store.state.finalLoca;
    });
    //更多框内容
    let content = computed(() => {
      return store.getters.conten;
    });
    //单独显示的一个更多框内容
    let chooseContent = computed(() => {
      return store.state.chooseCon;
    });
    //发起对选择的更多框内容的提交
    let submitContent = (item) => {
      store.commit("changeContent", item);
    };
    //展示地点选择框与否
    let showSite = () => {
      if (isshow3.value == false) {
        isshow3.value = true;
      } else isshow3.value = false;
    };
    //提交选择的地点
    let submitSite = () => {
      store.commit("changeLoca", location);
      showSite();
    };
    //更换选择
    let submitChoose = (num) => {
      store.commit("changeChoose", num);
    };
    //获取不同状态新闻
    let chooseNews = computed(() => {
      return store.getters.chooseNew;
    });
    // console.log(chooseNews);
    //进入新闻界面
    let toNews = (a, b) => {
      let iid = parseInt(a);
      // console.log(a,b);
      // store.commit("chooseidnews", iid);
      // store.commit("chooseidallnews", b);
      //将进入的新闻id和新闻作者提交至sessionStorage
      sessionStorage.setItem("chooseid", JSON.stringify(iid));
      sessionStorage.setItem("choosename", JSON.stringify(b));
      router.push({ name: "singlenews"});
    };
    //点击空白处选择框消失
    onMounted(() => {
      window.addEventListener("click", (e) => {
        if (wholebody.value && !wholebody.value.contains(e.target)) {
          isshow3.value = false;
        }
      });
    });
    return {
      statu,
      wholebody,
      finalLocation,
      content,
      chooseContent,
      submitContent,
      isshow3,
      location,
      showSite,
      submitSite,
      chooseArray,
      submitChoose,
      chooseNews,
      toNews,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.bodynews {
  margin-top: 5px;
}
.top {
  display: flex;
  font-size: 20px;
  height: 2em;
  overflow: visible;
  align-items: flex-start;
  justify-content: space-between;
  *:hover {
    color: lightcoral;
    cursor: pointer;
    img {
      transform: scale(1.2);
    }
  }
}
.dropdown {
  overflow: visible;
  height: 100%;
  width: 3em;
}
.dropsite {
  margin-top: 0.8em;
  width: 200%;
  transform: translate(-50%, 0);
  text-align: center;
  select {
    display: block;
    width: 100%;
    margin: auto;
  }
  div {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
}
.drop {
  width: 3em;
  height: 300%;
  overflow: visible;
  span {
    background-color: lightgray;
    border-radius: 3px;
    padding: 0 5px;
  }
  .dropcontent {
    display: none;
  }
}
.drop:hover {
  .dropcontent {
    margin-top: 0.8em;
    background-color: white;
    display: flex;
    color: black;
    width: 10em;
    border-style: solid;
    border-color: white;
    border-radius: 5px;
    // transform: translate(-50%,0);
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    :hover {
      color: lightcoral;
    }
  }
}
.active {
  text-decoration: underline;
  color: lightcoral;
}
.tosign {
  position: relative;
  text-align: center;
  top: 200px;
  a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    background-color: red;
    border-radius: 5px;
  }
}
.allNews {
  margin-top: 20px;
}
.singleNews {
  width: 100%;
  margin: 10px;
  .title {
    font-size: 25px;
    margin-bottom: 10px;
  }
  .title:hover {
    cursor: pointer;
  }
  .tinyinfo {
    display: flex;
    font-size: 15px;
    color: grey;
    div {
      margin-right: 2em;
    }
  }
}
</style>
