<template>
  <div>
    <!-- toper内有props,这里需要重新传值 -->
    <toper class="toper" :statu="statu" :namm="namm"></toper>
    <div class="bodys">
      <div class="left">
        <div class="head">
          <img src="@/assets/images/bighead.png" />
          <div>
            <div class="name">{{ namm }}</div>
            <div class="info">
              <div>{{ elseforma[0] }} 获赞</div>
              <div @click="changeistrue3(1)" ref="fansreffather1">{{ elseforma[1] }} 粉丝</div>
              <div @click="changeistrue3(2)" ref="fansreffather2">{{ elseforma[2] }} 关注</div>
            </div>
          </div>
        </div>
        <div class="choose">
          <div @click="changeShow(0)" :class="{ choosed: istrue1 }">全部</div>
          <div @click="changeShow(1)" :class="{ choosed: istrue2 }">收藏</div>
          <div v-show="isshow4" class="img"><input/></div>
          <div class="img" @click="changesearch"><img src="@/assets/images/search.png" /></div>
        </div>
        <div class="shownews">
          <div v-for="(item, index) in allUserNews" :key="index" class="out">
            <div class="title" @click="toNews(item.id, item.name)">{{ item.title }}</div>
            <div class="under">共{{ item.comments.length }}评论</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>2022 今日头条</div>
        <div>
          <a href="https://www.shdf.gov.cn/shdf/channels/740.html"
            >扫黄打非网上举报</a
          >
        </div>
        <div>
          <a href="https://www.piyao.org.cn/yybgt/index.htm"
            >网络谣言曝光平台</a
          >
        </div>
        <div><a href="https://www.12377.cn/">网上有害信息举报</a></div>
        <div>未成年人相关举报：xxx-xxx-xxxx</div>
        <div><a href="https://tsm.miit.gov.cn/dxxzsp/">京ICP证140141号</a></div>
        <div>
          <a href="https://beian.miit.gov.cn/#/"
            >京ICP备12025439号-3 网络文化经营许可证</a
          >
        </div>
        <div>
          <a href="https://www.toutiao.com/business_license/">营业执照</a>
        </div>
        <div>京-非经营性-2016-0081</div>
        <div>互联网药品信息服务资格证书</div>
        <div>
          <a href="https://www.toutiao.com/article/3642705768/"
            >跟帖评论自律管理承诺书</a
          >
        </div>
        <div>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002002023"
            >京公网安备 11000002002023号</a
          >
        </div>
      </div>
    </div>
    <div v-show="istrue3" class="showFansFocus" ref="fansref">
      <div class="flexbox">
        <div :class="{'choosed': istrue4}" @click="changeistrue3(1)">粉丝</div>
        <div :class="{'choosed': istrue5}" @click="changeistrue3(2)">关注</div>
        <div class="close" @click="closeFansFocus"><img src="@/assets/images/close.png"></div>
      </div>
      <div v-if="istrue4">
          <div v-for="(item, index) in elseinfo[0]" :key="index">{{item}}</div>
      </div>
      <div v-else>
        <div v-for="(item, index) in elseinfo[1]" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted, onUnmounted } from "vue";
import toper from "@/components/toper.vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';

export default defineComponent({
  components: { toper },
  setup() {
    let store = useStore();
    let router = useRouter();
    //获取用户状态、信息
    let statu = computed(() => {
      return store.getters.stat;
    });
    let namm = computed(() => {
      return store.getters.nam;
    });
    let elseforma = computed(() => {
      return store.getters.userelse;
    });
    let elseinfo = computed(()=>{
      return store.getters.userelseinfo;
    })
    // console.log(elseinfo);
    let istrue1 = ref(true);
    let istrue2 = ref(false);
    let isshow4 = ref(false);
    let changesearch = ()=>{
      if( !isshow4.value){
        isshow4.value = true
      }else{
        isshow4.value = false
      }
    };
    //提交显示内容的更改
    let changeShow = (a) => {
      if (a == 0) {
        store.commit("changeUserChoose", 0);
        istrue2.value = false;
        istrue1.value = true;
      } else {
        store.commit("changeUserChoose", 1);
        istrue1.value = false;
        istrue2.value = true;
      }
    };
    let istrue3 = ref(false);
    let istrue4 = ref(false);
    let istrue5 = ref(false);
    //更改右侧信息栏的显隐
    let changeistrue3 = (a) =>{
      istrue3.value = true;
      if(a ==1){
        istrue4.value = true;
        istrue5.value = false;
      }else{
        istrue5.value = true;
        istrue4.value = false;
      }
      // console.log([istrue3,istrue4,istrue5]);
    };
    let closeFansFocus =()=>{
      istrue3.value = false;
    };
    //跳转路由
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
    //获取要展示的内容
    let allUserNews = computed(() => {
      return store.getters.userNews;
    });
    // console.log(allUserNews);
    let fansref= ref();
    let fansreffather1 = ref();
    let fansreffather2 = ref();
    onMounted(()=>{
      window.addEventListener('click',(e)=>{
        if (!fansreffather1.value.contains(e.target) && 
        !fansreffather2.value.contains(e.target) && 
        !fansref.value.contains(e.target)) {
          istrue3.value = false;
        }
      });
      window.addEventListener('beforeunload', ()=>{
        sessionStorage.setItem('store', JSON.stringify(store.state))
      });
    });
    onUnmounted(()=>{
      window.removeEventListener('click',(e)=>{
        if (!fansreffather1.value.contains(e.target) && 
        !fansreffather2.value.contains(e.target) && 
        !fansref.value.contains(e.target)) {
          istrue3.value = false;
        }
      });
      window.removeEventListener('beforeunload', ()=>{
        sessionStorage.setItem('store', JSON.stringify(store.state))
      });
    });
    return {
      namm,
      statu,
      elseforma,
      changeShow,
      changeistrue3,
      closeFansFocus,
      allUserNews,
      istrue1,
      istrue2,
      istrue3,
      istrue4,
      istrue5,
      isshow4,
      changesearch,
      elseinfo,
      fansref,
      fansreffather1,
      fansreffather2,
      toNews,
    };
  },
});
</script>

<style lang="scss" scoped>
.toper {
  position: fixed;
  z-index: 500;
}
.bodys {
  position: relative;
  top: 40px;
  display: grid;
  grid-template-columns: auto 670px 300px auto;
  .left {
    grid-column: 2;
    display: grid;
    grid-template-rows: 150px 40px auto;
    .head {
      grid-row: 1;
      display: flex;
      align-items: center;
      div {
        margin-left: 40px;
        width: 300px;
        .name {
          font-size: 30px;
          margin: 0;
        }
        .info {
          margin: 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          div {
            margin: 0;
          }
          div:hover{
            cursor: pointer;
          }
        }
      }
    }
    .choose {
      grid-row: 2;
      display: flex;
      align-items: center;
      div {
        font-size: 20px;
        width: 4em;
      }
      div:hover {
        cursor: pointer;
      }
      .img {
        margin-left: auto;
      }
      .choosed {
        color: lightcoral;
        text-decoration: underline;
      }
    }
    .shownews {
      grid-row: 3;
      .out{
        margin: 10px 0;
        .title{
          font-size: 25px;
          margin-bottom: 5px;
        }
        .title:hover{
          cursor: pointer;
        }
        .under{
          font-size: 15px;
          color: grey;
        }
      }
    }
  }
  .right {
    grid-column: 3;
    position: relative;
    top: 150px;
    font-size: 15px;
    color: grey;
    a{
      text-decoration: none;
      color: grey;
    }
    a:hover{
      cursor: pointer;
    }
  }
}
.showFansFocus{
  position: fixed;
  top: 40px;
  right: 10px;
  background-color: white;
  border-style: solid;
  z-index: 100;
  width: 200px;
  height: 100vh;
  .flexbox{
    display: flex;
    .close{
      margin-left: auto;
    }
    div{
      width: 3em;
    }
    div:hover{
      cursor: pointer;
    }
  }
  .choosed{
    text-decoration: underline;
    color: lightcoral;
  }
}
</style>
