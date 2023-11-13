/*
 * @Description: 
 * @Version: 2.0
 * @Autor: cjw
 * @Date: 2023-11-08 18:44:32
 * @LastEditors: cjw
 * @LastEditTime: 2023-11-13 13:08:02
 */
export const reaxel_ModifyProfile = reaxel(() => {
	const {
		store ,
		setState ,
		mutate,
	} = orzMobx({
		choosing : false,
		/**@var {string} imgID */
		choosingAvatar : null ,
		/**@type {{url:string;id:string;}[]}*/
		avatars ,
	});
	
	const {
		setPending ,
		setError ,
		pendingState ,
	} = toolkit.orzPending();
	
	let choosingBlob = obsReaction((first) => {
		if ( first ) return null;
		const reader = new FileReader();
		reader.onload = () => {
			return choosingBlob = reader.result;
		};
	} , () => [store.choosingAvatar]);
	
	function chooseAvatar (id) {
		setState({ choosingAvatar : id });
	}
	
	async function confirmUpload () {
		return putAction('/api/user/info' , {'avatar':`/avatar/${store.choosingAvatar}.png`}).
		then(data => {
		
			reaxel_user().request_profile();
		
	
			setState({
				choosingAvatar : null ,
				choosing : false ,
			});
			
			$Message.success({
				duration : 7 ,
				content : `保存成功`,
			});
			return data;
			
			
		});
	}
	
	return () => {
		
		return {
			store ,
			setState ,
			mutate ,
			modifyProfileStore : store ,
			setModifyProfileState : setState ,
			mutateModifyProfile : mutate ,
			toggleChoosing,
			chooseAvatar,
			confirmUpload,
			get choosing(){
				return store.choosing;
			},
			get avatars () {
				return store.avatars;
			} ,
			get choosingAvatar () {
				return store.choosingAvatar;
			} ,
		};
	};
});

/**
 * url转换为file对象
 * @param url
 */
async function urlToFile (url) {
	
	return fetch(url).
	then(response => response.blob()).
	then(blob => {
		return new File([blob],'name');
	});
}

function toggleChoosing(choosing = !reaxel_ModifyProfile().choosing) {
	if(choosing === false){
		reaxel_ModifyProfile().setState({choosingAvatar : null})
	}
	reaxel_ModifyProfile().setState({ choosing });
}

function chooseAvatar(id) {
	reaxel_ModifyProfile().setState({ choosingAvatar : id });
}

import { reaxel_user } from '../';

import { requester } from '../../../requester';
import { avatars } from './avatars-mapping';

import {  putAction } from "../../../api/manage";

import $store from '../../../store';
import { Message as $Message } from "view-design";
