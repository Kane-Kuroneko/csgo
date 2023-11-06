<template>
	<div>
		<div @click="count ++">
			count : {{ count }}
		</div>
		<div @click="mutate(s => s.ct ++)">
			ct : {{ store.ct }}
		</div>
	</div>
</template>

<script>
const {store,mutate} = orzMobx({
	ct : 0
})
export default reaxper({
	status(){
		console.log(store.ct);
		return {
			store
		}
	},
	watch:{
		count (){
			console.log(this.count);
		}
	},
	methods:{
		mutate,
	},
	data(){
		return {
			count : 0,
		}
	}
})
</script>
