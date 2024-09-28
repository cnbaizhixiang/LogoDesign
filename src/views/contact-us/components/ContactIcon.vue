<template>
  <div class="page-contact">
    <div class="contact-list">
      <div class="contact-item" v-for="i in list" @click="goToHref(i.href)">
        <p>{{ i.name }}</p>

        <div class="contact-img">
          <!-- <v-img :src="i.url" contain></v-img> -->

          <el-image
            :src="require(`@/assets/static/img/contact-us/${i.url}`)"
            :alt="i.name"
            fit="contain"
          ></el-image>
        </div>
      </div>
    </div>

    <Contact
      :isShowContact="isShowContact"
      @closeContact="showContact"
    ></Contact>
  </div>
</template>

<script>
import Contact from "@/components/main/Contact";
export default {
  props: {},
  components: {
    Contact,
  },
  data() {
    return {
      isShowContact: false,
      list: [
        { name: "Logo Ideas", url: "logo-ideas.svg", href: "/logo-ideas" },
        { name: "About Us", url: "about-us.svg", href: "/logo-ideas" },
        { name: "Blog", url: "blog.svg", href: "" },
        { name: "Process", url: "process.svg", href: "/process" },
        { name: "Term OF Use", url: "terms.svg", href: "/terms-of-use" },
        { name: "FAQ", url: "faq.svg", href: "" },
        { name: "Pricing", url: "pricing.svg", href: "/pricing" },
        { name: "Privacy Policy", url: "privacy-policy.svg", href: "privacy" },
        { name: "Contact Us", url: "contact-us.svg", href: "contact" },
        { name: "About Us", url: "about-us.svg", href: "" },
        { name: "Refund Policy", url: "refund-policy.svg", href: "refund" },
        { name: "Site Map", url: "site-map.svg", href: "" },
      ],
    };
  },

  mounted() {},

  methods: {
    showContact(value) {
      this.isShowContact = value;
    },
    goToHref(href) {
      if (href === "contact") {
        this.isShowContact = true;
        return;
      }
      if (href === "privacy") {
        this.$router.push(`/terms-of-use`).then(() => {
          window.scrollTo(0, 0);
          const element = document.getElementById("privacy");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
        return;
      }
      if (href === "refund") {
        this.$router.push(`/terms-of-use`).then(() => {
          window.scrollTo(0, 0);
          const element = document.getElementById("refund");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
        return;
      }

      this.$router.push(`${href}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
@font-face {
  font-family: "KoHo"; /* 你可以自定义这个字体名称 */
  src: url("@/assets/static/fonts/KoHo-SemiBold.ttf") format("truetype"); /* TTF格式，作为备选 */
  font-weight: normal; /* 根据你的字体文件来设置 */
  font-style: normal; /* 根据你的字体文件来设置 */
}

.page-contact {
  text-align: center;
  max-width: $max-width-1;
  margin: auto;
  padding: 20px;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #000000;
}
.contact-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.contact-img {
  width: 180px;
  height: 180px;
}
.contact-item {
  width: 300px;
  height: 300px;
  cursor: pointer;
  overflow: hidden;
  background-color: #ffffff;
  margin: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: $shadow-default;

  p {
    font-size: 36px;

    font-family: "KoHo";
  }
}

.contact-img {
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .contact-item {
    width: 35vw;
    height: 120px;
    p {
      font-size: 1rem;
    }
  }
  .contact-img {
    width: 40px;
    height: 40px;
  }
}
</style>
