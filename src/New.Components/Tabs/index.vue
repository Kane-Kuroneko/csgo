<template>
	<div
		class="tabs-container"
	>
		<div
			v-for="{title,key,onSelect,iconUrl} in tabs"
			class="tab-pane"
			:class="{selected : key === selection}"
			@click.stop="onSelect(key)"
		>
			<img width="30" height="30" :src="iconUrl">
			<span class="title">{{ title }}</span>
		</div>
	</div>
</template>


<script>



export default {
	status(){
		const {store,setState} = this;
		return {
			store,
			setState,
		}
	},
	props : ['tabs','selection'],
	methods:{
		
	},
	created () {
		const {store,setState,} = orzMobx({
			
		})
		Object.assign(this,{store,setState});
	},
	data(){
		return {
			
		}
	},
};
</script>


<style
	lang="less"
	scoped
>
.tabs-container{
	display: flex;
	width: 100%;
	justify-content: center;
	padding-bottom: 30px;
	border-bottom: 1px solid #32343E;
	
	.tab-pane{
		display: flex;
		width: 220px;
		height: 42px;
		align-items: center;
		justify-content: center;
		background: #27285D;
		margin-left: 10px;
		user-select: none;
		cursor: pointer;
		
		&:first-child{
			margin: 0;
		}
		
		&.selected{
			background: linear-gradient(90deg, #1C67BD 0%, #43BDE9 100%);
		}
		img{
			
		}
		span.title{
			color: white;
			font-size: 20px;
			font-weight: bold;
			margin-left: 10px;
		}
	}
}
</style>
