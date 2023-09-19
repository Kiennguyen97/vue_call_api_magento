<template>
  <div class="exclusive-deals-block">
    <div v-html="exclusiveDeals"></div>
  </div>
</template>

<script>
  import { GET_CMS_BLOCKS } from "@/grapql/query_cms.js"

  const $ = window.$

  export default {
    name: "ExclusiveDeals",
    data() {
      return {
        exclusiveDeals: ''
      };
    },
    apollo: {
      exclusiveDeals: {
        query: GET_CMS_BLOCKS,
        variables() {
            return {
              identifiers: 'exclusive-deals',
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

      const products = document.querySelector('.exclusive-deals .product-items')
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
        if (document.querySelector('.exclusive-deals .slick-slider')) {
          $('.exclusive-deals .widget-product-grid').slick('unslick');
        }
      } else {
        if (!document.querySelector('.exclusive-deals .slick-slider')) {
          $('.exclusive-deals .widget-product-grid').slick({
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
          if (document.querySelector('.exclusive-deals .slick-slider')) {
            $('.exclusive-deals .widget-product-grid').slick('unslick');
          }
        } else {
          if (!document.querySelector('.exclusive-deals .slick-slider')) {
            $('.exclusive-deals .widget-product-grid').slick({
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
.exclusive-deals-block {
  background: linear-gradient(270deg, #C0D854 0%, #277E93 100%);
  padding: 17px 0;
}

.show-review .exclusive-deals-block {
  padding: 17px 0 182px;
}

.exclusive-deals-icon {
  display: none;
}

.exclusive-deals-block h3 {
  color: #fff;
  font-family: 'Oswald';
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 34px;
  text-align: left;
  text-transform: uppercase;
  padding-left: 10px;
  margin: 0;
}

.exclusive-deals-block .title-image {
  margin: 0 0 16px;
}

.exclusive-deals-block .title-image .pagebuilder-column:first-child {
  width: 80% !important;
}

.exclusive-deals-block [data-content-type="products"] {
  margin-left: 2px;
}

.exclusive-deals .slick-next:after,
.exclusive-deals .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.exclusive-deals .slick-next,
.exclusive-deals .slick-prev {
  right: 0;
  left: auto;
  top: -32px;
  width: 38px;
  height: 38px;
  z-index: 1;
}

.exclusive-deals .slick-prev {
  right: 56px;
}

.exclusive-deals .slick-next {
  right: 10px;
}

.exclusive-deals .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.exclusive-deals .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.exclusive-deals .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.exclusive-deals .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.exclusive-deals .slick-arrow:before {
  display: none;
}

.exclusive-deals .slick-list {
  padding: 0 30% 0 0 !important;
}

.exclusive-deals .product-item.slick-slide {
  padding: 10px 8px;
}

@media only screen and (min-width: 768px) {
  .exclusive-deals .slick-list {
    padding: 0 12% 0 0 !important;
  }
}

@media only screen and (min-width: 1024px) {
  .exclusive-deals-block {
    padding: 46px 0 164px;
  }

  .show-review .exclusive-deals-block {
    padding: 46px 0 156px;
  }

  .exclusive-deals-block .title-image {
    margin: 0 0 29px;
  }

  .exclusive-deals-block h3 {
    font-size: 42px;
    padding: 0;
  }

  .exclusive-deals .widget-product-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 40px 20px;
  }

  .exclusive-deals {
    max-width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .exclusive-deals .widget-product-grid .product-item-details {
    padding: 12px 16px 15px;
  }

  .exclusive-deals-icon {
    display: block;
    width: 100%;
  }

  .exclusive-deals-icon img {
    display: block;
    max-height: 72px;
    width: auto;
    margin-left: auto;
  }

  .exclusive-deals-icon img.pagebuilder-mobile-only {
    display: none;
  }

  .title-image .pagebuilder-column {
    align-items: center;
    flex-direction: row !important;
    justify-content: unset !important;
  }
}
</style>