<template>
  <div v-for="item in product.items" :key="item">
    <ProductInfor :product="item" />
    <ProductDes :product="item" />
    <ProductRelated :product="item" />
    <ProductRecently :product="item" />
  </div>
</template>

<script>
import { GET_PRODUCT } from '@/grapql/query_product';
import ProductInfor from '@/components/Product_infor.vue';
import ProductDes from '@/components/Product_description.vue';
import ProductRelated from '@/components/ProductRelated.vue';
import ProductRecently from '@/components/ProductRecently.vue';

export default {
  name: "ProductPage",
  props: {
		sku: String, // Declare the sku prop
	},
  data() {
    return {
      product: ''
    };
  },
  components: {
    ProductInfor,
    ProductDes,
    ProductRelated,
    ProductRecently
  },
  apollo: {
    product: {
      query: GET_PRODUCT,
      variables() {
        return {
          sku: this.sku, // Use the SKU parameter from the route
        };
      },
    },
  }
}
</script>