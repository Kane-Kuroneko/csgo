<template>
	<div  class = "drop-precious-container" >
		<div
			v-if="baseInfo"
			class = "online-users" style="padding: 12px 29px;"
		>
			<span>开箱展示</span>
			<span style="    display: flex;
    align-items: baseline;">
				<!-- <span class = "green-dot"></span> -->
				<span style="color: #fff;font-size: 20px;">{{ baseInfo.userOnline }} </span><span style="font-size: 10px;color:#FFF ;">人</span>
			</span>
			<span style="color: #93E09F;">在线人数</span>
		</div>
		<div class = "precious-swiper-container" :style="{width:isPhone ? '100%' : 'calc(100% - 116px)' }">
			<div v-if = "dropPreciousData">
				<swiper
					:options = "swiperOption"
					ref = "notice"
					style = "height: 100%"
					v-if = "dropPreciousData.length > 0"
				>
					<swiper-slide
						v-for = "el in dropPreciousData"
						:key = "el.id"
						class = "luck-width"
					>
						<div
							class="precious-box"
							:style="{'background-image':`url('${
								colorMapping[conversionStyle(el.rarity, el.category)].preciousBg
							}')`,'border-bottom':`2px solid ${colorMapping[conversionStyle(el.rarity, el.category)].borderColor}`}"
						>
							<span
								class="success-rate"
								:style="{'visibility' : el.successRate != null ? 'visible' : 'hidden'}"
							>
								<img :src="imgLevel">
								<span class="lv-text">{{ (+ el.successRate).toFixed(3) }}</span>
							</span>
							<img width="64" height="64" :src="	(el.stuffImage)">
							<span class="name">{{ el.stuffName.split("|")[0] }}</span>
							<span>{{ el.stuffName.split("|")[1] }}</span>
						</div>
						<div
							class="precious-box-sel"
						>
							<img class="user-avatar" :src="imgHost(el.avatar)" width="50" height="50">
							<span>{{ el.userName }}</span>
						</div>
						
					</swiper-slide>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
const reax_Initial = reaxel_initial();
export default reaxper({
	status () {
		const { dropPreciousData,baseInfo ,initialStore,} = reax_Initial,{
			isPhone
		} = initialStore;
		return {
			isPhone,
			initialStore,
			dropPreciousData ,
			baseInfo,
		};
	} ,
	components : {
		swiper ,
		swiperSlide ,
	} ,
	data () {
		return {
			see:null,
			imgUpicon ,
			imgLevel,
			colorMapping:{
				'gold':{
					preciousBg: imgPreciousBgGold,
					borderColor :"#FFA406",
				},
				'red':{
					preciousBg: imgPreciousBgRed,
					borderColor :"#EB4B4B",
				},
				'pink':{
					preciousBg: imgPreciousBgPink,
					borderColor :"#FF0AE5",
				},
				'purple':{
					preciousBg: imgPreciousBgPurple,
					borderColor :"#C80AFF",
				},
				'blues':{
					preciousBg: imgPreciousBgBlues,
					borderColor :"#0A3CFF",
				},
				'blue':{
					preciousBg: imgPreciousBgBlue,
					borderColor :"#059EFF",
				},
				'white':{
					preciousBg: imgPreciousBgWhite,
					borderColor :"#A2A2A2",
				},
			},
			swiperOption : {
				slidesPerView : "auto" ,
				spaceBetween : 1 , 
				// slidesPerGroup: 'auto',
				loopFillGroupWithBlank : false ,
				loop : true ,
				autoplay : {
					reverseDirection : true ,
					delay : 2000 ,
					disableOnInteraction : true ,
				} ,
				speed : 2000 ,
				observer : false ,
				//修改swiper自己或子元素时，自动初始化swiper
			} ,
		};
	} ,
	mounted () {
		const { requestBaseInfo } = reax_Initial;
		requestBaseInfo();
	} ,
});

import imgUpicon from '@/assets/image/upicon.png';
import { reaxel_initial } from "@/reaxels/initial";
import {
	swiper ,
	swiperSlide ,
} from "vue-awesome-swiper";
import imgDropPreciousBg from '@/assets/image/New.images/top_a_1c.png';
import imgLevel from './level.svg';
import imgPreciousBgGold from './img.png';
import imgPreciousBgRed from './img_1.png';
import imgPreciousBgPink from './img_2.png';
import imgPreciousBgPurple from './img_3.png';
import imgPreciousBgBlues from './img_4.png';
import imgPreciousBgBlue from './img_6.png';
import imgPreciousBgWhite from './img_5.png';


</script>

<style
	scoped
	lang = "less"
>

.luck-width{
	&:hover{
		
		.precious-box{
			display: none;
		}
		.precious-box-sel{
			display: flex !important;
		}
	}
	.precious-box-sel{
		display: none;
	}
}

/deep/.swiper-wrapper{
	row-gap: 4px;
}

/deep/.swiper-container{
	
	background-color: rgb(35,35,45);
}

.drop-precious-container {
	display: flex;
	flex-flow: row nowrap;
	width: 100%;
	overflow: hidden;
	
	.precious-swiper-container {
		width: calc(100% - 116px);
	}
	.online-users {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		padding: 34px 26px;
		background-color: rgb(35,35,45);
		
		& > span:first-child {
			color: #dcae64;
			font-size: 16px;
			white-space: nowrap;
		}
		
		& > span:last-child {
			display: flex;
			align-items: center;
			
			& > span:first-child {
				display: block;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: #0AFF0A;
			}
			
			& > span:last-child {
				color: white;
				font-size: 16px;
				margin-left: 11px;
			}
		}
	}
	
	.precious-box {
		width: 116px;
		height: 116px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: center;
		
		.success-rate {
			display: flex;
			margin-top: 2px;
			display: flex;
			align-items: center;
			
			.lv-text{
				color: #4BABE3;
				font-size: 12px;
				margin-left: 4px;
			}
		}
		span.name {
			color: white;
			font-size: 10px;
			word-wrap: anywhere;
			line-break: anywhere;
		}
		& > span:last-child{
			color: rgba(255,255,255,.4);
			font-size: 10px;
			margin-bottom: 6px;
		}
	}
	
	.precious-box-sel{
		width: 116px;
		height: 116px;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		
		img.user-avatar{
			border-radius: 50%;
			margin-bottom: 16px;
		}
	}
}

</style>
