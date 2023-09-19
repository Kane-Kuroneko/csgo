export const $53Promise = orzPromise((resolve) => {
	const interval = setInterval(() => {
		/* @ts-ignore */
		if ( (typeof hz6d_startReautoTimer2 !== 'undefined') ) {
			clearInterval(interval);
			resolve();
		}
		;
	} , 200);
}).then(() => {
	/**
	 * @field {import('../../../public/js/53kf')}
	 */
	/* @ts-ignore*/
	const $53KF = $53.createApi();
	crayon.orange('$53KF initialized' , $53KF);
	return $53KF;
});

export const reaxel_53kf = reaxel(() => {
	
	return () => {
		
		return {
			$53Promise ,
			openKfModal () {
				$53Promise.then(($53) => {
					$53.push('cmd' , 'kfclient');
					//popup是弹窗，new是新窗口
					$53.push('type' , 'popup'); 
					$53.query();
				});
			} ,
		};
	};
});
