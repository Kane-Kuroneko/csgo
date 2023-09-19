export namespace User {
	/**
	 * @description /user/info接口返回的用户信息
	 */
	export interface profile {
		name : string;
		avatar : string;
		phone : string;
		balance : number;
		email : string;
		id : number;
		createTime : null;
		status : null;
		recharge : null;
		isVirtual : number;
		hasPassword : number;
		saleFeeRate : number;
		spreadCode : string;
		steamId : string;
		tradeUrl : null;
		headPortraitBox : null;
		virtualNotice : null;
		isRealName : number;
		retrieve : boolean;
	}
}
