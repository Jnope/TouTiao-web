<template>
  <div class="bodyaccount">
    <div v-if="statu == 0" class="sign">
      <form>
        登录后更精彩<br />
        <button><router-link to="/sign">立即登录</router-link></button>
      </form>
    </div>
    <div v-else class="names">
      <div class="name">
        <router-link to="/user">
          <img src="@/assets/images/head.png" />
          <span>{{ namm }}</span>
          <img src="@/assets/images/right.png" />
        </router-link>
      </div>
      <div class="info">
        <router-link to="/user">
          <div>{{ elseforma[0] }}<br />获赞</div>
          <div>{{ elseforma[1] }}<br />粉丝</div>
          <div>{{ elseforma[2] }}<br />关注</div>
        </router-link>
      </div>
      <div class="link">
        <div><img src="@/assets/images/paper.png" /><br />写文章</div>
        <div><img src="@/assets/images/chat.png" /><br />发微头条</div>
        <div><img src="@/assets/images/answer.png" /><br />写回答</div>
        <div><img src="@/assets/images/video.png" /><br />发视频</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    statu: {
      type: Number,
      required: true,
    },
  },
  emits: ["submitout"],
  setup() {
    let store = useStore();
    let router = useRouter();
    let statu = computed(() => {
      return store.getters.stat;
    });
    let namm = computed(() => {
      return store.getters.nam;
    });
    let elseforma = computed(() => {
      return store.getters.userelse;
    });
    return {
      statu,
      namm,
      elseforma,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.bodyaccount {
  background-color: wheat;
  border-radius: 10px;
  margin-top: 5px;
  position: relative;
}
.sign {
  width: 100%;
  text-align: center;
  font-size: 20px;
  position: absolute;
  top: 50%;
  transform: translate(0, -20%);
  button {
    background-color: red;
    font-size: 20px;
    border-radius: 10px;
    width: 7em;
    height: 2em;
    margin-top: 5px;
    a {
      text-decoration: none;
      color: white;
    }
    a:hover {
      opacity: 60%;
    }
  }
}
.names {
  .name {
    a {
      text-decoration: none;
      color: black;
    }
    margin: 5px 10px;
    font-size: 20px;
    span {
      margin-left: 5px;
    }
    img {
      transform: scale(1.2);
    }
  }
  .name:hover {
    cursor: pointer;
  }
}
.info {
  a {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
    font-size: 20px;
  }
  div {
    text-align: center;
    background-color: white;
    border-radius: 5px;
    width: 3em;
    padding: 5px 0;
  }
}
.link {
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  background-color: white;
  border-radius: 5px;
  div {
    text-align: center;
    padding: 5px 5px;
  }
}
</style>
