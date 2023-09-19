<template>
  <div class="customer-reviews-block">
    <div v-for="item in reviews.items" :key="item">
      <div v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  const $ = window.$

  export default {
    name: "CustomerReviews",
    data() {
      return {
        reviews: ''
      };
    },
    apollo: {
      reviews: gql`query {
        reviews: cmsBlocks(identifiers: ["customer-reviews"]) {
          items {
            content
          }
        },
      }`,
    },
    updated: function () {
      document.querySelector('body').classList.add('show-review')
      
      if (!document.querySelector('.customer-reviews .slick-slider')) {
        $('.customer-reviews .pagebuilder-column-line').slick({
          dots: true,
          arrows: true,
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      }
    }
  }
</script>

<style>
.customer-reviews-block h4,
.customer-reviews-block h5,
.customer-reviews-block p {
  margin: 0;
}

.customer-reviews {
  max-width: 1240px;
  margin: 0 auto;
}

.customer-reviews-block {
  margin: -124px 0 -138px;
}

.customer-reviews-block h5 {
  color: #000;
  font-family: 'Montserrat';
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 16px;
  margin-bottom: 27px;
}

.customer-reviews-block h4 {
  color: #000;
  font-family: 'Oswald';
  font-size: 20px;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: 400;
  margin-bottom: 16px;
}

.customer-reviews-block .pagebuilder-column-group {
  padding: 30px 18px;
  box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.1);
  margin: 0 10px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
}

.review-content p {
  color: #4A4A4A;
  font-family: 'Montserrat';
  font-size: 13px;
  letter-spacing: 0;
  line-height: 22px;
}

.review-stars p {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.review-stars img {
  display: block;
  max-height: 25px;
  width: auto;
  margin: 0 5px;
}

.customer-reviews-block .slick-next:after,
.customer-reviews-block .slick-prev:after {
  background-repeat: no-repeat;
  background-size: contain;
  width: 38px;
  height: 38px;
  content: '';
  display: block;
  margin: auto;
}

.customer-reviews-block .slick-next,
.customer-reviews-block .slick-prev {
  width: 38px;
  height: 38px;
  z-index: 1;
  bottom: 0;
  top: unset;
  transform: unset;
}

.customer-reviews-block .slick-prev {
  left: 0;
}

.customer-reviews-block .slick-next {
  right: 0;
}


.customer-reviews-block .slick-prev:after {
  background-image: url('../assets/Arrow_left_active_icon.png');
}

.customer-reviews-block .slick-next:after {
  background-image: url('../assets/Arrow_right_active_icon.png');
}

.customer-reviews-block .slick-prev.slick-disabled:after {
  background-image: url('../assets/Arrow_left_icon_white.png');
}

.customer-reviews-block .slick-next.slick-disabled:after {
  background-image: url('../assets/Arrow_right_icon_white.png');
}

.customer-reviews-block .slick-arrow:before {
  display: none;
}

.customer-reviews-block .slick-dotted.slick-slider {
  margin: 0;
  padding-bottom: 77px;
}

.customer-reviews-block .slick-dots li button:before {
  font-size: 12px;
}

.customer-reviews-block .slick-dots {
  bottom: 8px;
}

@media only screen and (min-width: 1024px) {
  .customer-reviews-block {
    margin: -66px 0 -100px;
  }

  .review-stars img {
    max-height: 48px;
  }

  .customer-reviews-block h5 {
    margin-bottom: 36px;
  }

  .customer-reviews-block .review-stars p {
    margin-bottom: 22px;
  }

  .customer-reviews-block .review-content {
    max-width: 668px;
    margin: 0 auto;
  }

  .customer-reviews-block .slick-next,
  .customer-reviews-block .slick-prev {
    width: 64px;
    height: 64px;
    top: 50%;
    transform: translateY(-50%);
  }

  .customer-reviews-block .slick-next:after,
  .customer-reviews-block .slick-prev:after {
    width: 64px;
    height: 64px;
  }

  .customer-reviews-block .pagebuilder-column-group {
    padding: 60px 32px;
    margin: 0;
  }
}
</style>