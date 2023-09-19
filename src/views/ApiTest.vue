<template>
    <div v-for="category in categories.items" :key="category.id">
		<router-link :to="{ name: 'CategoryPage', params: { id: category.id } }">
			<h2>{{ category.name }}</h2>
		</router-link>
	</div>
</template>
<script>

import { GET_ALL_CATEGORIES } from '@/grapql/query_category';
export default {
	name: "CategoryPage",
	apollo: {
		categories: {
			query: GET_ALL_CATEGORIES,
			
		},
	},
	methods: {
		
	},
};
</script>