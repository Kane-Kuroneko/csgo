<template>
	<div class = "home-main-block">
		
		<div class="promotion-banner">
			<img
				:src="imgHomePromotionBanner"
				height="auto"
				width="100% "
				style="vertical-align: middle"
			>
		</div>
		<img
			class="promotion-hr"
			:src="imgBlindingPromotion"
			width="90%"
		>
		<div
			class="blinding-promotion"
			:style="{'background-image' : `url(${imgHomeBlindingPromotion})`}"
		>
			<div
				v-if = "promotions && promotions[0].boxVoList"
				class="promotion-content"
			>
				<div
					v-for="item in promotions[0].boxVoList"
					class="promotion-item-box"
					@click="setCurrentBox(item)"
				>
					<img
						width="96"
						height="96"
						:src="`https://picture.hzqinyun.com/${item.background}`"
					>
					<span>{{ item.name }}</span>
					<div
						:style="{'background-image' : `url('${imgPromotionTextBg}')`}"
					>
						<span>💎 {{ item.discountPrice }}</span>
					</div>
				</div>
			</div>
		</div>
		<img
			class="promotion-hr"
			:src="imgHomeRecommandedHr"
			width="90%"
		>
		<div
			class="home-recommanded-container"
			v-if="!!homeRecommandedBoxes && homeRecommandedBoxes.length"
		>
			
			<div class="swiper-container">
				<Swiper
					:options="swiperConf"
				>
					<SwiperSlide
						v-for="item in homeRecommandedBoxes"
						:key="item.id"
					>
						<div
							@click="setCurrentBox(item)"
							class="precious-card-container" :style="{'background-image':`url('https://picture.hzqinyun.com${item.beasemap}')`}"
						>
							<div class="card-head-info">
								<div class="probability">{{ item.probability }}胜</div>
								<div class="box--type">{{ {1: 'HASH箱',0:'???' }[item.boxType] }}</div>
							</div>
							<div class="card-name-price">
								<div class="precious-name">{{ item.name }}</div>
								<div class="precious-price">💎{{ item.price }}</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	</div>
</template>

<script>

const reax_Initial = reaxel_initial();
const reax_Box = reaxel_box();

export default reaxper({
	status(){
		const { promotions,homeRecommandedBoxes, } = reaxel_initial();
		return {
			promotions,
			homeRecommandedBoxes,
		}
	},
	data(){
		return {
			swiperConf : {
				effect: "coverflow",
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: "auto",
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				},
				loop : true,
				// pagination: {
				// 	el: ".swiper-pagination",
				// },
			} ,
			imgHomePromotionBanner,
			imgHomeBlindingPromotion,
			imgBlindingPromotion,
			imgPromotionTextBg,
			imgHomeRecommandedHr,
			imgRecommandedBoxPriceBg,
			
		}
	},
	components : {
		Swiper:swiper ,
		SwiperSlide:swiperSlide ,
	},
	mounted () {
		const { requestPromotions ,requestHomeRecommandedBoxes} = reaxel_initial();
		requestPromotions();
		requestHomeRecommandedBoxes();
	},
	methods : {
		setCurrentBox(item){
			reaxel_Audio().audios.goBox.play();
			localStorage.setItem("box" , JSON.stringify(item));
			reax_Box.setCurrentBox(item);
			this.$router.push('/steer/case')
		}
	}
	
});

import { reaxel_box } from '@/reaxels/box';
import { reaxel_initial } from '@/reaxels/initial';
import { reaxel_Audio } from '@/reaxels/initial/audio';
import {
	swiper ,
	swiperSlide ,
} from "vue-awesome-swiper";
import imgHomePromotionBanner from '@/views/New.MainBlock/Home.PC/img.png';
import imgHomeBlindingPromotion from '@/assets/image/New.images/zhongjian2.png';
import imgBlindingPromotion from '@/views/New.MainBlock/Home.PC/img_1.png';
import imgPromotionTextBg from '@/views/New.MainBlock/Home.Wap/img_2.png';
import imgHomeRecommandedHr from '@/views/New.MainBlock/Home.PC/home-recommanded-hr.svg';
import imgRecommandedBoxPriceBg from '@/views/New.MainBlock/Home.PC/recommanded-box-price-bg.svg';
</script>

<style
	scoped
	lang = "less"
>
.home-main-block{
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	
	.home-recommanded-container{
		width: 100%;
		overflow: hidden;
		
		.swiper-container{
			/deep/.swiper-slide{
				width: 148px;
				height: 210px;
				
			}
			.precious-card-container{
				width: 148px;
				height: 210px;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				background-position: center;
				background-size: 100% auto;
				background-repeat: no-repeat;
				user-select: none;
				
				.card-head-info{
					display: flex;
					justify-content: space-between;
					
					.probability{
						width: 32px;
						height: 21px;
						font-size: 9px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;
						background-color: #B52B52;
						margin: 10px 0 0 10px;
						border-radius: 4px;
					}
					.box--type{
						width: 56px;
						height: 21px;
						background-color: rgba(0,0,0,.6);
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 12px;
						color: #00FFA8;
						border-radius: 4px 0 0 4px;
						margin-top: 10px;
					}
				}
				
				.card-name-price{
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					
					.precious-name{
						font-size: 14px;
						font-weight: bold;
						color: white;
						
					}
					.precious-price{
						margin: 4px 0 8px 0;
						background: rgba(0,0,0,.8);
						border-radius: 4px;
						width: 115px;
						height: 21px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #FFA200;
						font-weight: bold;
						font-size: 11px;
					}
				}
			}
		}
	}
}


img.promotion-hr{
	margin: 8px 0;
}

.blinding-promotion {
	width: 100%;
	background-position: top;
	background-size: 250vw auto;
	background-repeat: no-repeat;
	padding: 15px 0;
}

.promotion-content {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-evenly;
	
	width: 100%;
}

.promotion-item-box {
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
	user-select: none;
	cursor: pointer;
	
	img {
		
	}
	& > span {
		font-size: 12px;
		color: white;
		margin-top: 3px;
		font-weight: bold;
	}
	
	div{
		margin-top: 8px;
		color :#6C2E16;
		font-size: 12px;
		display: flex;
		justify-content: center;   
		align-items: center;
		width: 126px;
		height: 18px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: left;
		
		& > span{
			
		}
	}
}
.home-recommanded-boxes{
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: space-evenly;
	padding: 0 5%;
	margin: 0 auto;
	
	.recommanded-box-flex-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex : 0 0 20%;
		flex-grow: 0;
		flex-shrink: 0;
		padding: 18px 0;
		
		.recommanded-box{
			width: 294px;
			max-width: 294px;
			height: 418px;
			display: flex;
			flex-flow: column nowrap;
			background-size: 100%;
			background-position: center;
			background-repeat: no-repeat;
			
			
			.top-side{
				display: flex;
				flex-flow: column nowrap;
				margin: 10px 0 0 20px;
				
				& > span:first-child{
					color: #00FFA8;
					font-weight: bold;
					font-size: 18px;
				}
				& > span:last-child{
					color: #FFA826;
					font-size: 14px;
					margin-top: 3px;
				}
			}
			
			.bottom-side {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				margin: 251px 30px 18px 30px;
				
				& > span {
					font-size: 24px;
					color: white;
					font-weight: bold;
				}
				
				& > div{
					margin-top: 10px;
					background-position: center;
					background-size: 100%;
					width: 234px;
					height: 52px;
					display: flex;
					justify-content: center;
					align-items: center;
					
					& > span {
						color: #F0A535;
						font-size: 28px;
						text-indent: 56px;
					}
				}
			}
		}
	}
}
</style>
