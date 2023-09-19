<template>
	<div>
		<button @click="increase()">
			click me !
		</button>
		<p>count : {{ count }}</p>
		<p>{{ value }}</p>
	</div>
</template>


<script>
import { reaxel_counter } from '@/reaxels/counter';
const {increase} = reaxel_counter();
export default reaxper({
	status(){
		const {value,count,} = reaxel_counter();
		return {
			value,count,
		}
	},
	methods : {
		increase(){
			increase();
		},
	}
})
</script>
