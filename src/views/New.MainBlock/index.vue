<template>
	<div class = "main-block-container">
		<HomeWAP v-if="isPhone" />
		<HomePC v-else />
	</div>
</template>

<script>
import HomePC from '@/views/New.MainBlock/Home.PC/index.vue';
import HomeWAP from './Home.Wap/index.vue';
import { reaxel_initial } from '@/reaxels/initial';
const reax_Initial = reaxel_initial(),{
	initialStore,
	
} = reax_Initial;
export default reaxper({
	status(){
		const { isPhone } = initialStore;
		return {
			isPhone,
			initialStore,
		}
	},
	components : {
		HomePC ,
		HomeWAP,
	},
});
</script>

<style
	scoped
	lang = "less"
>
.main-block-container {
	display: flex;
	flex-flow: column nowrap;
}
</style>
