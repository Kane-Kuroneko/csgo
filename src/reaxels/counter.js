import { reaxel, orzMobx } from "reaxes";

export const reaxel_counter = reaxel(() => {
	
	const {store,setState} = orzMobx({
		count : 0,
	});
	
	let value = obsReaction(() => {
		try {
			value = `result is : ` + store.count;
		}catch ( e ) {
			
		}
	},() => [store.count]);
	
	return () => {
		
		return {
			get count(){
				return store.count;
			},
			get value(){
				return value;
			},
			increase(){
				setState({count:store.count + 1});
			},
		}
	}
});

