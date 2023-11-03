<template>
	<div class="footer-container">
		<div class="global-statistical-data-container">
			<div>
				<img :src="imgFirst" width="75" />
				<div>
					<span>已开箱</span>
					<span>{{ baseInfo?.opening ?? 0 }}</span>
				</div>
			</div>
			<div>
				<img :src="imgSecond" width="75" />
				<div>
					<span>商城兑换数</span>
					<span>{{ baseInfo?.buy ?? 0 }}</span>
				</div>
			</div>
			<div>
				<img :src="imgThird" width="75" />
				<div>
					<span>用户数</span>
					<span>{{ baseInfo?.user ?? 0 }}</span>
				</div>
			</div>
		</div>
		<img :src="imgFooter" width="818" />

		<p>温馨提示：适度娱乐 切勿沉迷 注意账号保护 谨防上当受骗</p>
		<p>杭州皎展网络科技有限公司 | ICP备案号：浙ICP备2023002015号</p>
		<p
			
		>
			<span @click="toHelpCenter('公司介绍')">关于我们</span>
			/
			<span @click="toHelpCenter('其他流程问题')">常见问题</span>
			/
			<span @click="toHelpCenter('服务协议')">使用条款</span>
			/
			<span @click="toHelpCenter('隐私条款')">隐私政策</span>
			/
			<span @click="toHelpCenter('纠纷处理说明')">纠纷处理引导</span>
		</p>
	</div>
</template>

<script>
export default reaxper({
	status() {
		const { baseInfo } = reaxel_initial().initialStore;
		return {
			baseInfo,
		};
	},
	data() {
		return {
			imgFooter,
			imgFirst,
			imgSecond,
			imgThird,
		};
	},
	methods:{
		toHelpCenter(val){
			this.$router.push('/page/helpcenter/'+val)
			document.documentElement.scrollTop=0
		},
	},
});

import imgFooter from "./footer.svg";
import imgFirst from "./first.icon.svg";
import imgSecond from "./second.icon.svg";
import imgThird from "./third.icon.svg";
import { reaxel_initial } from "@/reaxels/initial";
</script>

<style lang="less" scoped>
.footer-container {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	background: #1f1e27;
	justify-content: center;
	padding: 80px 0 100px 0;
	transform: scale(.75);

	.global-statistical-data-container {
		display: flex;
		gap: 244px;

		& > div {
			display: flex;

			align-items: center;

			img {
			}

			& > div {
				display: flex;
				flex-flow: column nowrap;
				margin-left: 20px;

				span:first-child {
					font-size: 24px;
					color: white;
				}
				span:last-child {
					font-size: 28px;
					color: #ffcf68;
				}
			}
		}
	}

	& > img {
		margin-top: 76px;
	}
	
	& > p:nth-last-child(3) {
		font-size: 24px;
		color: #9B98B0;
		margin-top: 80px;
	}
	& > p:nth-last-child(2) {
		font-size: 24px;
		color: #9B98B0;
		margin-top: 20px;
	}
	& > p:last-child {
		margin-top: 20px;
		color: #FFCA6E;
		font-size: 24px;
		
		&>span {
			cursor: pointer;
		}
	}
}
</style>
