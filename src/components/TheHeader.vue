<template>
  <header>
    <div v-if="$apollo.queries.headerTop.loading"><div class="loader"></div></div>
    <div class="header-top-bar-wrapper">
      <div class="mobile-item" v-for="item in headerTop.items" :key="item">
        <div v-html="item.content"></div>
      </div>
      <div class="desktop-item" v-for="item in headerTop.items" :key="item">
        <div v-html="item.content"></div>
      </div>
    </div>
    <div class="header-desktop">
      <div class="header-items">
        <div class="header-top">
          <div class="logo">
            <img @click="logoClicked($event)" :src="config.base_media_url + 'logo/' + config.header_logo_src" alt="">
          </div>
          <div class="search">
            <div class="search-bar">
              <input type="text" placeholder="Search COOLRIVER…">
              <button class="icon blue-button">
                <img src="../assets/search_icon.png" alt="">
              </button>
            </div>
          </div>
          <div class="contact">
            <div class="" v-for="item in headerContact.items" :key="item">
              <div v-html="item.content"></div>
            </div>
          </div>
        </div>
        <div class="header-bottom">
          <MenuNavigation />
          <div class="navigation-links">
            <div class="account"><a href="/customer/account/login"><img src="../assets/account_icon.png" alt=""><span>Account</span></a></div>
            <div class="mini-cart"><a href=""><img src="../assets/cart_icon.png" alt=""><span>Cart</span></a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-mobile">
      <div class="header-items">
        <div class="menu">
          <MenuSlideout />
        </div>
        <div class="phone">
          <div class="" v-for="item in headerContact.items" :key="item">
            <div v-html="item.content"></div>
          </div>
        </div>
        <div class="logo">
          <img @click="logoClicked($event)" :src="config.base_media_url + 'logo/' + config.header_logo_src" alt="">
        </div>
        <div class="search">
          <div class="icon">
            <img src="../assets/search_icon_2x.png" alt="">
          </div>
        </div>
        <div class="mini-cart">
          <div class="icon">
            <img src="../assets/cart_icon.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import gql from 'graphql-tag'
  import MenuSlideout from "@/components/MenuSlideout.vue"
  import MenuNavigation from "@/components/MenuNavigation.vue"
  import { GET_CMS_BLOCKS } from "@/grapql/query_cms.js"
  import { ref } from 'vue'

  const $ = window.$

  const headerTopId = ref('header-top-bar');

  export default {
    name: "TheHeader",
    components: {
      MenuSlideout,
      MenuNavigation
    },
    data() {
      return {
        config: '',
        headerTopId,
        headerTop: '',
        headerContact: '',
      };
    },
    apollo: {
      config: gql`query {
        config: storeConfig {
          base_media_url,
          header_logo_src
        },
      }`,
      headerTop:  {
        query: GET_CMS_BLOCKS,
        variables() {
            return {
              identifiers: this.headerTopId,
            };
        },
        update: data => data.cmsBlocks
      },
      headerContact: gql`query {
        headerContact: cmsBlocks(identifiers: ["header-contact"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
      if (!document.querySelector('.header-top-bar-wrapper .mobile-item .slick-slider')) {
        $('.header-top-bar-wrapper .mobile-item .pagebuilder-column-line').slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      }
    },
    methods: {
      logoClicked(event) {
        if (window.location.origin !== window.location.href) {
          window.location.replace(window.location.origin)
        } else {
          event.preventDefault()
        }
      }
    }
  }
</script>

<style>
body {
  margin: 0;
}

body #app {
  font-family: 'Montserrat';
  margin: 0;
}

header {
  position: sticky;
  background: #fff;
  top: 0;
  z-index: 2;
}

figure {
  margin: 0;
}

header img {
  width: 100%;
}

.header-items img {
  display: block;
}

.header-bottom {
  width: 100%;
  padding: 0 20px;
  border-top: 1px solid #464646;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

/* ------------------------------------------ */

/* top bar */

.header-top-bar-wrapper {
  margin: 0 auto;
  max-width: 1206px;
}

.header-top-bar-wrapper .desktop-item {
  padding: 11px 20px;
}

.header-top-bar-wrapper .desktop-item .pagebuilder-column-line {
  display: flex;
  justify-content: space-between;
}

#html-body .header-top-bar-wrapper .pagebuilder-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: auto;
}

.header-top-bar-wrapper p {
  margin: 0;
  color: #8C9199;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
}

.header-top-bar-wrapper img {
  max-height: 20px;
}

.header-top-bar-wrapper figure {
  margin: 0 10px 0 0;
}

.header-top-bar-wrapper .slick-arrow:before {
  display: none;
}

.header-top-bar-wrapper .slick-prev:after,
.header-top-bar-wrapper .slick-next:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 9px;
  height: 15px;
  content: '';
  display: block;
  margin: auto;
}

.header-top-bar-wrapper .slick-prev:after {
  background-image: url('../assets/arrow_left_icon.png');
}

.header-top-bar-wrapper .slick-next:after {
  background-image: url('../assets/arrow_right_icon.png');
}

/* end top bar */

/* ------------------------------- */

/* mobile header */

.header-mobile {
  position: relative;
}

.header-mobile .header-items {
  background: #333;
  display: flex;
}

.header-mobile .logo img {
  height: 36px;
  margin: 0 auto;
  cursor: pointer;
}

header img {
  width: auto;
}

.mobile-item {
  padding: 12px 45px;
}

#html-body .mobile-item .pagebuilder-column-line {
  display: block;
}

.header-mobile .header-items {
  display: flex;
  align-items: center;
  padding: 12px 20px;
}

.header-mobile .header-items .logo {
  flex-grow: 1;
}

.header-mobile .header-items .menu {
  margin-right: 21px;
  width: 18px;
}

.header-mobile .header-items .mini-cart img {
  margin-left: 22px;
  max-height: 19px;
}

.header-mobile .header-items .search img,
.header-mobile .header-items .phone img {
  max-height: 20px;
}

/* end mobile header */

/* ------------------------------------ */

/* desktop header */

.contact-desktop img {
  max-height: 26px;
}

#html-body .contact-desktop .pagebuilder-column-line,
#html-body .contact-desktop .pagebuilder-column {
  display: flex;
  align-items: center;
  width: auto;
  flex-direction: row;
}

.contact-desktop p,
.contact-desktop a {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 19px;
  text-decoration: none;
}

.contact-phone {
  margin-left: 16px;
}

.contact-phone img {
  margin-right: 10px;
}

.header-desktop .logo img {
  height: 58px;
  margin: 0;
  cursor: pointer;
}

.desktop-item,
img.pagebuilder-mobile-hidden {
  display: none;
}

.header-desktop {
  display: none;
  background: #333;
}

.header-desktop .header-items .header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
}

.header-desktop .search {
  flex-grow: 1;
  margin: 0 auto;
  padding: 0 28px 0 48px;
  max-width: 357px;
}

.header-desktop .search-bar {
  display: flex;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
}

.header-desktop .search-bar input {
  flex-grow: 1;
  padding-left: 16px;
  border: none;
  outline: none;
}

.header-desktop .search-bar input {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
}

.header-desktop .search-bar input::-webkit-input-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
}

.header-desktop .search-bar input:-ms-input-placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
}

.header-desktop .search-bar input::placeholder {
  color: #8D929A;
  font-family: 'Montserrat';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 19px;
}

.header-desktop .search-bar .icon {
  cursor: pointer;
  width: 54px;
  border: none;
}

.header-desktop .search-bar .icon img {
  max-height: 20px;
  width: auto;
  display: block;
  margin: auto;
}

.contact-desktop {
  display: none;
}

.navigation-links,
.navigation-links .account a,
.navigation-links .mini-cart a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.navigation-links .account,
.navigation-links .mini-cart {
  padding: 11px 0;
}

.navigation-links .account {
  margin-right: 24px;
}

.navigation-links .account span,
.navigation-links .mini-cart span {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 18px;
  text-transform: uppercase;
}

.navigation-links .account img,
.navigation-links .mini-cart img {
  max-height: 24px;
  margin-right: 10px;
}


/* end desktop header */


@media only screen and (min-width: 768px) {
  img.pagebuilder-mobile-hidden {
    display: block;
  }

  img.pagebuilder-mobile-only {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  .desktop-item {
    display: block;
  }

  .mobile-item {
    display: none;
  }

  .header-mobile {
    display: none;
  }

  .header-desktop {
    display: block;
  }

  .contact-desktop {
    display: block;
  }

  .contact-mobile {
    display: none;
  }
}

@media only screen and (min-width: 1500px) {
  .header-desktop .header-items .header-top {
    padding: 16px 181px;
  }

  .header-bottom {
    padding: 0 181px;
  }
}

</style>
