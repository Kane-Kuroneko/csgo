<template>
	<div
		class="header-wap-container"
	>
		<HeaderLogoLogin />
		<LeftMenuSider/>
	</div>
</template>

<script>
import HeaderLogoLogin from './Header-Logo-Login';
import LeftMenuSider from './Left-Menu-Sider';

export default reaxper({
	status(){
		return {
			
		}
	},
	components : {
		HeaderLogoLogin ,
		LeftMenuSider,
	}
})
</script>

<style>
.header-wap-container{
	position: sticky;
	top: 0;
	left: 0;
	z-index: 999;
}
</style>
