<template>
	<WAP v-if="isPhone"/>
	<PC v-else/>
</template>


<script>
import { reaxel_initial } from '@/reaxels/initial';
import PC from './PC';
import WAP from './WAP';
export default reaxper({
	status(){
		const { isPhone } = reaxel_initial();
		return {
			isPhone,
		}
	},
	components : {
		PC,
		WAP,
	}
});
</script>

<style>

</style>
