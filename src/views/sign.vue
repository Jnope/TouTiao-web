<template>
  <div class="logbox">
    <form>
      <label>
        用户名：
        <input type="text" v-model="userna" placeholder="请输入用户名" />
      </label>
      <label>
        密码：
        <input type="password" v-model="passwo" placeholder="请输入密码" />
      </label>
      <div class="but">
        <button @click="login(userna, passwo)">登录</button>
        <button @click="register(userna, passwo)">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let store = useStore();
    // 获取用户信息的对象数组
    let users = computed(() => {
      return store.state.user;
    });
    let router = useRouter();
    let userna = ref("");
    let passwo = ref("");
    let login = (userna, passwo) => {
      store.commit("signin", [userna, passwo]);
    };
    let register = (userna, passwo) => {
      store.commit("signup", { name: userna, pass: passwo, status: 1 });
    };
    onMounted(() => {
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(store.state));
      });
    });
    //卸载监听
    onUnmounted(() => {
      window.removeEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(store.state));
      });
    });
    return {
      userna,
      passwo,
      login,
      register,
    };
  },
});
</script>

<style lang="scss" scoped>
.logbox {
  width: 350px;
  height: 130px;
  padding: 20px;
  background: #eeeeee;
  border-radius: 5px;
  margin: auto;
  text-align: center;
  font-size: 20px;
}
form {
  text-align: center;
  label {
    display: block;
    font-size: 20px;
    margin: 10px 0 0 0;
    input {
      width: 200px;
      height: 30px;
      float: right;
    }
  }
}
.but {
  width: 60%;
  margin: auto;
  height: 30px;
  padding: 5px, 0;
  display: flex;
  justify-content: space-around;
  button {
    font-size: 20px;
    width: 60px;
    height: 30px;
    margin-top: 10px;
    border-radius: 5px;
  }
  button:hover {
    color: lightcoral;
  }
}
</style>
