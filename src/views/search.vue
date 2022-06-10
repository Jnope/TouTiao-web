<template>
  <div>
    <div class="top">
      <div><router-link to="/">头条新闻</router-link></div>
      <div>
        <input
          placeholder="请输入"
          v-model="searchContent"
          @keyup.enter="submitSearch"
        />
        <img src="@/assets/images/search.png" @click="submitSearch" />
      </div>
    </div>
    <div class="grid">
      <div class="news">
        <div
          v-for="(item, index) in content"
          :key="index"
          @click="toNews(item.id, item.name)"
          class="singleNews"
        >
          <div class="title">{{ item.title }}</div>
          <div class="info">
            <div>{{ item.name }}</div>
            <div>{{ item.comments.length }}评论</div>
          </div>
        </div>
      </div>
      <body-hot class="right"></body-hot>
    </div>
  </div>
</template>

<script>
import bodyHot from "@/components/body-hot.vue";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';

export default defineComponent({
  components: { bodyHot },
  setup() {
    let store = useStore();
    let router = useRouter();
    let searchContent = ref("");
    if (sessionStorage.getItem("searchContent")) {
      searchContent.value = JSON.parse(sessionStorage.getItem("searchContent"));
      store.commit("getSearch", searchContent.value);
    }
    // console.log(searchContent.value);
    let content = computed(() => {
      return store.getters.searchnews;
    });
    // console.log(content.value);
    let toNews = (a, b) => {
      let iid = parseInt(a);
      //将进入的新闻id和新闻作者提交至sessionStorage
      sessionStorage.setItem("chooseid", JSON.stringify(iid));
      sessionStorage.setItem("choosename", JSON.stringify(b));
      router.push({ name: "singlenews" });
    };
    let submitSearch = () => {
      searchContent.value = searchContent.value.trim();
      if (searchContent.value == "") {
        return;
      }
      store.commit("getSearch", searchContent.value);
      // console.log(store.state.searchContent);
      sessionStorage.setItem(
        "searchContent",
        JSON.stringify(searchContent.value)
      );
    };
    return {
      searchContent,
      content,
      toNews,
      submitSearch,
    };
  },
});
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.top {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom-style: solid;
  border-color: lightgray;
  height: 60px;
  padding: 0 30px;
  background-color: white;
  z-index: 99;
  a {
    text-decoration: none;
    color: lightcoral;
    font-size: 40px;
  }
  input{
    margin-left: 20px;
    font-size: 30px;
  }
  img{
    transform: scale(2);
    margin-left: 20px;
  }
}
.grid {
  position: relative;
  top: 70px;
  display: grid;
  grid-template-columns: auto 670px 300px auto;
  .news{
    grid-column: 2;
    .singleNews{
      margin-bottom: 15px;
    }
    .singleNews:hover{
      cursor: pointer;
    }
    .title{
      font-size: 30px;
    }
    .info{
      display: flex;
      div{
        margin: 5px 20px 0 0;
      }
    }
  }
  .right{
    grid-column: 3;
  }
}
</style>
