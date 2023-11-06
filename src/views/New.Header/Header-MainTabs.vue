<template>
	<div class = "header-main-tabs">
		<div class = "menu-container">
			<div class = "left-menus">
				<div
					v-for = "{iconUrl,title,navigateTo:target,color} in leftTabs"
					@click="navigate(target)"
					class = "tab-pane"
				>
					<img :src = "iconUrl">
					<span :style = "{color : color}">{{ title }}</span>
				</div>
			</div>
			<div class = "right-menus">
				<div
					v-for = "{iconUrl,title,navigateTo:target,color} in rightTabs"
					v-if="(!userStore.token && target==='/user/case') ? false : true"
					@click="navigate(target,)"
					class = "tab-pane"
				>
					<img :src = "iconUrl">
					<span :style = "{color : color}">{{ title }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reaxel_header_tabs } from '@/reaxels/header-tabs';
import { reaxel_user } from '@/reaxels/user';
const {userStore} = reaxel_user();
import {RouterLink} from 'vue-router';
export default reaxper({
	data () {
		return {};
	} ,
	status () {
		const { leftTabs ,rightTabs} = reaxel_header_tabs();
		return {
			userStore,
			leftTabs ,
			rightTabs ,
		};
	} ,
	inject: ["showNotice"],
	methods : {
		navigate(path){
			if(path=='gonggao'){
				this.showNotice()
				//this.$refs.announce.isShow = true;
				//this.isNewNotice = false;
				return 
			}
			this.$router.push(path)
		}
	} ,
	components : {
		RouterLink,
	}
	
});
</script>

<style
	scoped
	lang = "less"
>
.header-main-tabs {
	display: flex;
	justify-content: center;
	background-color: rgb(25, 24, 30);
	padding: 16px 84px;
	margin: 0 auto;
	width: 100%;
	
	& > .menu-container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		//min-width: 1280px;
		
		& > .left-menus,.right-menus {
			display: flex;
			align-items: center;
			
			& > .tab-pane {
				user-select: none; 
				cursor: pointer;
				display: inline-flex;
				white-space: nowrap;
				justify-content: space-between;
				align-items: center;
				margin: 0 36px 0 0;
				
				
				& > span {
					margin-left: 6px;
					font-size: 16px;
				}
				
			}
		}
		
		.right-menus{
			& > div:last-child {
				margin-right: 0;
			}
		}
	}
}


</style>
