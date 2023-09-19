<template>
	<div
		class = "hash-module hide-rrweb"
		:class = "{ show:value }"
	>
		<div
			class = "hash-box"
			:class = "{ origion, show: value }"
			:style = "{ width: width + 'rem' }"
		>
			<div class = "hash-header">
				<div class = "hash-title">{{ title }}</div>
				<i
					class = "iconfont iconicon-close"
					@click = "closeModule()"
				></i>
			</div>
			<div class = "hash-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : "HashModule" ,
	inheritAttrs : false ,
	props : {
		close:Function,
		value : {
			type : Boolean ,
		} ,
		title : {
			default : "创建对战" ,
			type : String ,
		} ,
		origion : {
			default : "" ,
			type : String ,
		} ,
		width : {
			default : 7 ,
		} ,
	} ,
	watch : {
		value (nv) {
			this.isShow = nv;
		} ,
	} ,
	methods : {
		closeModule () {
			this.$emit("input" , false);
			this.$props.close?.();
		} ,
	} ,
	updated () {
		if(this.$props.value){
			console.log(this.$props);
		}
	}
};
</script>

<style
	scoped
	lang = "less"
>
.hash-module {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	top: 0;
	left: 0;
	z-index: 10001;
	display: flex;
	justify-content: center;
	align-items: center;
	visibility: hidden;
	opacity: 0;
	overflow-y: auto;
	transition: all 0.4s ease-in-out 0.2s;
}

.hash-module.show {
	opacity: 1;
	visibility: visible;
	z-index: 10001;
}

.hash-module.show .modal-box-bg {
	transform: scale(1);
}

.hash-box {
	background: url("../../assets/image/img.png") top no-repeat,
	#242230 no-repeat bottom right / 20%;
	border-top: 2px solid #763aff;
	box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.9);
	font-size: 0.22rem;
	color: #ffffff;
	margin: 0 auto;
	background-size: contain;
	position: relative;
}

.hash-header {
	padding: 10px 15px 15px 0;
	position: relative;
	//background: url("../../assets/image/moduleTop.png") no-repeat top center /  70%;
	
	.hash-title {
		text-align: center;
		font-family: "PingFang SC";
		font-weight: bold;
		letter-spacing: 2px;
	}
	
	i {
		position: absolute;
		right: 3%;
		top: 19%;
		opacity: 0.5;
		cursor: pointer;
	}
}

.hash-content {
	padding: 15px 20px;
	max-height: 700px;
	overflow-y: auto;
	/*background: teal;*/
}

@media screen and (max-width: 767px) {
	.hash-box {
		width: 90% !important;
	}
	
	.hash-content {
		padding: 10px;
		max-height: 450px;
		overflow: auto;
	}
}
</style>
