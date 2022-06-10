<template>
  <div class="header" ref="wholehead">
    <div class="head">
      <div class="service">
        <ul class="top">
          <li><a href="https://app.toutiao.com/news_article/">下载头条</a></li>
          <li><a href="https://www.toutiao.com/about/">关于头条</a></li>
          <li @click="showpop">反馈</li>
          <li><a href="https://www.toutiao.com/complain/">侵权投诉</a></li>
        </ul>
      </div>
      <div class="right">
        <div v-if="statu == 1" class="drop">
          <div class="align">
            <img src="@/assets/images/plus.png" /> 发布作品
          </div>
          <div class="dropcontent">
            <div>写文章</div>
            <div>发微头条</div>
            <div>写回答</div>
            <div>发视频</div>
          </div>
        </div>
        <div v-else class="align">
          <router-link to="/sign"
            ><img src="@/assets/images/plus.png" /> 发布作品</router-link
          >
        </div>
      </div>
      <div class="account">
        <div v-if="statu == 1" class="drop">
          <div class="align">
            <img src="@/assets/images/head.png" /> {{ namm }}
          </div>
          <div class="dropcontent">
            <div><router-link to="/user">个人主页</router-link></div>
            <div>创作平台</div>
            <div>我的收藏</div>
            <div @click="submitlogout">退出登录</div>
          </div>
        </div>
        <div v-else class="bu">
          <router-link to="/sign" class="bu1">登录</router-link>
        </div>
      </div>
    </div>
    <div class="log">
      <div class="tit">今日头条</div>
      <form>
        <input
          type="text"
          v-model="searchContent"
          @keyup.enter="submitSearch"
        />
        <img src="@/assets/images/search.png" @click="submitSearch"/>
      </form>
    </div>
    <div class="popup" v-show="isshow1">
      <div class="pop1">
        <span>意见反馈</span>
        <img src="@/assets/images/close.png" @click="closeshow" />
      </div>
      <div class="pop2">
        <form>
          反馈类型<br />
          <input type="radio" name="type" />异常case
          <input type="radio" name="type" />功能建议
          <input type="radio" name="type" />其他问题
        </form>
        <form>
          联系方式
          <input type="text" placeholder="你的手机号/邮箱" />
        </form>
        <form>
          你的意见<br />
          <textarea rows="6" cols="25" maxlength="140"></textarea>
        </form>
      </div>
      <div class="pop3">
        <button @click="closeshow">取消</button>
        <button @click="closeshow">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default defineComponent({
  name: "backHead",
  props: {
    statu: {
      type: Number,
      required: true,
    },
    namm: {
      type: String,
      required: true,
    },
  },
  emits: ["submitout"],
  setup(props, ctx) {
    let router = useRouter();
    let store = useStore();
    let wholehead = ref();
    let isshow1 = ref(false);
    let showpop = () => {
      // console.log('show');
      isshow1.value = true;
    };
    let closeshow = () => {
      isshow1.value = false;
    };
    let submitlogout = () => {
      ctx.emit("submitout");
    };
    onMounted(() => {
      window.addEventListener("click", (e) => {
        if (wholehead.value && !wholehead.value.contains(e.target)) {
          isshow1.value = false;
        }
      });
    });
    let searchContent = ref('');
    let submitSearch = () => {
      searchContent.value = searchContent.value.trim();
      // console.log(searchContent.value);
      if(searchContent.value == ''){return}
      store.commit("getSearch", searchContent.value);
      // console.log(store.state.searchContent);
      sessionStorage.setItem("searchContent", JSON.stringify(searchContent.value));
      router.push({ name: "search" });
    };
    return {
      isshow1,
      showpop,
      submitlogout,
      closeshow,
      wholehead,
      searchContent,
      submitSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.header {
  height: 400px;
  width: 100%;
  overflow: visible;
  background-color: darkgray;
  margin: 0;
  padding: 0;
}
.head {
  font-size: 15px;
  font-weight: bold;
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
  width: 100%;
  height: 3em;
  overflow: visible;
  top: 0%;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  :hover {
    cursor: pointer;
  }
}
.service {
  width: 35%;
  height: 100%;
  .top {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .top > li {
    margin: 0;
    padding: 0;
  }
}
.right {
  height: 100%;
  margin-left: auto;
  margin-right: 40px;
  margin-top: 10px;
  width: 6em;
}
.account {
  height: 100%;
  margin-top: 10px;
  margin-right: 20px;
  width: 6em;
}
.drop {
  .dropcontent {
    display: none;
  }
}
.drop:hover {
  color: lightcoral;
  .dropcontent {
    display: flex;
    flex-wrap: wrap;
    color: white;
    div:hover {
      a {
        color: lightcoral;
      }
      color: lightcoral;
    }
  }
}
.log {
  width: 40%;
  margin: auto;
  height: 300px;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  .tit {
    width: 100%;
    font-size: 45px;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-bottom: 15px;
  }
  form {
    width: 100%;
    text-align: center;
    display: inline-block;
    border-style: solid;
    border-color: red;
    border-radius: 20px;
    background-color: white;
    input {
      width: 90%;
      height: 50px;
      font-size: 30px;
      border: none;
      background: none;
      outline: none;
    }
    img {
      transform: scale(2);
    }
  }
}
.popup {
  width: 400px;
  height: 300px;
  top: 50%;
  transform: translate(0, -50%);
  margin: auto;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  border-style: solid;
  .pop1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    img:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  .pop2 {
    form {
      margin-bottom: 10px;
    }

    form textarea {
      width: 100%;
    }
  }
  .pop3 {
    display: flex;
    justify-content: space-around;
  }
}
.bu {
  background-color: red;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  :hover {
    opacity: 60%;
  }
}
</style>
