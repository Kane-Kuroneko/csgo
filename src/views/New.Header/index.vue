<template>
	<div class = "main-header-container">
		<HeaderLogoLogin/>
		<HeaderMainTabs/>
	</div>
</template>

<script>
import HeaderLogoLogin from './Header-Logo-Login.vue';
import HeaderMainTabs from './Header-MainTabs.vue';
import HeaderMyPreciousSwiper from './Header-DropPrecious-Swiper.vue';
export default reaxper({
	status(){
		return {
			
		}
	},
	components : {
		HeaderLogoLogin ,
		HeaderMainTabs,
		HeaderMyPreciousSwiper,
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
