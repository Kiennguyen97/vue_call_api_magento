<template>
  <div class="menu-slideout" id="menu-slideout">
    <div class="icon" @click="activeSlideout()">
      <img class="slideout-close" src="../assets/menu_icon.svg" alt="">
      <img class="slideout-open" src="../assets/menu-close-icon.png" alt="">
    </div>
    <div class="menu-slideout-content">
      <div class="menu-lv1" v-for="itemsLv0 in menu" :key="itemsLv0">
        <template v-if='itemsLv0.children'>
          <div class="menu-lv1-content" v-for="itemsLv1 in itemsLv0.children" :key="itemsLv1">
            <template v-if='itemsLv1.children_count != 0'>
              <div class="menu-lv1-title has-children" @click="activeItemsMenu($event)"><span class="menu-lv1-title-text">{{ itemsLv1.name }}</span></div>
              <div class="menu-lv2">
                <template v-for="itemsLv2 in itemsLv1.children" :key="itemsLv2">
                  <div class="menu-lv2-content">
                    <template v-if='itemsLv2.children_count != 0'>
                      <div class="menu-lv2-title"><span class="menu-lv2-title-text">{{ itemsLv2.name }}</span></div>
                      <div class="menu-lv3">
                        <template v-for="itemsLv3 in itemsLv2.children" :key="itemsLv3">
                          <div class="menu-lv3-title"><a class="menu-lv3-title-text" :href="'/category/' + itemsLv3.url_key">{{ itemsLv3.name }}</a></div>
                        </template>
                      </div>
                    </template>
                    <template v-else>
                      <div class="menu-lv2-title"><a class="menu-lv2-title-text" :href="'/category/' + itemsLv2.url_key">{{ itemsLv2.name }}</a></div>
                    </template>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="menu-lv1-title"><a class="menu-lv1-title-text" :href="'/category/' + itemsLv1.url_key">{{ itemsLv1.name }}</a></div>
            </template>
          </div>
        </template>
      </div>
      <div class="menu-slideout-links">
        <div class="account">
          <a href="/customer/account/login"><img class="account" src="../assets/account_icon.png" alt=""><span>ACCOUNT</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: "MenuSlideout",
    data() {
      return {
        menu: ''
      };
    },
    apollo: {
      menu: gql`query {
        menu: categoryList(filters: {ids: {in: ["2"]}}) {
          children_count
          children {
            id
            level
            name
            url_path
            url_key
            children_count
            children {
              id
              level
              name
              url_path
              url_key
              children_count
              children {
                id
                level
                name
                url_path
                url_key
              }
            }
          }
        }
      }`
    },
    updated: function () {
    },
    methods: {
      activeSlideout() {
        document.getElementById('menu-slideout').classList.toggle('active');
        document.querySelector('body').classList.toggle('open-menu-slideout');
      },
      activeItemsMenu(event) {
        event.currentTarget.classList.toggle('active');
      }
    }
  }
</script>

<style>
.open-menu-slideout {
  height: 100vh;
  overflow: hidden;
}

.menu-slideout .icon img {
  width: auto;
}

.menu-slideout .slideout-close {
  height: 14px;
}

.menu-slideout .slideout-open {
  height: 16px;
}

.menu-slideout ul {
  margin: 0;
}

.menu-slideout-content {
  background: #fff;
  position: absolute;
  top: 100%;
  width: 100%;
  left: -100%;
  transition: all 0.3s;
}

.menu-slideout.active .menu-slideout-content {
  left: 0;
  height: 100vh;
}

.menu-slideout .slideout-open {
  display: none;
}

.menu-slideout.active .slideout-open {
  display: block;
}

.menu-slideout.active .slideout-close {
  display: none;
}

.menu-slideout .menu-lv1-title {
  padding: 14px 16px;
  margin: 0;
  text-align: left;
  position: relative;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.menu-slideout .menu-lv1-content:last-child .menu-lv1-title {
  border-bottom: none;
}

.menu-slideout .menu-lv1-content:first-child .menu-lv1-title {
  border-top: none;
}

.menu-slideout .menu-lv1-content:not(:first-child) {
  margin-top: -1px;
}

.menu-slideout .menu-lv1-title-text {
  color: #222;
  font-family: 'Oswald';
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 22px;
  text-transform: uppercase;
  text-decoration: none;
  display: block;
}

.menu-slideout .menu-lv1-title.has-children:after {
  content: '';
  background-image: url('../assets/select_acc.png');
  position: absolute;
  width: 15px;
  height: 15px;
  background-size: contain;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
}

.menu-slideout .menu-lv1-title.has-children.active:after {
  transform: rotate(180deg) translateY(50%);
}

.menu-slideout .menu-lv2-title {
  margin: 0;
}

.menu-slideout .menu-lv2 {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}

.menu-slideout .menu-lv2 .menu-lv2-title-text {
  color: #4A4A4A;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 18px;
  text-align: left;
  text-decoration: none;
  display: block;
}

.menu-slideout .menu-lv2-content {
  padding: 0 16px 14px;
}

.menu-slideout .menu-lv2-content:first-child {
  padding-top: 17px;
}

.menu-slideout .menu-lv2-content:last-child {
  border-bottom: 1px solid #eee;
  padding-bottom: 17px;
}

.menu-slideout .menu-lv1-title.active + .menu-lv2 {
  max-height: 300px;
}

.menu-slideout .menu-lv3-title-text {
  color: #4A4A4A;
  font-family: 'Montserrat';
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  text-align: left;
  text-decoration: none;
  display: block;
}

.menu-slideout .menu-slideout-links {
  background-color: #8C9199;
  padding: 13px 23px;
}

.menu-slideout .menu-slideout-links img {
  max-height: 24px;
  width: auto;
  margin-right: 10px;
  display: block;
}

.menu-slideout .menu-slideout-links a {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 18px;
  text-align: right;
  margin: 0;
  display: block;
  text-decoration: none;
}

.menu-slideout .menu-slideout-links .account a {
  display: flex;
  align-items: center;
}
</style>
