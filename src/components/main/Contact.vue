<template>
  <div class="page">
    <v-dialog v-model="isShowContact" persistent max-width="800px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <div class="login-title">
            Contact From
            <div class="div-icon">
              <span class="mdi mdi-close" @click="closeContact"></span>
            </div>
          </div>
        </v-card-title>

        <v-card-text>
          Hi👏，we are here to help. Please take a look at our FAQs and contact
          us if you need additional help.
        </v-card-text>
        <v-card-text> 👉 Where is my receipt/invoice? </v-card-text>
        <v-card-text>
          After making your purchase, you can download your invoice (with your
          company info) from your logo download center.
        </v-card-text>
        <v-card-text>
          👉 Can I make changes to my logo after purchase?
        </v-card-text>
        <v-card-text>
          Yes. Click on the [Edit] button from your logo download center to
          modify the logo. Logo name and symbol can be changed within 3 days of
          your purchase, everything else can be changed forever.
        </v-card-text>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="ruleForm.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="ruleForm.email"
              label="E-mail"
              :rules="emailRules"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="ruleForm.subject"
              label="Subject"
              required
            ></v-text-field>
            <v-textarea
              outlined
              label="Message"
              :rules="messageRules"
              v-model="ruleForm.message"
            ></v-textarea>

            <div class="login-footer">
              <v-btn
                width="200"
                color="success"
                class="mr-12"
                @click="submitForm"
                :disabled="canSubmit"
              >
                Submit Form
              </v-btn>
            </div>
          </v-form>
        </v-card-text>

        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { sendEmail } from "@/api/user_email";
export default {
  name: "Contact",
  props: {
    isShowContact: Boolean,
  },
  data() {
    return {
      loading: false,
      ruleForm: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      messageRules: [(v) => !!v || "Message is required"],
    };
  },
  computed: {
    canSubmit() {
      return this.ruleForm.email &&
        this.ruleForm.name &&
        this.ruleForm.subject &&
        this.ruleForm.message
        ? false
        : true;
    },
  },
  watch: {},
  methods: {
    closeContact() {
      this.$emit("closeContact", false);
    },
    submitForm() {
      this.loading = true;
      let data = {
        userName: this.ruleForm.name,
        emailAddress: this.ruleForm.email,
        subject: this.ruleForm.subject,
        submitMessage: this.ruleForm.message,
      };

      sendEmail(data)
        .then((response) => {
          this.ruleForm = {};
          this.$my_message({
            content: "发送成功!",
            type: "success",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.page {
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
.login-footer {
  display: flex;
  justify-content: center;
}
</style>
