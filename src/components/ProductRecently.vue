<template>
    <div class="product_recently">
        <div class="container">
            <span class="heading">Your Recently Viewed</span>
            <div class="recently-viewed-list slick-slider">
                <div class="product_recently-item" v-for="(product, index) in recentlyViewed" :key="index">
                    <router-link :to="{ name: 'ProductPage', params: { sku: product.sku } }">
                        <img :src="product.image" alt="Product Thumbnail">
                        <p class="product_name-related">{{ product.name }}</p>
                    </router-link>
                    <span class="product_name-price">{{
                        formatCurrency(product.price) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import VueCookies from 'vue-cookies'
const $ = window.$
export default {
    name: "ProductRecently",
    data() {
        return {
            recentlyViewed: this.getRecentlyViewedFromCookie(),
        };
    },
    props: {
        product: {},
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.product.price_range.minimum_price.regular_price.currency,
            }).format(value);
        },
        addToRecentlyViewed(product) {
            const data = {
                name: product.name,
                sku: product.sku,
                image: product.thumbnail.url,
                price: product.price_range.minimum_price.regular_price.value
            }
            if (!this.recentlyViewed.some(item => item.sku === data.sku)) {
                this.recentlyViewed.unshift(data);
                console.log(this.recentlyViewed)
                const jsonString = JSON.stringify(this.recentlyViewed);
                VueCookies.set('recentlyViewed', jsonString, '1h');
            }
        },
        getRecentlyViewedFromCookie() {
            const jsonArray = VueCookies.get('recentlyViewed');
            if (jsonArray) {
                return jsonArray;
            } else return []
        },
    },
    created() {
        this.addToRecentlyViewed(this.product);
    },
    mounted() {
        $('.recently-viewed-list.slick-slider').slick({
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
};
</script>
  
  
<style scoped>
.product_recently {
    padding: 64px 0;
}

.product_recently a {
    text-decoration: none;
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

.product_recently .heading {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    font-size: 42px;
    font-weight: 600;
    color: black;
    display: block;
    margin-bottom: 48px;
    text-align: left;
}

.list_product {
    display: flex;
}

.list_product .slick-slide:last-child {
    margin-right: 0;
}

.product_related-item {
    background-color: white;
}
</style>
  