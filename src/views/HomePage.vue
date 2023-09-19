<template>
  <div class="index-index" v-html="home"></div>
  <NewSletter />
  <TopSellers />
  <ExclusiveDeals />
  <CustomerReviews />
</template>
<script>
  import { GET_CMS_PAGE } from "@/grapql/query_cms.js"
  import NewSletter from '@/components/NewSletter.vue';
  import TopSellers from '@/components/TopSellers.vue';
  import CustomerReviews from '@/components/CustomerReviews.vue';
  import ExclusiveDeals from '@/components/ExclusiveDeals.vue';

  const $ = window.$

  export default {
    name: "HomePage",
    data() {
      return {
        home: '',
        newsletter: ''
      };
    },
    components: {
      NewSletter,
      TopSellers,
      CustomerReviews,
      ExclusiveDeals
    },
    apollo: {
      home: {
        query: GET_CMS_PAGE,
        variables() {
            return {
              identifier: 'home',
            };
        },
        update (data) {
          return data.cmsPage.content.replaceAll('href="https://magentoapi.merket.io', 'href="product').replaceAll('.html', '')
        }
      }
    },
    updated: function () {
      //align height for elements
      function alignHeight(allh) {
        for (let k = 0; k < allh.length; k++) {
          allh[k].style.height = 'auto'
        }
        let minHeight = 0
        for (let j = 0; j < allh.length; j++) {
          if (minHeight < allh[j].offsetHeight) {
            minHeight = allh[j].offsetHeight
          }
        }
        if (minHeight > 0) {
          minHeight = minHeight + 'px'
          for (let i = 0; i < allh.length; i++) {
            allh[i].style.height = minHeight
          }
        }
      }

      const categories = document.querySelector('.home-content-categories .pagebuilder-column-line')
      if (categories) {
        setTimeout(function () {
          alignHeight(categories.querySelectorAll('[data-content-type="image"] a'))
          alignHeight(categories.querySelectorAll('[data-content-type="text"]'))
        }, 500)

        window.addEventListener('resize', function () {
          setTimeout(function () {
            alignHeight(categories.querySelectorAll('[data-content-type="image"] a'))
            alignHeight(categories.querySelectorAll('[data-content-type="text"]'))
          }, 500)
        }, true)
      }

      if (!document.querySelector('.home-content-slider .slick-slider')) {
        $('.home-content-slider .pagebuilder-column-line').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      }

      if ( $(window).width() >= 1024 ) {
        if (document.querySelector('.home-content-categories .slick-slider')) {
          $('.home-content-categories .pagebuilder-column-line').slick('unslick');
        }

        if (document.querySelector('.home-brands .slick-slider')) {
          $('.home-brands .pagebuilder-column-line').slick('unslick');
        }
      } else {
        if (!document.querySelector('.home-content-categories .slick-slider')) {
          $('.home-content-categories .pagebuilder-column-line').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 2
          });
        }

        if (!document.querySelector('.home-brands .slick-slider')) {
          $('.home-brands .pagebuilder-column-line').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 2
          });
        }
      }

      $(window).on('resize', function() {
        if ( $(window).width() >= 1024 ) {
          if (document.querySelector('.home-content-categories .slick-slider')) {
            $('.home-content-categories .pagebuilder-column-line').slick('unslick');
          }

          if (document.querySelector('.home-brands .slick-slider')) {
            $('.home-brands .pagebuilder-column-line').slick('unslick');
          }
        } else {
          if (!document.querySelector('.home-content-categories .slick-slider')) {
            $('.home-content-categories .pagebuilder-column-line').slick({
              dots: false,
              arrows: true,
              infinite: true,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 2
            });
          }

          if (!document.querySelector('.home-brands .slick-slider')) {
            $('.home-brands .pagebuilder-column-line').slick({
              dots: false,
              arrows: true,
              infinite: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2,
              rows: 2
            });
          }
        }
      });
    },
  }
</script>

<style>
.index-index img {
  width: 100%;
}

.index-index .slick-dotted.slick-slider {
  margin: 0;
}

#html-body .home-content-slider .pagebuilder-column-line {
    display: block;
}

.home-content-slider {
  margin-bottom: 42px;
}

.home-content-slider .slick-dots li button {
  width: 10px;
  height: 10px;
  border: 2px solid #DDDDDD;
  border-radius: 50%;
  padding: 4px;
}

.home-content-slider .slick-dots li button:before {
  content: '';
  width: 100%;
  height: 100%;
}

.home-content-slider .slick-dots li {
  width: 12px;
  height: 12px;
}

.home-content-slider .slick-dots li.slick-active button {
  background: #9B9B9B;
  border: 2px solid #9B9B9B;
}

.home-content-slider .slick-dots {
  bottom: -22px;
}
/* Categories list */
.home-content-categories .pagebuilder-column {
  padding: 10px;
  box-sizing: border-box;
  box-shadow: none;
  transition: all 0.2s linear;
}

.home-content-categories .pagebuilder-column:hover {
  box-shadow: 2px 2px 8px 0 rgba(0,0,0,.2);
}

.home-content-categories {
  padding: 0 10px;
  margin-bottom: 35px;
}

.home-content-categories a {
  display: flex;
  align-items: center;
}

.home-content-categories h3 {
  margin: 0;
  text-align: left;
  color: #000;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: uppercase;
  margin-bottom: 8px;
  padding-right: 102px;
}

.home-content-categories [data-content-type="text"] {
  margin-top: 12px;
}

.home-content-categories [data-content-type="text"] a {
  color: #000;
  font-family: 'Oswald';
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 17px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  display: block;
}

.home-content-categories p {
  margin: 0;
}

.home-content-categories .slick-slide > div:first-child {
  margin-bottom: 24px;
}

.home-content-categories .slick-next:after,
.home-content-categories .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.home-content-categories .slick-next,
.home-content-categories .slick-prev {
  right: 0;
  left: auto;
  top: -25px;
  width: 38px;
  height: 38px;
  z-index: 1;
}

.home-content-categories .slick-prev {
  right: 46px;
}

.home-content-categories .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.home-content-categories .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.home-content-categories .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.home-content-categories .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.home-content-categories .slick-arrow:before {
  display: none;
}

/* Home brands */
.home-brands h3 {
  color: #fff;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-transform: uppercase;
  text-align: left;
  padding: 0 102px 0 10px;
  margin: 0 0 30px;
}

.home-brands .view-all-brands a {
  border-radius: 27px;
  background-color: #3EB2FB;
  color: #fff;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 13px;
  padding: 20px 40px;
  margin: 0 auto;
  width: max-content;
  text-decoration: none;
  transition: all 0.2s linear;
}

.home-brands .view-all-brands a:hover {
  background-color: #159BEF;
}

.home-brands {
  background: linear-gradient(270deg, rgba(192,216,84,0.72) 0%, #277E93 100%);
  padding: 24px 0 30px;
}

#html-body .home-brands .pagebuilder-column-line {
  display: block;
}

.home-brands .slick-list {
    padding: 0 20% 0 0 !important;
}

.home-brands .slick-next:after,
.home-brands .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.home-brands .slick-next,
.home-brands .slick-prev {
  right: 0;
  left: auto;
  top: -46px;
  width: 38px;
  height: 38px;
  z-index: 1;
}

.home-brands .slick-prev {
  right: 56px;
}

.home-brands .slick-next {
  right: 10px;
}

.home-brands .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.home-brands .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.home-brands .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.home-brands .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.home-brands .slick-arrow:before {
  display: none;
}

/* Home RBT block */

.home-rtb {
  padding: 24px 10px;
  box-sizing: border-box;
}

.home-rtb  h3 {
  color: #000;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  margin: 0 0 24px;
  padding: 0 30px;
}

#html-body .home-rtb .pagebuilder-column-line {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
}

#html-body .home-rtb .pagebuilder-column-line .pagebuilder-column {
  width: 100%;
}

.home-rtb .pagebuilder-column-line figure {
  display: flex;
  margin: 0 auto;
}

.home-rtb .pagebuilder-column-line img {
  max-height: 50px;
  width: auto;
}

.home-rtb .pagebuilder-column-line p {
  color: #000;
  font-family: 'Oswald';
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 17px;
  text-align: center;
  text-transform: uppercase;
}
@media only screen and (min-width: 768px) {
  .home-content-slider .slick-dots {
    display: none !important;
  }
}

@media only screen and (min-width: 1024px) {
  #html-body .home-content-categories .pagebuilder-column-line {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px 20px;
  }

  #html-body .home-content-categories .pagebuilder-column-line .pagebuilder-column {
    width: 100%;
    box-sizing: border-box;
  }

  .home-content-categories {
    padding: 0 20px;
    max-width: 1280px;
    margin: 0 auto 60px;
  }

  .home-content-categories h3 {
    font-size: 42px;
    padding: 0;
    margin-bottom: 42px;
    text-align: center;
  }

  #html-body .home-brands .pagebuilder-column-line {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  #html-body .home-brands .pagebuilder-column-group {
    max-width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
  }

  #html-body .home-brands .pagebuilder-column-line {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 30px 20px;
  }

  #html-body .home-brands .pagebuilder-column-line .pagebuilder-column {
    width: 100%;
  }

  #html-body .home-brands .pagebuilder-column-line .pagebuilder-column figure {
    margin: auto;
  }

  .home-brands {
    padding: 64px 0;
  }

  .home-brands h3 {
    font-size: 42px;
    text-align: center;
    padding: 0;
  }

  .home-rtb {
    padding: 64px 20px 66px;
    max-width: 1280px;
    margin: 0 auto;
  } 

  #html-body .home-rtb .pagebuilder-column-line {
      grid-template-columns: unset;
      grid-gap: 76px;
      grid-auto-flow: column;
  }

  .home-rtb h3 {
    margin-bottom: 56px;
  }
}

@media only screen and (min-width: 1280px) {
  #html-body .home-content-categories .pagebuilder-column-line {
    grid-template-columns: repeat(6, 1fr);
  }

  .home-content-categories {
    margin-bottom: 66px;
  }
}
</style>