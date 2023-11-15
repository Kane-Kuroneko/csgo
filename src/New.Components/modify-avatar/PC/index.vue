<template>
	<div class="modify-avatar-PC">
		<button 
			v-if="!choosing"
			@click="toggleChoosing()"
		>修改头像</button>
		<div
			v-if="choosing"
			class="choose-area"
		>
			<div>
				<img
					v-for="{id,url} in avatars"
					@click="chooseAvatar(id)"
					:src="url"
					:key="id"
					
					width="90"
					height="90"
					:class="{selected:id===choosingAvatar}"
				/>
			</div>
			<div class="operation">
				<button @click="toggleChoosing(false)">取消</button>
				<button @click="confirmUpload()">确定</button>
			</div>
		</div>
	</div>
</template>


<script>
const reax_User = reaxel_user(),{
	
} = reax_User;
const reax_ModifyProfile = reaxel_ModifyProfile(),{
	toggleChoosing,
	setModifyProfileState,
	modifyProfileStore,
	chooseAvatar,
	confirmUpload,
} = reax_ModifyProfile;
export default reaxper({
	status(){
		const {
			choosingAvatar ,
			choosing ,
			avatars ,
		} = reaxel_ModifyProfile();
		return {
			choosingAvatar ,
			choosing ,
			avatars ,
			modifyProfileStore,
		}
	},
	
	methods:{
		toggleChoosing,
		setModifyProfileState,
		chooseAvatar,
		confirmUpload,
	},
	
});
import { reaxel_user } from '@/reaxels/user';
import { reaxel_ModifyProfile } from '@/reaxels/user/modify-profile';
</script>

<style lang="less" scoped>
.modify-avatar-PC{
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	
	.choose-area{
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		padding: 44px 0;
		width: 100%;
		background-color: #27262F;
		border-radius: 28px;
		gap: 36px;
		
		& > div:first-child {
			display: flex;
			flex-flow: row wrap;
			align-items: center;
			row-gap: 50px;
			column-gap: 20px;
			width: calc(4 * 20px + 5 * 90px);
			
			
			img {
				cursor: pointer;
				user-select: none;
				-webkit-user-drag: none;
				
				&.selected {
					border-radius: 50%;
					box-shadow: #F9AE3A 0 0 3px 3px;
				}
				&:hover{
					filter: brightness(1.8);
				}
			}
		}
		
		.operation {
			display: flex;
			gap: 120px;
			
			& > button {
				font-size: 20px;
				font-weight: bold;
				border-radius: 8px;
				width: 160px;
				height: 48px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #D9D9D9;
				cursor: pointer;
				&:hover{
					filter:brightness(1.6);
				}
				&:last-child{
					background-color: #FBC73C;
				}
			}
			
		}
	}
	
	&>button:first-child{
		background-color: #FBC73C;
		padding: 6px 14px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: bold;
	}
}
</style>
