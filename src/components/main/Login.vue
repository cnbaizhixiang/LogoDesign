<template>
  <div class="page">
    <v-dialog v-model="isShowLogin" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <div class="login-title">
            {{ showModel }} From
            <div class="div-icon">
              <!-- <svg-icon type="mdi" path="mdiAccount"></svg-icon> -->
              <!-- <v-icon>mdiAccount</v-icon> -->
              <span class="mdi mdi-close" @click="closeLogin"></span>
            </div>
          </div>
        </v-card-title>

        <v-card-text v-if="showModel === 'login'">
          <v-form ref="formLogin" v-model="validLogin" lazy-validation>
            <v-text-field
              v-model="loginForm.email"
              :rules="emailRules"
              label="E-mail"
              @keyup.enter="login"
              required
            ></v-text-field>

            <v-text-field
              v-model="loginForm.pass"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Pass"
              @keyup.enter="login"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-checkbox
              v-model="loginForm.isFreeLogin"
              label="7 days free login"
            ></v-checkbox>
            <p class="warn-info" v-if="is_show_login">{{ info_login }}</p>
            <div class="login-footer">
              <v-btn color="success" class="mr-12" @click="login" :disabled="!validLogin">
                Login
              </v-btn>
              <v-btn color="error" @click="reset"> Reset Form </v-btn>
            </div>
          </v-form>
          <div class="form-footer">
            <div class="div-register" @click="switchModel('register')">
              <div><span class="mdi mdi-chevron-left"></span>REGISTER</div>
              <!-- <span @click="switchModel('reset')">忘记密码</span> -->
            </div>
          </div>
        </v-card-text>

        <v-card-text v-if="showModel === 'register'">
          <v-form ref="formRegister" v-model="validRegister" lazy-validation>
            <v-text-field
              v-model="registerForm.name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="registerForm.email"
              :rules="emailRules"
              label="E-mail"
              required
            >
              <!-- <v-icon
                v-if="timerSeconds === 60"
                class="icon"
                slot="append"
                v-throttle="[sendEmail]"
                :disabled="!canSendEmail"
                >mdi-send-check
              </v-icon>
              <v-btn v-else elevation="2" small disabled slot="append">{{
                `剩余:${timerSeconds}s`
              }}</v-btn> -->
            </v-text-field>

            <v-text-field
              v-model="registerForm.pass"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Create a Password"
              counter
              required
              @click:append="show1 = !show1"
            ></v-text-field>

            <!-- <v-text-field
              v-model="registerForm.code"
              :rules="codeRules"
              label="Verification code"
              required
            ></v-text-field> -->
            <p class="warn-info" v-if="is_show_register">{{ info_register }}</p>
            <div class="login-footer">
              <v-btn
                width="100%"
                color="success"
                class="mr-12"
                @click="register"
                :disabled="!validRegister"
              >
                REGISTER
              </v-btn>
            </div>
          </v-form>
          <div class="form-footer">
            <div class="div-login">
              <div @click="switchModel('login')">
                Login<v-icon slot="append">mdi-chevron-right </v-icon>
              </div>
            </div>
          </div>
        </v-card-text>

        <!-- <v-card-text v-if="showModel === 'reset'">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="resetForm.email"
              :rules="emailRules"
              label="E-mail"
              required
            >
              <v-icon
                v-if="timerSeconds === 60"
                class="icon"
                slot="append"
                v-throttle="[sendEmail]"
                >mdi-send-check
              </v-icon>
              <v-btn v-else elevation="2" small disabled slot="append">{{
                `剩余:${timerSeconds}s`
              }}</v-btn>
            </v-text-field>

            <v-text-field
              v-model="resetForm.pass"
              :rules="passRules"
              label="Create a Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="resetForm.confirmPass"
              :rules="passRules"
              label="confirm Password"
              required
            ></v-text-field>
            <v-text-field
              v-model="resetForm.code"
              :rules="codeRules"
              label="Verification code"
              required
            ></v-text-field>
            <div class="login-footer">
              <v-btn width="100%" color="success" class="mr-12"> RESET PASSWORD </v-btn>
            </div>
          </v-form>
          <div class="form-footer">
            <div class="div-login">
              <div @click="switchModel('login')">
                Login<v-icon slot="append">mdi-chevron-right </v-icon>
              </div>
            </div>
          </div>
        </v-card-text> -->

        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="34"></v-progress-circular>
        </v-overlay>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { sendCaptcha, userRegister, userLogin } from "@/api/login";

export default {
  name: "Login",
  props: {},
  components: {},
  data() {
    return {
      info_login: "",
      is_show_login: false,
      info_register: "",
      is_show_register: false,

      loginForm: {
        email: "",
        pass: "",
        isFreeLogin: false,
      },
      show1: false,
      validLogin: true,
      validRegister: true,

      registerForm: {
        name: "",
        email: "",
        pass: "",
        // code: "",
      },
      resetForm: {
        email: "",
        pass: "",
        confirmPass: "",
        code: "",
      },

      nameRules: [
        (v) => !!v || "name is required",
        (v) => (v && v.length <= 10) || "name must be less than 10 characters",
      ],
      // codeRules: [
      //   (v) => !!v || "code is required",
      //   (v) => (v && v.length <= 10) || "code must be less than 10 characters",
      // ],
      passRules: [
        (v) => !!v || "password is required",
        // (v) => (v && v.length <= 10) || "password must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      timerSeconds: 60,
      showModel: "login",
      loading: false,
      // confirmEmail: "",
    };
  },
  computed: {
    isShowLogin: {
      get() {
        return this.$store.getters.isShowLogin;
      },
      // setter 方法，这里我们不会直接设置 _actualShowLogin，而是实现特定的逻辑
      set(newVal) {
        this.$store.commit("user/SET_IsShowLogin", newVal);
      },
    },
    loginMessage() {
      return this.$store.getters.loginMessage;
    },
    canLogin() {
      return this.loginForm.email && this.loginForm.pass ? false : true;
    },
    canRegister() {
      return this.registerForm.email && this.registerForm.pass ? false : true;
    },
    canSendEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.registerForm.email);
    },
  },
  watch: {
    showLogin(newVal, oldVal) {
      this.$store.commit("user/SET_IsShowLogin", newVal);
    },
  },
  methods: {
    login() {
      this.$refs.formLogin.validate(); // 可以手动触发验

      if (this.validLogin && !this.canLogin) {
        this.is_show_login = false;
        let obj;

        obj = {
          emailAddress: this.loginForm.email,
          password: this.loginForm.pass,
          free: this.loginForm.isFreeLogin,
        };

        this.loading = true;
        this.$store
          .dispatch("user/userLogin", obj)
          .then(() => {
            this.$store.dispatch("user/getInfo").then(() => {
              this.$emit("closeLogin", false);
              this.$store.commit("user/SET_IsShowLogin", false);
              this.$store.commit("user/SET_IsFreeLogin", this.loginForm.isFreeLogin);
            });
          })
          .catch((error) => {
            this.info_login = this.loginMessage;
          })
          .finally(() => {
            this.is_show_login = true;
            this.loading = false;
          });
      }
    },
    register() {
      this.$refs.formRegister.validate(); // 可以手动触发验

      if (this.validRegister && !this.canRegister) {
        this.is_show_register = false;
        this.loading = true;
        let obj = {
          uiName: this.registerForm.name,
          uiEmail: this.registerForm.email,
          uiPassword: this.registerForm.pass,
        };
        userRegister(obj)
          .then((response) => {
            this.loading = false;
            this.$my_message({
              content: "注册成功!",
              type: "success",
            });
            this.$store.dispatch("user/getInfo").then(() => {
              this.$emit("closeLogin", false);
              this.$store.commit("user/SET_IsShowLogin", false);
            });
          })
          .catch((error) => {
            this.info_register = this.loginMessage;
          })
          .finally(() => {
            this.is_show_register = true;
            this.loading = false;
          });
      }
    },

    // sendEmail() {
    //   let obj = {
    //     emailAddress: this.registerForm.email,
    //   };

    //   this.loading = true;
    //   sendCaptcha(obj)
    //     .then((response) => {
    //       this.confirmEmail = this.registerForm.email;
    //       this.$my_message({
    //         content: "发送成功!",
    //         type: "success",
    //       });
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //       let timer = setInterval(() => {
    //         if (this.timerSeconds > 0) {
    //           this.timerSeconds--;
    //         } else {
    //           clearInterval(timer);
    //           this.timerSeconds = 60;
    //         }
    //       }, 1000);
    //     });
    // },
    switchModel(value) {
      this.showModel = value;
    },
    closeLogin() {
      this.$store.commit("user/SET_IsShowLogin", false);
      this.$emit("closeLogin");
    },
    reset() {
      this.$refs.formLogin.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  max-width: 350px;
  overflow: hidden;
}
.login-title {
  .div-icon {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 15px;
  }
}
.div-register,
.div-login {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  color: #5e56f6;
  cursor: pointer;
}
.form-footer {
}
.icon {
  cursor: pointer;
}
.warn-info {
  color: #ff5252;
}
.switchLogin {
  display: flex;
  justify-content: space-between;

  p {
    cursor: pointer;
    font-size: 13px;
  }
  .right {
    color: #333333;
  }
  .left {
    color: #5e56f6;
  }
}

.login-footer {
  @include flex();
}
</style>
