<template>
  <div class="login-body">
    <el-row
      type="flex"
      class="row-bg"
      justify="center"
      align="middle"
      style="height: 100%"
    >
      <el-col :xs="18" :sm="18" :md="6">
        <div class="login-box">
          <el-image class="login-bg" :src="loginbg"></el-image>
          <div class="login">
            <el-form
              class="login-form"
              ref="formRef"
              :model="form"
              label-width="80px"
              label-position="left"
              @submit.prevent
            >
              <el-form-item label-width="50px" prop="username">
                <template #label>
                  <div class="loginIcon">
                    <i class="ri-user-fill"></i>
                  </div>
                </template>
                <el-input
                  v-model="form.username"
                  :placeholder="$t('login.usernamePlaceholder')"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="50px" prop="password">
                <template #label>
                  <div class="loginIcon">
                    <i class="ri-lock-fill"></i>
                  </div>
                </template>
                <el-input
                  show-password
                  v-model="form.password"
                  :placeholder="$t('login.passwordPlaceholder')"
                ></el-input>
              </el-form-item>
              <el-button class="loginbtn" type="primary" @click="onSubmit">{{
                $t("login.loginBtn")
              }}</el-button>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { login } from "@/api";
import { ElMessage } from "element-plus";
import loginbg from "@/assets/images/loginbg.png";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const formRef = ref();
    const form = reactive({
      username: "admin",
      password: "123456",
    });
    const onSubmit = () => {
      if (!form.username.trim()) {
        return ElMessage(t("login.usernamePlaceholder"));
      }
      if (!form.password.trim()) {
        return ElMessage(t("login.passwordPlaceholder"));
      }
      login(form).then((res) => {
        if (res.code == 1) {
          store.dispatch("user/loginSet", res.data);
          store.dispatch("app/refTabs");
          router.push("dashboard");
        } else {
          ElMessage.error(res.message)
        }
      });
    };
    return {
      formRef,
      loginbg,
      form,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-body {
  position: relative;
  height: 100%;
  width: 100%;
}
.login-box {
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  .login-bg {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .login {
    display: flex;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    .login-form {
      width: 100%;
      .loginIcon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid #e6e6e6;
        width: 30px;
        height: 30px;
        border-radius: 4px;
      }
      .loginbtn {
        width: 100%;
      }
    }
  }
}
</style>
