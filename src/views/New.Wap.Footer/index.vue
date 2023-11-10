<template>
	<div class="footer-container">
		<div class="global-statistical-data-container">
			<div>
				<img :src="imgFirst" width="28" />
				<div>
					<span>{{ baseInfo?.opening ?? 0 }}</span>
					<span>已开箱</span>
				</div>
			</div>
			<div>
				<img :src="imgSecond" width="28" />
				<div>
					<span>{{ baseInfo?.buy ?? 0 }}</span>
					<span>商城兑换数</span>
				</div>
			</div>
			<div>
				<img :src="imgThird" width="28" />
				<div>
					<span>{{ baseInfo?.user ?? 0 }}</span>
					<span>用户数</span>
				</div>
			</div>
		</div>
		<img :src="imgFooter" width="280" />

		<p>温馨提示：适度娱乐 切勿沉迷 注意账号保护 谨防上当受骗</p>
		<p>{{ companyInfo }}</p>
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
		const { baseInfo,companyInfo } = reaxel_initial().initialStore;
		return {
			baseInfo,
			companyInfo
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

	.global-statistical-data-container {
		display: flex;
		gap: 28px;

		& > div {
			display: flex;

			align-items: center;

			img {
			}

			& > div {
				display: flex;
				flex-flow: column nowrap;
				margin-left: 6px;

				span:first-child {
					font-size: 13px;
					color: #ffcf68;
				}
				span:last-child {
					font-size: 9px;
					color: white;
				}
			}
		}
	}

	& > img {
		margin-top: 60px;
	}
	
	& > p:nth-last-child(3) {
		font-size: 9px;
		color: #9B98B0;
		margin-top: 30px;
	}
	& > p:nth-last-child(2) {
		font-size: 9px;
		color: #9B98B0;
		margin-top: 20px;
	}
	& > p:last-child {
		margin-top: 20px;
		color: #FFCA6E;
		font-size: 9px;
		
		&>span {
			cursor: pointer;
		}
	}
}
</style>
