<template>
  <div>
    <toper id="toper" :statu="statu" :namm="namm" v-show="isShow"></toper>
    <back-head :statu="statu" :namm="namm" @submitout="submitout"></back-head>
    <div id="body">
      <body-news class="body1"></body-news>
      <div class="body2">
        <body-account :statu="statu" @submitout="submitout" class="account"></body-account>
        <body-hot class="hots"></body-hot>
      </div>
    </div>
    <foot id="foot"></foot>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import foot from "@/components/foot.vue";
import backHead from "@/components/back-head.vue";
import toper from "@/components/toper.vue";
import BodyAccount from "@/components/body-account.vue";
import BodyHot from '@/components/body-hot.vue';
import { useStore } from "vuex";
import BodyNews from "@/components/body-news.vue";

export default defineComponent({
  components: {
    foot,
    backHead,
    toper,
    BodyAccount,
    BodyHot,
    BodyNews,
  },
  setup() {
    let store = useStore();
    // console.log(users);
    let statu = computed(() => {
      return store.getters.stat;
    });
    // console.log(statu);
    let namm = computed(() => {
      return store.getters.nam;
    });
    let submitout = () => {
      store.commit("logout");
      // console.log('退出');
    };
    // console.log(namm);
    //页面滚动过header高度后显示toper
    let isShow = ref(false);
    let scollTop = ref(0);
    //获取屏幕高度的一半，是header高度
    let scollHeight = window.innerHeight / 2;
    // console.log(scollHeight);
    // console.log(window.innerWidth);
    let windowScoll = () => {
      //获取滚动的高度
      scollTop.value = document.documentElement.scrollTop;
      // console.log(scollTop);
    };
    if(sessionStorage.getItem('store')){
      store.replaceState(Object.assign({},store.state,JSON.parse(sessionStorage.getItem('store'))));
      // console.log('home');
    }
    watch(scollTop, (newVal, oldVal) => {
      if (newVal > scollHeight) {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    });
    onMounted(() => {
      //添加滚动事件
      window.addEventListener("scroll", windowScoll);
      //或以下也可
      // window.addEventListener("scroll", () => {
      //   //获取滚动的高度
      //   scollTop.value = parseInt(document.documentElement.scrollTop);
      //   // console.log(scollTop);
      // });
      //或者以下也可以
      // window.onscroll=()=>{
      //   //获取滚动的高度
      //   scollTop.value = parseInt(document.documentElement.scrollTop);
      // }

      //刷新时保存store——有效
      window.addEventListener('beforeunload', ()=>{
        sessionStorage.setItem('store', JSON.stringify(store.state));
      });
    });
    //卸载监听
    onBeforeUnmount(() => {
      //离开页面时
      // console.log(1);
      sessionStorage.setItem('store', JSON.stringify(store.state));
      window.removeEventListener("scroll", windowScoll);
    });
    onUnmounted(()=>{
      window.removeEventListener("scroll", windowScoll);
      window.removeEventListener('beforeunload',()=>{
        sessionStorage.setItem('store', JSON.stringify(store.state));
      });
    })
    return {
      // logu,
      store,
      namm,
      statu,
      submitout,
      isShow,
      scollTop,
      scollHeight,
    };
  },
});
</script>

<style lang="scss" scoped>
#toper{
  z-index: 1000;
}
#body{
  display: grid;
  grid-template-columns: auto 670px 300px auto;
  grid-template-rows: auto 40px;
  margin: auto;
  .body1{
    z-index: 800;
    grid-column: 2;
    grid-row: 1;
  }
  .body2{
    z-index: 700;
    grid-column: 3;
    grid-row: 1;
    margin-left: 30px;
    display: grid;
    grid-template-rows: 200px auto;
    .account{
      grid-row: 1;
    }
    .hots{
      grid-row: 2;
    }
  }
}
#foot{
  z-index: 900;
}
</style>
