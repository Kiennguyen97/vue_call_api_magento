<template>
<div v-if="categories && products">
	<!-- Desktop content -->
	<div class="content-desktop">
		<h2 class="category-title">{{ categories.items[0].name }}</h2>
		<div class="category-content">
			<div class="sidebar">
				<div class="filtered-box">
					<h2 class="heading">FILTERED BY</h2>
					<!-- add filter here -->
					<div v-if="colorOption" class="filtered-category">
						<img src="../assets/close_icon.png" @click="unselectColor"> Color: {{ colorOption }}	
					</div>
					<div v-if="sizeOption" class="filtered-category">
						<img src="../assets/close_icon.png" @click="unselectSize"> Size: {{ sizeOption }}	
					</div>
					<div v-if="priceOption" class="filtered-category">
						<img src="../assets/close_icon.png" @click="unselectPrice"> Price: {{ priceOption }}$	
					</div>
					
					<p class="clear-button" @click="unselectAll">Clear all</p>
				</div>
				<div class="category-box">
					<div class="category">
						<h2 class="heading">TYPES</h2>
						<!-- add types here -->
						
					</div>
					<div class="category">
						<h2 class="heading">FEATURES</h2>
						<!-- add features here -->
						<div class="filter" data-content-type="text">
							<h3>COLOR</h3>
							<div v-for="aggregation in products.aggregations" :key="aggregation.count">
								<div v-if="aggregation.attribute_code == 'colour'">
									<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectColor(option.label)">
										{{ option.label }} ({{ option.count }})
									</p>
								</div>
							</div>
						</div>
						<div class="filter" data-content-type="text">
							<h3>SIZE</h3>
							<div v-for="aggregation in products.aggregations" :key="aggregation.count">
								<div v-if="aggregation.attribute_code == 'size'">
									<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectSize(option.label)">
										{{ option.label }} ({{ option.count }})
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="category">
						<h2 class="heading">BRANDS</h2>
						<!-- add brands here -->
						
					</div>
					<div class="category">
						<h2 class="heading">PRICE</h2>
						<!-- add price here -->
						<div class="filter" data-content-type="text">
							<!-- <h3>Price</h3> -->
							<div v-for="aggregation in products.aggregations" :key="aggregation.count">
								<div v-if="aggregation.attribute_code == 'price'">
									<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectPrice(option.label)">
										{{ option.label }}$ ({{ option.count }})
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="product-box">
				<div class="product-header" v-if="products.total_count > 0">
					<div class="product-sort">
						<label for="sort-select">Sort by:</label>
						<select id="sort-select" v-model="currentSort" @change="changeSort(currentSort)">
							<option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
						</select>
						<!-- <vue-select :options="sortOptions.label" :key="sortOptions.value" :value="sortOptions.value" v-model="currentSort" @change="changeSort(currentSort)">
						</vue-select> -->
					</div>
					<div class="paginator">
						<button @click="previousPage" :disabled="currentPage === 1">Previous</button>
						<span>{{ currentPage }}</span>
						<button @click="nextPage(products.page_info)" :disabled="currentPage === products.page_info.total_pages">Next</button>
					</div>
					<div class="product-show">
						<label for="show-select">Show:</label>
						<select id="show-select" v-model="pageSize" @change="changeSize(pageSize)">
							<option v-for="option in pageSizeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
						</select>
						per page.
					</div>
				</div>
				<div class="product-content">
					<div class="product-category" v-if="products">
						<div class="product-container" v-for="product in products.items" :key="product.sku">
							<a :href="'/product/' + product.sku" class="router-link"	>
								<img :src="product.thumbnail.url" alt="Product Thumbnail">
								<p class="product-name">{{ product.name }}</p>
								<p class="product-price">{{ product.price_range.minimum_price.regular_price.value }} {{ product.price_range.minimum_price.regular_price.currency }}</p>
							</a>
						</div>
						<p v-if="products.total_count === 0">No products available.</p>
					</div>
				</div>
				<div class="product-footer" v-if="products.total_count > 0">
					<div class="paginator">
						<button @click="previousPage" :disabled="currentPage === 1">Previous</button>
						<span>{{ currentPage }}</span>
						<button @click="nextPage(products.page_info)" :disabled="currentPage === products.page_info.total_pages">Next</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile content -->
	<div class="content-mobile">
		<h2 class="category-title">{{ categories.items[0].name }}</h2>
		
		<div class="product-box">
			<div class="product-header" v-if="products.total_count > 0">
				<div class="sidebar-slideout" id="sidebar-slideout">
					<div @click="sidebarSlideout">
						<div class="filter-button">Filters:<img src="../assets/select_acc.png"></div>
					</div>
					<div class="sidebar-slideout-content">
						<div class="sidebar-header">
							<h2>FILTERS</h2><img src="../assets/close_white_icon.png" @click="sidebarSlideout">
						</div>
						<div class="filtered-box">
							<h2 class="heading">FILTERED BY</h2>
							<!-- add filter here -->
							<div v-if="colorOption" class="filtered-category">
								<img src="../assets/close_icon.png" @click="unselectColor"> Color: {{ colorOption }}	
							</div>
							<div v-if="sizeOption" class="filtered-category">
								<img src="../assets/close_icon.png" @click="unselectSize"> Size: {{ sizeOption }}	
							</div>
							<div v-if="priceOption" class="filtered-category">
								<img src="../assets/close_icon.png" @click="unselectPrice"> Price: {{ priceOption }}$	
							</div>
							
							<p class="clear-button" @click="unselectAll">Clear all</p>
						</div>
						<div class="category-box">
							<div class="category">
								<h2 class="heading">TYPES</h2>
								<!-- add types here -->
								
							</div>
							<div class="category">
								<h2 class="heading">FEATURES</h2>
								<!-- add features here -->
								<div class="filter" data-content-type="text">
									<h3>COLOR</h3>
									<div v-for="aggregation in products.aggregations" :key="aggregation.count">
										<div v-if="aggregation.attribute_code == 'colour'">
											<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectColor(option.label)">
												{{ option.label }} ({{ option.count }})
											</p>
										</div>
									</div>
								</div>
								<div class="filter" data-content-type="text">
									<h3>SIZE</h3>
									<div v-for="aggregation in products.aggregations" :key="aggregation.count">
										<div v-if="aggregation.attribute_code == 'size'">
											<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectSize(option.label)">
												{{ option.label }} ({{ option.count }})
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="category">
								<h2 class="heading">BRANDS</h2>
								<!-- add brands here -->
								
							</div>
							<div class="category">
								<h2 class="heading">PRICE</h2>
								<!-- add price here -->
								<div class="filter" data-content-type="text">
									<!-- <h3>Price</h3> -->
									<div v-for="aggregation in products.aggregations" :key="aggregation.count">
										<div v-if="aggregation.attribute_code == 'price'">
											<p class="filter-text" v-for="option in aggregation.options" :key="option.value" @click="selectPrice(option.label)">
												{{ option.label }}$ ({{ option.count }})
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="product-show">
					<label for="show-select">Show:</label>
					<select id="show-select" v-model="pageSize" @change="changeSize(pageSize)">
						<option v-for="option in pageSizeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
				<div class="product-sort">
					<label for="sort-select">Sort by:</label>
					<select id="sort-select" v-model="currentSort"  @change="changeSort(currentSort)">
						<option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
					</select>
				</div>
			</div>
			<div class="product-content">
				<div class="product-category" v-if="products">
					<div class="product-container" v-for="product in products.items" :key="product.sku">
						<a :href="'/product/' + product.sku" class="router-link"	>
							<img :src="product.thumbnail.url" alt="Product Thumbnail">
							<p class="product-name">{{ product.name }}</p>
							<p class="product-price">{{ product.price_range.minimum_price.regular_price.value }} {{ product.price_range.minimum_price.regular_price.currency }}</p>
						</a>
					</div>
					<p v-if="products.total_count === 0">No products available.</p>
				</div>
			</div>
			<div class="product-footer" v-if="products.total_count > 0">
				<div class="paginator">
					<button @click="previousPage" :disabled="currentPage === 1">Previous</button>
					<span>{{ currentPage }}</span>
					<button @click="nextPage(products.page_info)" :disabled="currentPage === products.page_info.total_pages">Next</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div v-else>
    Loading... <!-- or any other loading indicator you prefer -->
</div>
<NewSletter />
</template>
<script>
	// import { useRoute } from 'vue-router';
	import { GET_CATEGORIES } from '@/grapql/query_category';
	import { GET_PRODUCT_FILTER } from '@/grapql/query_product';
	import NewSletter from '@/components/NewSletter.vue';
	// import { VueSelect } from 'vue-select';
	const $ = window.$

	export default {
		name: "CategoryPage",
		props: {
			url_key: String, // Declare the id prop
		},
		components: {
			NewSletter,
			// VueSelect,
		},
		data() {
			return {
				pageSize: 4,
				currentPage: 1,
				sortOptions: [
					{ label: 'Default', value: 'default' },
					{ label: 'Name A-Z', value: 'name-asc' },
					{ label: 'Name Z-A', value: 'name-desc' },
					{ label: 'Price Ascending', value: 'price-asc' },
					{ label: 'Price Descending', value: 'price-desc' },
				],
				pageSizeOptions: [
					{ label: 4, value: 4 },
					{ label: 8, value: 8 },
					{ label: 12, value: 12 },
				],
				currentSort: 'default',
				colorOption: '',
				sizeOption: '',
				priceOption: '',
				categoryId: '',
			};
		},
		apollo: {
			products: {
				query: GET_PRODUCT_FILTER,
				variables() {
					let sortOption = {};
					if (this.currentSort === 'name-asc') {
						sortOption = { name: 'ASC' };
					} else if (this.currentSort === 'price-asc') {
						sortOption = { price: 'ASC' };
					} else if (this.currentSort === 'name-desc') {
						sortOption = { name: 'DESC' };
					} else if (this.currentSort === 'price-desc') {
						sortOption = { price: 'DESC' };
					} else {
						sortOption = { relevance: 'ASC' };
					}
					return {
						// Use the name parameter from the route
						id: this.categoryId,
						pageSize: this.pageSize,
						currentPage: this.currentPage,
						sort: sortOption
					};	
				},
				result(result) {
					if (!result.loading && !result.error) {
						// Check if the query has finished loading and has no errors
						console.log(result.data.products); // Access the query result here
					}
				},
			},
			categories: {
				query: GET_CATEGORIES,
				variables() {
					return {
						// Use the name parameter from the route
						url_key: this.url_key,	
					};
				},
				result(result) {
					if (!result.loading && !result.error) {
						// Check if the query has finished loading and has no errors
						console.log(result.data.categories); // Access the query result here
						this.categoryId = result.data.categories.items[0].id;
					}
				},
			},	
		},
		methods: {
			// Function to change sorting option
			changeSort(option) {
				this.currentSort = option;
			},
			changeSize(option) {
				this.pageSize = option;
			},
			// Function to update pageSize and currentPage
			updatePagination(newPageSize, newCurrentPage) {
				this.pageSize = newPageSize;
				this.currentPage = newCurrentPage;
			},
			// Function to navigate to the previous page
			previousPage() {
				if (this.currentPage > 1) {
					this.updatePagination(this.pageSize, this.currentPage - 1);
				}
			},
			// Function to navigate to the next page
			nextPage(pageInfo) {
				if (this.currentPage < pageInfo.total_pages) {
					this.updatePagination(this.pageSize, this.currentPage + 1);
				}
			},
			selectColor(option) {
				this.colorOption = option;
			},
			selectPrice(option) {
				this.priceOption = option;
			},
			selectSize(option) {
				this.sizeOption = option;
			},
			unselectColor() {
				this.colorOption = '';
			},
			unselectSize() {
				this.sizeOption = '';
			},
			unselectPrice() {
				this.priceOption = '';
			},
			unselectAll() {
				this.unselectColor();
				this.unselectSize();
				this.unselectPrice();
			},
			sidebarSlideout() {
				document.getElementById('sidebar-slideout').classList.toggle('active');
				document.querySelector('body').classList.toggle('open-sidebar-slideout');
			},
		},
		updated() {
			// Unbind previous click event handlers
			$('.category h2').off('click');

			// Attach new click event handler
			$('.category h2').click(function () {
				$(this).siblings('[data-content-type="text"]').slideToggle();
				$(this).toggleClass('active');
			});
		}
	}
</script>
<style scoped>
@import "vue-select/dist/vue-select.css";

.content-desktop {
	display: none;
}

.content-mobile {
	display: flex;
	flex-wrap: wrap;
	/* align-items: center; */
	justify-content: center;
	width: 100%;
	margin-bottom: 64px;
}

.open-sidebar-slideout {
	height: 300vh;
	overflow: hidden;
}

.sidebar-slideout-content {
	background: #fff;
	position: fixed;
	top: 0;
	width: 90%;
	left: -100%;
	transition: all 0.3s;
	z-index: 99;
	height: 100vh;
}

.sidebar-slideout.active .sidebar-slideout-content {
	left: 0;
	overflow-y: scroll;
}

.sidebar-slideout-content .sidebar-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;
	background-color: #4A4A4A;
}

.sidebar-slideout-content .sidebar-header h2 {
	color: #FFFFFF;
	font-family: Oswald;
}

.sidebar-slideout-content .sidebar-header img {
	width: 20px;
	height: 20px;
}

.category-title {
	width: 100%;
	color: #8AD038;
	font-family: Oswald;
	font-size: 42px;
	font-weight: 500;
	letter-spacing: 0;
	line-height: 34px;
	text-align: center;
	border-bottom: 1px solid #EEEEEE;
	padding-bottom: 50px;
	margin-bottom: 0;
}

.paginator {
	display: flex;
	align-items: center;
	justify-content: center;
}

button {
	color: #4A4A4A;
    font-family: Montserrat;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 26px;
	padding: 0 20px;
	border: none;
	background: none;
	cursor: pointer;
}

.router-link {
	text-decoration: none;
	color: #000000;
	text-align: left;
}

.sidebar{
	display: flex;
	flex-direction: column;
	column-gap: 15px;
	max-width: 244px;
}

.filtered-box {
	
	box-sizing: border-box;
	height: fit-content;
	border: 1px solid #EEEEEE;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.08);
}

.filtered-box .filtered-category {
	display: flex;
	text-align: left;
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 16px;
	letter-spacing: 0;
	line-height: 26px;
	align-items: center;
	margin-top: 4px;
}

.filtered-box .filtered-category img {
	width: 16px;
	height: 16px;
	margin-right: 6px;
}

.filtered-box h2 {
	font-weight: 500;
	padding: 20px 0 17px;
	padding-left: 15px;
	margin: 0;
	color: #000000;
	font-family: Oswald;
	font-size: 15px;
	letter-spacing: 0.5px;
	line-height: 17px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #EBEBEB;
}

.category {
	border-top: 1px solid #EBEBEB;
	text-align: left;
	padding: 0 15px;
}

.category:first-child {
	border: none;
}

.category h2 {
	font-weight: 500;
	padding: 0 173px 18px 0;
	margin-bottom: 0;
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	font-size: 15px;
	line-height: 17px;
	display: flex;
	justify-content: space-between;
}

.category h2:after {
	content: '';
	width: 14px;
	height: 14px;
	background-image: url('../assets/plus-footer-icon.jpg');
	display: block;
	background-size: contain;
}

.category h2.active:after {
	background-image: url('../assets/minus-footer-icon.jpg');
}

.category [data-content-type="text"] {
	display: none;
	padding-bottom: 10px;
	margin-top: -5px;
}

.filter-text, option, label, select {
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 13px;
	letter-spacing: 0;
	line-height: 26px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.filter-text:hover {
	background-color: #f0f0f0;
}

.filter-button {
	display: flex;
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 14px;
	letter-spacing: 0;
	line-height: 22px;
	align-items: center;
}

.filter-button img {
	width: 16px;
	height: 16px;
}

.clear-button{
	height: 22px;
	width: fit-content;
	color: #000000;
	font-family: Montserrat;
	font-size: 13px;
	letter-spacing: 0;
	line-height: 22px;
	cursor: pointer;
	text-decoration: underline;
	padding-left: 15px;
}

.filter {
    text-align: left;
}

.filter h3 {
	color: #000000;
	font-family: Oswald;
	letter-spacing: 0.5px;
	line-height: 17px;
	font-size: 14px;
}

.category-box {
	/* padding-left: 15px; */
	margin-top: 16px;
	box-sizing: border-box;
	height: fit-content;
	border: 1px solid #EEEEEE;
	border-radius: 5px;
	background-color: #FFFFFF;
	box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.08);
}

select {
	height: 40px;
	border: 1px solid #E4E4E4;
	border-radius: 3px;
	margin: 0 10px;
	padding: 0 14px;
}

.sidebar-slideout {
	display: flex;
	align-self: center;
}

.product-sort {
	display: flex;
	align-items: center;
}

.product-sort select {
	width: 116px;
}

.product-show {
	display: flex;
	align-items: center;
	color: #4A4A4A;
	font-family: Montserrat;
	font-size: 14px;
}

.product-box {
	max-width: 1280px;
	margin: 0;
}

.product-header {
	display: flex;
	justify-content: space-between;
	padding: 0 16px;
}

.product-content {
	display: flex;
	flex-wrap: wrap;
	justify-content: left;
}

.product-category {
	display: grid;
	max-width: 1240px;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
	grid-template-columns: repeat(2,1fr);
	grid-gap: 8px 5px;
	margin-top: 10px;
}

.product-container {
	flex: 0 0 calc(15%);
	margin: 5px;
}

.product-name {
	height: 54px;
	width: 173px;
	color: #111111;
	font-family: Montserrat;
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 0;
	line-height: 18px;
}

.product-price {
	height: 24px;
	width: fit-content;
	color: #D0021B;
	font-family: Montserrat;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 0;	
	line-height: 24px;
}

.product-footer {
	margin-top: 48px;
}

.product-container img {
	width: 173px;
	height: 173px;
}

@media only screen and (min-width: 1024px) {
	.content-desktop {
		display: flex;
		flex-wrap: wrap;
		/* align-items: center; */
		justify-content: center;
		width: 100%;
		margin-bottom: 64px;
	}

	.content-mobile {
		display: none;
	}

	.product-name {
		height: 36px;
		width: 224px;
	}

	.category-content {
		display: flex;
		max-width: 1240px;
		padding: 32px 20px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.product-box {
		margin-left: 40px;
		
	}

	.product-category {
		display: grid;
		grid-template-columns: repeat(4,1fr);
		grid-gap: 40px 20px;
	}

	.product-container img {
		width: 224px;
		height: 224px;
	}

}

</style>