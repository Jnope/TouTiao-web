<template>
  <div class="topout">
    <div class="top">
      <div class="reset" @click="toHome">今日头条</div>
      <div :class="{ 'active': chooseArray[0] }" @click="submitChoose(0);toHome()">
        关注
      </div>
      <div :class="{ 'active': chooseArray[1] }" @click="submitChoose(1);toHome()">
        推荐
      </div>
      <div :class="{ 'active': chooseArray[2] }" @click="submitChoose(2);toHome()">
        热点
      </div>
      <div class="dropdown" ref="wholetoper" @click="toHome">
        <button
          :class="{ 'active': chooseArray[3] }"
          @click="submitChoose(3);showSite()"
        >
          {{ finalLocation }}
          <img src="@/assets/images/down.png" />
        </button>
        <div id="dropsite" v-show="isshow2">
          <select v-model="location">
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广州">广州</option>
            <option value="深圳">深圳</option>
          </select>
          <button @click="showSite">取消</button>
          <button @click="submitSite">确定</button>
        </div>
      </div>
      <div :class="{ 'active': chooseArray[4] }" @click="submitChoose(4);toHome()">
        西瓜视频
      </div>
      <div :class="{ 'active': chooseArray[5] }" @click="submitChoose(5);toHome()">
        财经
      </div>
      <div :class="{ 'active': chooseArray[6] }" @click="submitChoose(6);toHome()">
        科技
      </div>
      <div :class="{ 'active': chooseArray[7] }" @click="submitChoose(7);toHome()">
        {{ chooseContent }}
      </div>
      <div class="drop">
        <button class="dropbutton">更多</button>
        <div class="dropcontent">
          <div
            v-for="(item, index) in content"
            :key="index"
            @click="submitContent(item);submitChoose(7);toHome()"
            :class="{ 'active': chooseArray[7] }"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div>
        <div class="search">
          <input type="text" v-model="searchContent" @keyup.enter="submitSearch"/>
          <!-- <link rel="icon" href="@/assets/images/search.png" /> -->
          <img src="@/assets/images/search.png" @click="submitSearch"/>
        </div>
      </div>
      <div class="drop1" v-if="statu == 1">
        <form>
          <img src="@/assets/images/head.png" />
          {{ namm }}
        </form>
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
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';

export default defineComponent({
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
    let location = ref("北京");
    let isshow2 = ref(false);
    let store = useStore();
    let router = useRouter();
    let finalLocation = computed(() => {
      return store.state.finalLoca;
    });
    //获取用户选择的toper内容
    let chooseArray = computed(() => {
      return store.state.topStatus;
    });
    let submitSite = () => {
      // console.log(1);
      store.commit("changeLoca", location);
      showSite();
    };
    let showSite = () => {
      // console.log(1);
      if (isshow2.value == false) {
        isshow2.value = true;
      } else {
        isshow2.value = false;
      }
      // console.log(isshow.value)
    };
    let chooseContent = computed(() => {
      return store.state.chooseCon;
    });
    //content内容
    let content = computed(() => {
      return store.getters.conten;
    });
    let submitContent = (item) => {
      store.commit("changeContent", item);
    };
    let submitlogout = () => {
      // console.log('点击');
      store.commit("logout");
      router.push({name:'home'});
    };
    let toHome=()=>{
      router.push({name: 'home'});
    };
    let wholetoper = ref();
    onMounted(() => {
      window.addEventListener("click", (e) => {
        if (wholetoper.value && !wholetoper.value.contains(e.target)) {
          isshow2.value = false;
        }
      });
    });
    //更换选择
    let submitChoose = (num) => {
      store.commit("changeChoose", num);
      router.push({name:'home'});
    };
    let searchContent = ref('');
    let submitSearch = () =>{
      searchContent.value = searchContent.value.trim();
      if(searchContent.value == ''){return}
      store.commit("getSearch", searchContent.value);
      // console.log(store.state.searchContent);
      sessionStorage.setItem("searchContent", JSON.stringify(searchContent.value));
      router.push({name: 'search'});
    }; 
    return {
      toHome,
      wholetoper,
      location,
      finalLocation,
      submitSite,
      showSite,
      isshow2,
      chooseContent,
      submitContent,
      content,
      submitlogout,
      chooseArray,
      submitChoose,
      searchContent,
      submitSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  text-align: center;
  font-size: 20px;
}
.topout {
  width: 100%;
  height: 2em;
  border-bottom-style: solid;
  border-bottom-color: white;
  background-color: white;
  position: fixed;
  top: 0%;
  overflow: visible;
}
.top {
  width: 1348px;
  height: 100%;
  margin: auto;
  display: flex;
  // transform: translate(0,50%);
  align-items: flex-start;
  justify-content: space-around;
  // align-content: flex-start;
  *:hover {
    color: lightcoral;
    img {
      opacity: 80%;
      transform: scale(1.2);
    }
  }
}
.reset {
  font-size: 25px;
  font-weight: bold;
  color: red;
}
button {
  background: none;
  border: none;
}
.dropdown {
  overflow: visible;
  height: 100%;
  width: 4em;
}
#dropsite {
  margin-top: 0.8em;
  width: 250%;
  transform: translate(-50%, 0);
  text-align: center;
  select {
    display: block;
    width: 80%;
    margin: auto;
  }
  button {
    background: none;
    // width: 25%;
    display: inline-block;
    margin: 0, 0.5em;
  }
}
.drop {
  width: 3em;
  height: 300%;
  overflow: visible;
  button {
    background-color: lightgray;
    border-radius: 3px;
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
.search {
  background-color: rgb(238, 234, 234);
  border-radius: 4px;
  height: 80%;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.6em;
    background: none;
    border: none;
    outline: none;
    text-align: start;
  }
}
.drop1 {
  width: 5em;
  height: 300%;
  overflow: visible;
  .dropcontent {
    display: none;
  }
}
.drop1:hover {
  .dropcontent {
    margin-top: 0.8em;
    display: flex;
    color: black;
    width: 5em;
    border-style: solid;
    border-color: lightgray;
    a{text-decoration: none;color: black;}
    // transform: translate(-50%,0);
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    :hover {
      color: lightcoral;
    }
  }
}
.bu {
  width: 5em;
  .bu1 {
    text-decoration: none;
    color: white;
    background-color: red;
    border-radius: 3px;
    display: inline-block;
    text-align: center;
    width: 3em;
  }
  .bu1:hover {
    color: grey;
    opacity: 80%;
  }
}
.active{
  text-decoration: underline;
  color: lightcoral;
}
// div {
//   margin: 3pt;
// }
</style>
