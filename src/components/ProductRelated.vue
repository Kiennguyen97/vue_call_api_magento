<template>
    <div class="product_related" v-if="product.related_products.length != 0">
        <div class="container">
            <span class="heading">Items you may like</span>
            <div class="list_product slick-slider">
                <div class="product_related-item" v-for="(item, index) in product.related_products" :key="index">
                    <router-link :to="{ name: 'ProductPage', params: { sku: item.sku } }">
                        <img :src="product.thumbnail.url" alt="Product Thumbnail">
                        <p class="product_name-related">{{ item.name }}</p>
                    </router-link>
                    <span class="product_name-price">{{ formatCurrency(this.product.price_range.minimum_price.regular_price.value) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
const $ = window.$
export default {
    name: "ProductRelated",
    data() {
        return {

        };
    },
    props: {
        product: {}
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.product.price_range.minimum_price.regular_price.currency,
            }).format(value);
        },
    },
    mounted() {
        $('.list_product.slick-slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 376,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    },
}
</script>
  
<style scoped>
.product_related {
    background-image: linear-gradient(to right, #277E93, #C0D854);
    padding: 64px 0;
}

.product_related-item a {
    text-decoration: none;
}

.slick-slider .slick-track {
    margin: 0 !important;
}

.slick-slide img {
    width: 100%;
}

.product_name-related {
    font-size: 14px;
    font-weight: 500;
    color: black;
    padding: 13px 16px;
    text-align: left;
    margin: 0;
}

.product_name-price {
    padding: 0 16px 16px;
    font-size: 20px;
    text-align: left;
    display: block;
}

.product_related .heading {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    font-size: 42px;
    font-weight: 600;
    color: white;
    display: block;
    margin-bottom: 48px;
    text-align: left;
}

.list_product {
    display: flex;
}

.list_product  .slick-slide:last-child {
    margin-right: 0;
}

.product_related-item {
    background-color: white;
}
</style>
  