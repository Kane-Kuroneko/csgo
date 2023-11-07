<template>
	<div class = "home-main-block">
		
		<div class="promotion-banner" style="position: relative;">
			<img
				:src="imgHomePromotionBanner"
				height="auto"
				width="100% "
				style="vertical-align: middle"
			>
			<!-- <img class="xinrenHD" :src="imGxinrenlibao" alt=""> -->
			<img  class="erweima" :src="imGerweima" alt="">
		</div>
		<img
			class="promotion-hr"
			:src="imgBlindingPromotion"
			width="90%"
			v-if = "promotions && promotions[0]?.boxVoList"
		>
		<div
			v-if = "promotions && promotions[0]?.boxVoList"
			class="blinding-promotion"
			:style="{'background-image' : `url(${imgHomeBlindingPromotion})`}"
		>
			<div
				class="promotion-content"
			>
				<div
					v-for="item in promotions[0].boxVoList"
					class="promotion-item-box"
					@click="setCurrentBox(item)"
				>
					<img
						:src="`https://picture.hzqinyun.com/${item.background}`"
					>
					<span>{{ item.name }}</span>
					<div>
						<span>💎{{ item.discountPrice }}</span>
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
			v-if="!!homeRecommandedBoxes && homeRecommandedBoxes.length"
			class="home-recommanded-boxes"
		>
			<div 
				class="recommanded-box-flex-container"
				v-for="item in homeRecommandedBoxes"
			>
				<div
					@click="setCurrentBox(item)"
					class="recommanded-box"
					:style="{'background-image':`url('https://picture.hzqinyun.com${item.beasemap}')`}"
				>
					<div class="top-side">
						<span>{{ {1: 'HASH箱',0:'???' }[item.boxType] }}</span>
						<span>{{ item.probability }}胜</span>
					</div>
					<div class="bottom-side">
						<span>{{ item.name }}</span>
						<div>
							<span>💎{{ item.discountPrice }}</span>
						</div>
					</div>
				</div>
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
			imgHomePromotionBanner,
			imgHomeBlindingPromotion,
			imgBlindingPromotion,
			imgPromotionTextBg,
			imgHomeRecommandedHr,
			imgRecommandedBoxPriceBg,
			imGxinrenlibao,
			imGerweima
		}
	},
	components : {
		
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

import audio_goBox from '@/assets/audio/goBoxAudio.aac';
import { reaxel_Audio } from '@/reaxels/initial/audio';
import { reaxel_box } from '@/reaxels/box';
import { reaxel_initial } from '@/reaxels/initial';
import imgHomePromotionBanner from '@/views/New.MainBlock/Home.PC/img.png';
import imgHomeBlindingPromotion from '@/assets/image/New.images/zhongjian2.png';
import imgBlindingPromotion from '@/views/New.MainBlock/Home.PC/img_1.png';
import imgPromotionTextBg from '@/views/New.MainBlock/Home.PC/promotion-text-bg.svg';
import imgHomeRecommandedHr from '@/views/New.MainBlock/Home.PC/home-recommanded-hr.svg';
import imgRecommandedBoxPriceBg from '@/views/New.MainBlock/Home.PC/recommanded-box-price-bg.svg';


import imGxinrenlibao from '@/views/New.MainBlock/Home.PC/xinrenlibao.png';
import imGerweima from '@/views/New.MainBlock/Home.PC/erweima.png';

//xinrenlibao.png

</script>

<style
	scoped
	lang = "less"
>
.home-main-block{
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	
}


img.promotion-hr{
	margin: 8px 0;
}

.blinding-promotion {
	width: 100%;
	background-position: top;
	background-size: auto 100%;
	background-repeat: no-repeat;
	padding: 30px 0;
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
		width: 250px;
	}
	& > span {
		font-size: 24px;
		color: white;
		margin-top: 20px;
	}
	
	div{
		margin-top: 20px;
		color : #968787;
		font-size: 28px;
		display: flex;
		justify-content: center;   
		align-items: center;
		width: 218px;
		height: 47px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: left;
		background-color: rgba(0,0,0,.76);
		border-radius: 8px;
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
			user-select: none;
			cursor: pointer;
			
			
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
					background-color: rgba(0,0,0,.76);
					border-radius: 8px;
					
					& > span {
						color: #F0A535;
						font-size: 28px;
					}
				}
			}
		}
	}
}
.xinrenHD{
	position: absolute;
	right: 5%;
	bottom: 5%;
}
.erweima{
	position: absolute;
	right: 7%;
	top: 5%;
}
</style>
