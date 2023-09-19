<template>
    <div class="container">
        <div class="group">
            <div class="product">
                <div class="product_image">
                    <div class="list_image slick-slider">
                        <div class="image_item" v-for="(image, index) in product.media_gallery" :key="index">
                            <img :src="image.url" alt="" srcset="">
                        </div>
                    </div>
                </div>
                <div class="product_information">
                    <span class="rating">
                        <svg class="star" v-for="starIndex in 5" :key="starIndex" xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16" viewBox="0 0 24 24">
                            <path :style="'fill: ' + (starIndex <= rating ? 'orange' : '#F1F0E8') + ';'"
                                d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        <a class="reviews" href="">{{ product.review_count }} Reviews</a>
                    </span>
                    <h1 class="product_name">{{ product.name }}</h1>
                    <span class="price">{{ formatCurrency(this.product.price_range.minimum_price.regular_price.value)
                    }}</span>
                    <div class="variants">
                        <div class="opt_variant" v-for="(opt, index) in product.configurable_options" :key="index">
                            {{ opt.value }}
                            <label :for="opt.label">{{ opt.label }}</label> <br>
                            <select :name="opt.label" :id="opt.label" class="seclect_opt" v-model="selectedOptions[index]">
                                <option v-for="(item, index) in opt.values" :key="index" :value="item.label">{{ item.label
                                }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="add_cart">
                        <div class="quantity">
                            <button class="minus" @click="changeQuantity(-1)" :disabled="quantity === 1"><svg
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="10px" height="2px" viewBox="0 0 10 2" version="1.1">
                                    <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="shoppingbag_v01" transform="translate(-697.000000, -480.000000)"
                                            fill="#CCCCCC">
                                            <g id="Block-/-Cart-/-Product-Copy"
                                                transform="translate(180.000000, 431.000000)">
                                                <g id="Field-/-Quantity-Elements-/-Quantity"
                                                    transform="translate(498.000000, 30.000000)">
                                                    <g id="Field-/-Quantity">
                                                        <g id="icon-/-solid-/-interface-/-minus-1-icon-/-solid-/-interface-/-minus-2"
                                                            transform="translate(14.000000, 10.000000)">
                                                            <g id="icon-/-solid-/-interface-/-minus-5632"
                                                                transform="translate(5.000000, 9.166667)">
                                                                <polygon id="Path"
                                                                    points="0 0 10 0 10 1.66666667 0 1.66666667" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg></button>
                            <input type="number" min="1" v-model="quantity">
                            <button class="add" @click="changeQuantity(1)"><svg xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px"
                                    viewBox="0 0 12 12" version="1.1">
                                    <g id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="category_v01" transform="translate(-396.000000, -718.000000)" fill="#9B9B9B"
                                            fill-rule="nonzero">
                                            <g id="Sidebar" transform="translate(180.000000, 351.000000)">
                                                <g transform="translate(0.000000, 172.000000)" id="Other">
                                                    <g transform="translate(1.000000, 175.000000)">
                                                        <g id="Clubs">
                                                            <polygon id="plus"
                                                                points="222 25 227 25 227 27 222 27 222 32 220 32 220 27 215 27 215 25 220 25 220 20 222 20" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg></button>
                        </div>
                        <button class="add_to-cart" @click="addCart" :disabled="quantity > product.stock">{{ text_button
                        }}</button>
                    </div>
                    <div class="why_choose">
                        <CmsBlock :block="blockIdentifier" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CmsBlock from './Block.vue';
const $ = window.$
export default {
    name: "ProductInfor",
    data() {
        return {
            rating: 0,
            reviewCount: 0,
            quantity: 1,
            priceWithCurrency: '',
            selectedOptions: [],
            productAddCart: {},
            blockIdentifier: {
                content: "why-choose"
            }
        };
    },
    watch: {
        quantity: {
            handler(newQuantity) {
                this.updateButton(newQuantity);
            },
            deep: true
        },
        selectedOptions: {
            handler(newSelectedOptions) {
                this.getProduct(newSelectedOptions, this.quantity);
            },
            deep: true
        }
    },
    mounted() {
        $('.list_image.slick-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
        const listDots = document.querySelectorAll('.list_image .slick-dots li')
        listDots.forEach((item, index) => {
            const dotHTML = '<button style="background-image: url(' + this.product.media_gallery[index].url + ');"></button>';
            item.innerHTML = dotHTML
        })
    },
    components: {
        CmsBlock,
    },
    props: {
        product: {}
    },
    created() {
        this.rating = this.product.rating_summary / 20
        this.updateButton(this.quantity)
        this.selectedOptions = this.product.configurable_options.map(opt => opt.values[0].label);
    },
    methods: {
        Change(index) {
            this.currentImage = index
        },
        changeImage(step) {
            const newIndex = this.currentImage + step;
            if (newIndex >= 0 && newIndex < this.product.media_gallery.length) {
                this.currentImage = newIndex;
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.product.price_range.minimum_price.regular_price.currency,
            }).format(value);
        },
        changeQuantity(step) {
            const quanti = this.quantity + step
            this.quantity = quanti;
        },
        updateButton(quantity) {
            if (quantity > this.product.stock) {
                this.text_button = 'Sold out'
            } else {
                this.text_button = 'Add to card'
            }
        },
        getProduct(selectedOptions, quantity) {
            let matchProduct = null
            this.product.variants.map((item) => {
                const attProduct = item.attributes
                const isMatch = Object.values(selectedOptions).every((value, index) => {
                    return attProduct[index].label === value;
                });

                if (isMatch) {
                    matchProduct = item.product
                }
            })
            this.productAddCart = {
                matchProduct,
                quantity
            }
        },
        addCart() {
            console.log(this.productAddCart)
        },
    },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@400;600;700&display=swap');

.list_image {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.product-des {
    margin-top: 56px;
}

.list_image .slick-list {
    flex-basis: 0;
    flex-grow: 1;
    margin-left: 24px;
    position: relative;
    height: 0;
    padding-bottom: calc(100% - 88px);
}

.list_image .slick-list .slick-track {
    position: absolute;
    height: 100%;
    top: 0;
}

.slick-dots {
    position: unset;
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.product_image .list_image.slick-slider {
    margin-bottom: 0;
}

.list_image .slick-dots li {
    position: unset;
    width: fit-content;
    height: fit-content;
    margin: 0;
    margin-bottom: 16px;
}

.list_image .slick-dots li:last-child {
    margin-bottom: 0;
}

.list_image .slick-dots li button:before {
    content: unset;
}

.list_image .slick-dots li button {
    padding: 0;
    min-width: 64px;
    min-height: 64px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.container {
    margin: 0 auto;
    max-width: 1280px;
    padding: 0 20px;
    font-family: 'Montserrat', sans-serif;
}

.opt_variant label {
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    font-family: 'Oswald', sans-serif;
}

.opt_variant select {
    font-family: 'Montserrat', sans-serif;
}

.seclect_opt {
    margin-top: 4px;
    height: 50px;
    border-color: #E4E4E4;
    border-radius: 3px;
    padding-left: 18px;
    font-size: 14px;
    color: #4A4A4A;
}

.reviews {
    line-height: 24px;
    padding-left: 4px;
    text-transform: capitalize;
    text-decoration: underline;
    font-size: 12px;
    color: grey;
}

.star {
    padding: 0 2px;
}

.group {
    margin-top: 56px;
    box-shadow: 8px 8px 40px 10px rgba(0, 0, 0, .08);
    padding: 24px 32px 24px 24px;
}

.product_name {
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    margin-bottom: 40px;
    margin-top: 0;
    line-height: 28px;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.price {
    font-size: 32px;
    font-weight: 600;
    display: block;
    padding-bottom: 20px;
    line-height: 34px;
    border-bottom: 1px solid #E4E4E4;
}

.quantity {
    border: 1px solid #e4e1e1;
    display: flex;
    border-radius: 3px;
    width: 108px;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
}

.quantity button {
    display: flex;
    padding: 0;
    min-width: 34px;
    justify-content: center;
}

.right {
    right: 0;
}

.add_to-cart {
    padding: 0;
    flex-basis: 0;
    flex-grow: 1;
    border-radius: 3px;
    background-color: #8AD038;
    border: none;
    font-family: 'Montserrat', sans-serif;
    line-height: 13px;
    font-size: 18px;
    font-weight: 700;
    color: white;
}

.left {
    left: 0;
}

.variants {
    display: flex;
    margin-top: 20px;
    gap: 18px;
    margin-bottom: 16px;
}

.variants>div {
    width: 50%;
}

.variants label {
    font-size: 16px;
    font-weight: 600;
}

.add_cart {
    display: flex;
    height: 50px;
    gap: 16px;
}

.rating {
    padding-bottom: 4px;
    display: flex;
    align-items: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    width: 100%;
    border-radius: unset;
    border: none;
    text-align: center;
    padding: 0;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    -moz-appearance: textfield;
}

.why_choose {
    margin-top: 16px;
    padding: 24px 24px;
    border-radius: 5px;
    background-color: #F4F4F4;
}

select {
    width: 100%;
}

input:focus,
select {
    outline: none;
}

.minus,
.add {
    border: none;
    border-radius: unset;
    background-color: transparent;
}

.skeleton_image {
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 100%;
}

.image_item.selected {
    border: 1px solid black;
}

.image_item:last-child {
    margin-bottom: 0;
}

.image_item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image_current {
    margin-left: 24px;
    position: relative;
    width: 100%;
}

.skeleton_image img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
    top: 0;
}

.button_slide {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 30px;
}

.pagebuilder-column-line .pagebuilder-column:first-child {
    margin-bottom: 16px;
}

 #html-body .pagebuilder-column-line .pagebuilder-column {
    display: flex;
    align-items: center;
    flex-direction: row;
}

.pagebuilder-mobile-hidden {
    display: none;
}

.pagebuilder-column-group {
    margin-bottom: 16px;
}

.why_choose .pagebuilder-column figure {
    margin: 0;
    height: 24px;
    min-width: 42px;
}

#html-body .pagebuilder-column figure img {
    height: 100%;
    object-fit: contain;
}

.pagebuilder-column p {
    font-size: 13px;
    line-height: 30px;
    font-weight: 600;
    color: #8C9199;
    margin: 0;
}

.why_choose .pagebuilder-column .car-icon {
    height: 18px;
}

@media only screen and (min-width: 1024px) {
    .product {
        display: flex;
    }

    .product_information {
        text-align: left;
        margin-left: 38px;
        width: 50%;
    }

    .product_image {
        display: flex;
        width: 50%;
    }

    .pagebuilder-column-line {
        display: flex;
    }

    .pagebuilder-column-line .pagebuilder-column:first-child {
        margin-bottom: 0;
    }

    .pagebuilder-column {
        width: 50%;
    }
}
</style>
  