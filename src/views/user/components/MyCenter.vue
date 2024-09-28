<template>
  <div class="page">
    <div class="user-info div-width">
      <v-row>
        <v-col cols="12" md="1" class="avatar-row">
          <v-avatar size="56">
            <img :src="userInfo.avatar" width="60" height="60" alt="avatar" />
          </v-avatar>

          <v-file-input
            class="avatar-input"
            hide-input
            accept="image/*"
            @change="uploadFile"
            truncate-length="15"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="userInfo.name"
            :rules="[rules.required]"
            label="User Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <p v-throttle="[updateName]">Change</p>
        </v-col>
        <v-col cols="12" md="1">
          <v-img
            :src="require(`@/assets/static/img/home/user_email.svg`)"
            contain
            width="60"
            height="60"
          ></v-img>
          <span class="valid-text" v-if="!userInfo.isAuth" @click="isValidEmail = true"
            >(Unverified)</span
          >
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="userInfo.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <p v-throttle="[updateEmail]">Change</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="1">
          <v-img
            :src="require(`@/assets/static/img/home/user_password.svg`)"
            contain
            width="60"
            height="60"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="userInfo.password"
            label="Password"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <p v-throttle="[updatePassword]">Change</p>
        </v-col>

        <v-col cols="12" md="1">
          <v-img
            :src="require(`@/assets/static/img/home/user_card.svg`)"
            contain
            width="60"
            height="60"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            readonly
            disabled
            prefix="$"
            label="Credits"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="1">
          <v-img
            :src="require(`@/assets/static/img/home/user_info.svg`)"
            contain
            width="60"
            height="60"
          ></v-img>
        </v-col>
        <v-col cols="12" md="10">
          <v-textarea
            solo
            v-model="userInfo.message"
            name="input-7-4"
            label="Solo textarea"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="1">
          <p @click="updateUserMessage">Change</p>
        </v-col>
      </v-row>

      <!-- <v-overlay  :value="true">
        <v-progress-circular indeterminate size="34"></v-progress-circular>
      </v-overlay> -->
    </div>
    <div class="div-width flex-right">
      <v-dialog v-model="showDelete" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div class="delete-btn" v-bind="attrs" v-on="on">
            <span>Delete Account</span>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-h5"> Delete Account? </v-card-title>
          <v-card-text
            >Deleting your account will delete all relevant information, so please proceed
            with caution!</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="deleteAccount"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-dialog v-model="isValidEmail" width="500">
      <v-card>
        <v-card-title class="text-h5"> Email Verification? </v-card-title>
        <v-card-text
          >Please verify your email address {{ userInfo.email }} in order to
          proceed.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="sendEmail" :loading="emailLoading">
            Send Verification Email</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  updateUserAvatar,
  updateUserName,
  UpdateUserPassword,
  UpdateUserMessage,
  getUserAuthen,
  UpdateUserEmail,
  deleteUser,
} from "@/api/user";

export default {
  name: "MyCenter",
  metaInfo: {
    title: "Logo AI Design",
    titleTemplate: "My Home-LogoAIDesign.com",
  },
  props: {},
  components: {},
  data() {
    return {
      showDelete: false,
      isValidEmail: false,
      emailLoading: false,
      showPassword: false,
      userInfo: {
        avatar: "",
        email: "",
        name: "",
        isAuth: true,
        password: "",
        message: "",
      },
      initalName: "",
      initalEmail: "",
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  created() {
    this.$store.dispatch("user/getInfo").then(() => {
      this.userInfo = this.$store.getters.info;
      this.initalName = this.userInfo.name;
      this.initalEmail = this.userInfo.email;
    });
  },
  mounted() {},

  computed: {
    info() {
      return this.$store.getters.info;
    },
  },

  methods: {
    deleteAccount() {
      deleteUser()
        .then((res) => {
          this.$my_message({
            content: "注销成功!",
            type: "success",
          });
          this.$store.dispatch("user/getInfo").then(() => {});
        })
        .finally(() => {
          this.showDelete = false;
        });
    },
    uploadFile(file) {
      let formData = new FormData();
      formData.append("image", file);
      var reader = new FileReader();

      reader.onload = (e) => {
        this.userInfo.avatar = e.target.result;
      };

      reader.readAsDataURL(file);

      updateUserAvatar(formData).then((res) => {
        this.$store.dispatch("user/getInfo");

        this.$my_message({
          content: "更换成功!",
          type: "success",
        });
      });
    },

    sendEmail() {
      this.emailLoading = true;
      getUserAuthen()
        .then(() => {
          this.$my_message({
            content: "请前往邮箱验证!",
            type: "success",
          });
          this.isValidEmail = false;
        })
        .catch(() => {})
        .finally(() => {
          this.emailLoading = false;
        });
    },
    updateName() {
      if (this.initalName === this.userInfo.name) {
        this.$my_message({
          content: "修改前后一致!",
          type: "warning",
        });
        return;
      }
      updateUserName(this.userInfo.name).then((res) => {
        (this.initalName = this.userInfo.name),
          this.$my_message({
            content: "修改成功!",
            type: "success",
          });
      });
    },
    updatePassword() {
      UpdateUserPassword(this.userInfo.password).then((res) => {
        this.userInfo.password = "";
        this.$my_message({
          content: "修改成功!",
          type: "success",
        });
      });
    },
    updateUserMessage() {
      UpdateUserMessage(this.userInfo.message).then(() => {
        this.$my_message({
          content: "修改成功!",
          type: "success",
        });
      });
    },
    updateEmail() {
      if (this.initalEmail === this.userInfo.email) {
        this.$my_message({
          content: "修改前后一致!",
          type: "warning",
        });
        return;
      }
      UpdateUserEmail(this.userInfo.email).then(() => {
        this.initalEmail = this.userInfo.email;

        this.$my_message({
          content: "修改成功!",
          type: "success",
        });

        this.$store.dispatch("user/getInfo").then(() => {
          this.userInfo = this.$store.getters.info;
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
  margin: 20px;
}
.user-info {
  @include border(#c4c4c4);
  padding: 30px;
  position: relative;
}
.div-width {
  max-width: 1338px;
  margin: auto;
}
.flex-right {
  display: flex;
  justify-content: flex-end;
}
.delete-btn {
  margin-top: 20px;
  background-color: #d9d9d9;
  padding: 15px;
  max-width: 222px;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;
  span {
    font-size: 22px;
    color: #ff0404;
  }
}
P {
  font-weight: Bold;
  line-height: 3;
  cursor: pointer;
}
.avatar-row {
  display: flex;
  position: relative;
}
.avatar-input {
  position: absolute;
  right: -5px;
  top: -5px;
}
.valid-text {
  color: red;
  cursor: pointer;
}
</style>
