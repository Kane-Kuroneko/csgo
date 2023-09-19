<template>
	<div class="hr-title">
		<img
			:src="imgHrLeft"
		>
		<span>
			<slot>{{ title }}</slot>
		</span>
		<img
			:src = "imgHrRight"
		>
	</div>
</template>

<script>
import imgHrLeft from './hr-left.svg';
import imgHrRight from './hr-right.svg';
export default {
	data(){
		return {
			imgHrLeft,
			imgHrRight,
		}
	},
	props : ['title']
}
</script>
<style
	lang="less"
	scoped
>

.hr-title{
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 22px 0;
	width: 100%;
	span{
		font-size: 42px;
		font-weight: bold;
		color: white;
		margin: 0 40px;
		white-space: nowrap;
	}
	img{
		width: 40%;
	}
}
html[data-reaxel-reactive-device="mobile-full-screen"],html[data-reaxel-reactive-device="mobile-non-full-screen"]{
	
	.hr-title{
		margin: 5vw 0;
		
		span {
			margin: 0 10vw;
			font-size: 7vw;
		}
		img{
			width: 40%;
		}
	}
	
	
}
</style>
