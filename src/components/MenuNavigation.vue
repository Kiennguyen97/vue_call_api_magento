<template>
  <div class="menu-navigation" id="menu-navigation">
    <div class="menu-lv1" v-for="itemsLv0 in menu" :key="itemsLv0">
    <template v-if='itemsLv0.children'>
      <div class="menu-lv1" v-for="itemsLv0 in menu" :key="itemsLv0">
        <template v-if='itemsLv0.children'>
          <div class="menu-lv1-content" v-for="itemsLv1 in itemsLv0.children" :key="itemsLv1">
            <template v-if='itemsLv1.children_count != 0'>
              <div class="menu-lv1-title"><a class="menu-lv1-title-text" :href="'/category/' + itemsLv1.url_key">{{ itemsLv1.name }}</a></div>
              <div class="menu-lv2">
                <template v-for="itemsLv2 in itemsLv1.children" :key="itemsLv2">
                  <div class="menu-lv2-content">
                    <template v-if='itemsLv2.children_count != 0'>
                      <div class="menu-lv2-title"><a class="menu-lv2-title-text" :href="'/category/' + itemsLv2.url_key">{{ itemsLv2.name }}</a></div>
                      <div class="menu-lv3">
                        <template v-for="itemsLv3 in itemsLv2.children.slice(0, 4)" :key="itemsLv3">
                          <div class="menu-lv3-title"><a class="menu-lv3-title-text" :href="'/category/' + itemsLv3.url_key">{{ itemsLv3.name }}</a></div>
                        </template>
                        <template v-if='itemsLv2.children_count > 4'>
                          <div class="menu-lv3-title view-all"><a class="menu-lv3-title-text view-all" :href="'/category/' + itemsLv2.url_key"> View All {{ itemsLv2.name }}</a></div>
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
    </template>
    </div>
  </div>
</template>
  
<script>
  import gql from 'graphql-tag'

  export default {
    name: "MenuNavigation",
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
    }
  }
</script>

<style>
.header-desktop {
  position: relative;
}

.menu-navigation .menu-lv2 {
  display: flex;
  position: absolute;
  pointer-events: none;
  top: 100%;
  width: 100%;
  left: 0;
  padding: 31px 20px;
  background: #fff;
  text-align: left;
  box-sizing: border-box;
  transition: all 0.2s linear;
  opacity: 0;
}

.menu-navigation .menu-lv1-title-text {
  color: #fff;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 18px;
  text-transform: uppercase;
  padding: 14px 22px;
  transition: all 0.2s;
}

.menu-navigation .menu-lv1-title-text:hover {
  color: #333;
  background: #fff;
}

.menu-navigation .menu-lv1-content:hover .menu-lv2 {
  pointer-events: all;
  display: flex;
  opacity: 1;
}

.menu-navigation .menu-lv1 {
  display: flex;
  margin-left: -11px;
}

.menu-navigation .menu-lv2-title {
  display: inline-block;
}

.menu-navigation .menu-lv2-title a {
  color: #000;
  font-family: 'Oswald';
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 17px;
  padding-bottom: 11px
}

.menu-navigation a {
  display: inline-block;
  text-decoration: none;
}

.menu-navigation .menu-lv2-content {
  min-width: 212px;
}

.menu-navigation .menu-lv3-title-text {
  color: #4A4A4A;
  font-family: 'Montserrat';
  font-size: 14px;
  letter-spacing: 0;
  line-height: 32px;
}

.menu-navigation .menu-lv3-title-text.view-all {
  text-decoration: underline;
}

@media only screen and (min-width: 1500px) {
  .menu-navigation .menu-lv2 {
    padding: 31px 181px;
  }
}
</style>
  