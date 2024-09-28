<template>
  <div class="footer-page">
    <div class="div-width">
      <div class="footer-left">
        <div class="logo">
          <a href="/">
            <el-image
              :src="require('@/assets/static/img/index/logo.svg')"
              width="69"
              alt="LOGO"
              fit="contain"
            ></el-image>
          </a>
          <a href="/">
            <el-image
              :src="require('@/assets/static/img/index/Logo AI Design.svg')"
              width="103"
              height="59"
              alt="Logo AI DESIGN"
              fit="contain"
            ></el-image>
          </a>
        </div>
        <div class="describe">
          <p>
            Discover effortless branding with AI Logo, the AI-driven generator
            that crafts customizable logo designs—no design experience required.
          </p>
        </div>
        <div class="icon">
          <div v-for="i in iconList">
            <v-img
              max-width="45"
              max-height="45"
              :src="require(`@/assets/static/img/index/${i}`)"
            ></v-img>
          </div>
        </div>
        <div class="copyright">
          <p>
            Vectors and icons by
            <a href="https://www.svgrepo.com" target="_blank" rel="nofollow"
              >SVG Repo</a
            >
          </p>
          <p>@2024 Copyright AI Desing</p>
        </div>
      </div>
      <div class="footer-right">
        <div class="title-item">
          <ul>
            <li class="item-name" style="color: #6cc551">Product</li>
            <li v-for="item in titleList.Product" :key="item.title">
              <a :href="item.href" :title="item.title"
                ><span>{{ item.title }}</span></a
              >
            </li>
          </ul>
        </div>
        <div class="title-item">
          <ul>
            <li class="item-name" style="color: #ff725e">Company</li>
            <li v-for="item in titleList.Company" :key="item.title">
              <a :href="item.href" :title="item.title"
                ><span>{{ item.title }}</span></a
              >
            </li>
          </ul>
        </div>
        <div class="title-item">
          <ul>
            <li class="item-name" style="color: #5340ff">Support</li>
            <li v-for="item in titleList.Support" :key="item.title">
              <a :href="item.href" :title="item.title"
                ><span>{{ item.title }}</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Contact from "./Contact";

export default {
  name: "Footer",
  props: {
    msg: String,
  },
  components: {
    Contact,
  },
  data() {
    return {
      titleList: {
        Product: [
          { title: "Logo Maker", href: "/generate" },
          { title: "Logo Ideas", href: "/logo-ideas" },
          { title: "Process", href: "/process" },
          { title: "Pricing", href: "/pricing" },
        ],
        Company: [
          { title: "About Us", href: "" },
          { title: "Terms of Use", href: "/terms-of-use#terms" },
          { title: "Privacy Policy", href: "/terms-of-use#privacy" },
          { title: "Refund Policy", href: "/terms-of-use#refund" },
        ],
        Support: [
          { title: "Blog", href: "https://blog.logoaidesign.com" },
          { title: "FAQ", href: "" },
          { title: "Contact Us", href: "/contact-us" },
          { title: "Site Map", href: "/sitemap.xml" },
        ],
      },
      iconList: [
        "icon-1.svg",
        "icon-2.svg",
        "icon-3.svg",
        "icon-4.svg",
        "icon-f.svg",
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/css/variables";
.footer-page {
  padding: 30px;
  overflow: hidden;
  background-color: $bgc-color-2;
  text-align: left;
}
.div-width {
  max-width: $max-width-1;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
}
ul {
  list-style: none;
}
li {
  padding: 10px;
}
a {
  text-decoration: none;
  color: #ffffff;
  font-family: Inter;
  font-weight: Regular;
  font-size: 16px;
}
a:hover {
  color: rgb(94, 86, 246);
  border-bottom: 1px solid rgb(94, 86, 246);
}
.item-name {
  font-family: Inter;
  font-weight: Bold;
  font-size: 18px;
}
.footer-left {
  flex: 4;
  .logo,
  .describe,
  .icon,
  .copyright {
    padding: 10px;
    p {
      color: #ffffff;
      font-size: 20px;
      font-weight: Bold;
    }
  }
}
h1 {
  color: #ffffff;
  margin-left: 20px;
  font-family: Inter;
  font-weight: Bold;
  line-height: 75px;
  font-size: 60px;
}
.describe {
  color: #ffffff;
  max-width: 409px;
  font-family: Inter;
  font-weight: Black Italic;
  line-height: 20px;
  font-size: 16px;
}
.footer-right {
  flex: 6;
  display: flex;

  justify-content: center;
}
.title-item {
  padding: 10px;
  span {
    color: #ffffff;
    cursor: pointer;
  }
  span:hover {
    color: rgb(94, 86, 246);
    border-bottom: 1px solid rgb(94, 86, 246);
  }
}
.icon {
  display: flex;
  div {
    margin-right: 10px;
  }
}
@media screen and (max-width: 768px) {
  .div-width {
    flex-direction: column;
    justify-content: center;
  }
  .footer-right {
    justify-content: center;
  }
  a,
  p {
    font-size: 14px;
  }
}
</style>
