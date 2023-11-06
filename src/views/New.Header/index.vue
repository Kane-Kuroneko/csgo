<template>
	<div class = "main-header-container">
		<HeaderLogoLogin></HeaderLogoLogin>
		<HeaderMainTabs></HeaderMainTabs>
	</div>
</template>

<script>
import HeaderDropPreciousSwiper from "@/views/New.Header/Header-DropPrecious-Swiper.vue";
import HeaderLogoLogin from './Header-Logo-Login.vue';
import HeaderMainTabs from './Header-MainTabs.vue';
export default reaxper({
	components : {
		HeaderDropPreciousSwiper,
		HeaderLogoLogin ,
		HeaderMainTabs,
	},
});
</script>

<style
	scoped
	lang = "less"
>
@main-bg-color:#1F1E27;

.main-header-container {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	overflow: hidden;
	background-color: @main-bg-color;
	width: 100%;
	position: sticky;
	top: 0;
	//min-width: 1400px;
	
	z-index: 100;
	
	& > div {
		
		//min-width: 1280px;
	}
}
</style>
