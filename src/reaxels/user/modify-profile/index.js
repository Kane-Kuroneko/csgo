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
		if(!store.choosingAvatar){
			throw new Error('请先选择头像!');
		}
		return requester.post('/api/personal/center/upload/avatar' , {}).
		then(data => {
			reaxel_user().request_profile();
			setState({
				choosingAvatar : null ,
				choosing : false ,
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
