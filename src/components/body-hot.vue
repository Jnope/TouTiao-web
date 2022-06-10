<template>
  <div>
    <div class="up">
      <div class="introduce">
        <div>
          <img src="@/assets/images/hot.png" />
          <span>头条热榜</span>
        </div>
        <div class="change">
          <img src="@/assets/images/switch.png" />
          <span>换一换</span>
        </div>
      </div>
      <div
        v-for="(item, index) in hots"
        :key="index"
        class="news"
        @click="toNews(item.id, item.name)"
      >
        {{ index + 1 }}. {{ item.title }}
      </div>
    </div>
    <div class="middle">
      <div class="introduce">
        <div>
          <img src="@/assets/images/hot.png" />
          <span>热门视频</span>
        </div>
        <div class="change">
          <img src="@/assets/images/switch.png" />
          <span>换一换</span>
        </div>
      </div>
      <div v-for="(item, index) in videos" :key="index" class="news" @click="toNews(item.id, item.name)">
        {{ index + 1 }}. {{ item.title }}
      </div>
    </div>
    <div class="bottom">
      <div>2022 今日头条</div>
      <div>
        <a href="https://www.shdf.gov.cn/shdf/channels/740.html"
          >扫黄打非网上举报</a
        >
      </div>
      <div>
        <a href="https://www.piyao.org.cn/yybgt/index.htm">网络谣言曝光平台</a>
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
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';

export default defineComponent({
  setup() {
    let store = useStore();
    let router = useRouter();
    let hots = computed(() => {
      return store.getters.hotnews;
    });
    let videos = computed(() => {
      return store.getters.hotvideo;
    });
    let toNews = (a, b) => {
      let iid = parseInt(a);
      // console.log(a,b);
      // store.commit("chooseidnews", iid);
      // store.commit("chooseidallnews", b);
      //将进入的新闻id和新闻作者提交至sessionStorage
      sessionStorage.setItem("chooseid", JSON.stringify(iid));
      sessionStorage.setItem("choosename", JSON.stringify(b));
      router.push({ name: "singlenews" });
    };
    return {
      hots,
      videos,
      toNews,
    };
  },
});
</script>

<style lang="scss" scoped>
.up {
  font-size: 20px;
  margin: 10px 0;
}
.middle {
  font-size: 20px;
  margin: 10px 0;
}
.bottom {
  font-size: 10px;
  color: grey;
  div {
    margin: 5px 0;
  }
  a {
    text-decoration: none;
    color: grey;
  }
}
.introduce {
  display: flex;
  justify-content: space-between;
  .change:hover {
    cursor: pointer;
  }
}
.news:hover{
    cursor: pointer;
}
</style>
