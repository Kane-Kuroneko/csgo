/**
 * 表单验证
 */
export const verify = {
	/**@param value {string}*/
	telNum (value){
		const regExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		const {result,failed} = new Verifier();
		if (!value) {
			return failed('请输入手机号');
		} else if(!regExp.test(value)) {
			return failed('手机号格式不正确! ')
		}else {
			return result;
		}
	},
	/**@param value {string}*/
	registerVerifyCode(value){
		const regExp = /^\d{6}$/;
		const {result,failed} = new Verifier();
		if(!value){
			return failed('')
		}
	},
}

class Verifier {
	/** @type {{valid: boolean, tips: string}}*/
	result = {
		valid : true,
		tips : null,
	};
	/**  @param message {string}*/
	failed = (message) => {
		return Object.assign(this.result,{
			tips : message,
			valid : false,
		});
	}
	/**  @param message {string}*/
	success = (message) => {
		return Object.assign(this.result,{
			tips : message,
		});
	}
}
