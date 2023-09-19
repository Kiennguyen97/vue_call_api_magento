<template>
  <div class="top-sellers-block">
    <div v-html="topSellers"></div>
  </div>
</template>

<script>
  import { GET_CMS_BLOCKS } from "@/grapql/query_cms.js"

  const $ = window.$

  export default {
    name: "TopSellers",
    data() {
      return {
        topSellers: ''
      };
    },
    apollo: {
      topSellers: {
        query: GET_CMS_BLOCKS,
        variables() {
            return {
              identifiers: 'top-sellers',
            };
        },
        update (data) {
          return data.cmsBlocks.items[0].content.replaceAll('href="https://magentoapi.merket.io', 'href="product').replaceAll('.html', '')
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

      const products = document.querySelector('.top-sellers .product-items')
      if (products) {
        setTimeout(function () {
          alignHeight(products.querySelectorAll('.product-item-link'))
        }, 500)

        window.addEventListener('resize', function () {
          setTimeout(function () {
            alignHeight(products.querySelectorAll('.product-item-link'))
          }, 500)
        }, true)
      }

      if ( $(window).width() >= 1024 ) {
        if (document.querySelector('.top-sellers .slick-slider')) {
          $('.top-sellers .widget-product-grid').slick('unslick');
        }
      } else {
        if (!document.querySelector('.top-sellers .slick-slider')) {
          $('.top-sellers .widget-product-grid').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [

              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
        }
      }

      $(window).on('resize', function() {
        if ( $(window).width() >= 1024 ) {
          if (document.querySelector('.top-sellers .slick-slider')) {
            $('.top-sellers .widget-product-grid').slick('unslick');
          }
        } else {
          if (!document.querySelector('.top-sellers .slick-slider')) {
            $('.top-sellers .widget-product-grid').slick({
              dots: false,
              arrows: true,
              infinite: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 1,
              responsive: [

                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
          }
        }
      });
    }
  }
</script>

<style>
.top-sellers-block {
  padding: 24px 0;
}

.top-sellers h3,
.top-sellers p {
  margin: 0;
}

.top-sellers h3 {
  color: #222;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-align: left;
  text-transform: uppercase;
  padding-left: 10px;
  margin-bottom: 19px;
}

.top-sellers .slick-next:after,
.top-sellers .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.top-sellers .slick-next,
.top-sellers .slick-prev {
  right: 0;
  left: auto;
  top: -36px;
  width: 38px;
  height: 38px;
  z-index: 1;
}

.top-sellers .slick-prev {
  right: 56px;
}

.top-sellers .slick-next {
  right: 10px;
}

.top-sellers .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.top-sellers .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.top-sellers .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.top-sellers .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.top-sellers .slick-arrow:before {
  display: none;
}

.top-sellers .product-item .product-image-container span.product-image-wrapper {
    padding-bottom: 100%;
    display: block;
    position: relative;
    overflow: hidden;
}

.top-sellers .slick-list {
  padding: 0 30% 0 0 !important;
}

.top-sellers .product-item.slick-slide {
  padding: 10px 8px;
}

.top-sellers .top-sellers-link p a {
  border-radius: 27px;
  background-color: #3EB2FB;
  color: #fff;
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 13px;
  padding: 20px 40px;
  margin: 19px auto 0;
  width: max-content;
  display: block;
  text-decoration: none;
  transition: all 0.2s linear;
}

.top-sellers .top-sellers-link p a:hover {
  background-color: #159BEF;
}

@media only screen and (min-width: 768px) {
  .top-sellers .slick-list {
    padding: 0 12% 0 0 !important;
  }
}

@media only screen and (min-width: 1024px) {
  .top-sellers .widget-product-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 40px 20px;
  }

  .top-sellers h3 {
    font-size: 42px;
    padding-left: 0;
    margin-bottom: 38px;
  }

  .top-sellers-block {
    max-width: 1280px;
    padding: 64px 20px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .top-sellers {
    position: relative;
  }

  .top-sellers-link {
    position: absolute;
    top: 0;
    right: 0;
  }

  .top-sellers .top-sellers-link p a {
    margin: 0;
    padding: 16px 24px;
  }
}
</style>