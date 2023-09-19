<template>
	<div style="gap:10px;">
		<div
			v-for = "(el, idx) in skinsData"
			:key = "idx"
			class = "skins-con"
			@click = "choseSkins(el)"
		>
			<img
				v-if = "el.levelName"
				:src = "require(`../assets/image/stone${el.levelName}.png`)"
				alt = ""
				class = "stone-img"
			/>
			<div
				class = "store-item"
				v-if = "isHover"
			>
				<img
					src = "../assets/image/upgrade/chose.png"
					alt = ""
				/>
				<img
					src = "../assets/image/upgrade/chosed.png"
					v-show = "el.id === chosedId"
				/>
			</div>
			<div :class = "'drop-qua-' + conversionStyle(el.rarity, el.category)">
				<div
					style = "
						display: flex;
						justify-content: space-between;
						padding: 3px 5px 0;
					"
				>
					<p
						class = "good-price"
						:style = "{ visibility: isPrice ? 'unset' : 'hidden' }"
					>
						💎
						<span> {{ el.price ? el.price : el.salePrice }}</span>
					</p>
					<div v-if = "isProbability">
						<div class = "probabilitys">
							{{
								((el.reality ? el.reality : el.probability) * 100).toFixed(2)
							}}%
						</div>
					</div>
				</div>
				<div
					class = "check-position"
					v-if = "isChose"
					:class = "{ 'check-position-ture': el.choose }"
				>
					<i class = "iconfont iconicon-select"></i>
				</div>
				<p
					class = "probabilitys"
					style = "padding-right: 10px"
					v-if = "isProbability && el.endProbability"
				>
					{{ el.startProbability.toFixed(4) }}-{{
						el.endProbability.toFixed(4)
					}}
				</p>
				<div class = "drop-gun-img">
					<img
						:src = "imgHost(el.skinsImg)"
						alt = ""
						v-if = "el.skinsImg && el.image"
					/>
					<img
						:src = "imgHost(el.image)"
						alt = "skins"
						v-if = "!el.skinsImg && el.image"
					/>
				</div>
			</div>
			<div class = "store-goods">
				<p>{{ el.name1 ? el.name1 : el.name.split("|")[0] }}</p>
				<p>{{ el.name2 ? el.name2 : el.name.split("|")[1] }}</p>
			</div>
			<div class = "is-right-hash">点击验证HASH</div>
		</div>
	</div>
</template>

<script>
export default {
	name : "SkinsItem" ,
	props : {
		skinsData : Array ,
		isProbability : {
			default : false ,
			type : Boolean ,
		} ,
		isPrice : {
			default : true ,
			type : Boolean ,
		} ,
		isChose : {
			default : false ,
			type : Boolean ,
		} ,
		chosedId : {
			default : null ,
			type : Number ,
		} ,
		isHover : {
			default : false ,
			type : Boolean ,
		} ,
	} ,
	data () {
		return {};
	} ,
	methods : {
		choseSkins (el) {
			this.$emit("choseSkins" , el);
		} ,
	} ,
};
</script>

<style scoped>
.store-item {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 4;
}

.store-item img:nth-child(1) {
	opacity: 0;
}
</style>
