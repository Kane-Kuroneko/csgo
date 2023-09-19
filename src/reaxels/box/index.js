export const reaxel_box = reaxel((ret) => {
	
	const {mutate,store,setState} = orzMobx({
		/**
		 * @type {import('./Draw').Draw.Box}
		 */
		currentBox : null,
		/*是否正在抽奖*/
		drawing : false,
	});
	
	/**
	 * 设为当前(或将要)抽奖箱
	 * @param box {import('./Draw').Draw.Box}
	 */
	function setCurrentBox(box){
		setState({currentBox : box});
		console.log(logProxy(store.currentBox))
	}
	
	return () => {
		
		return ret = {
			boxStore:store,
			mutateBoxStore:mutate,
			setBoxState : setState,
			setCurrentBox,
			
		}
	}
})
