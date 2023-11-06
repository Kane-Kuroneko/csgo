
export const reaxel_Audio = reaxel(() => {
	
	const {
		store : audioStore ,
		setState : setAudioState ,
		mutate : mutateAudio ,
	} = orzMobx({
		mute : false ,
		
	});
	
	/**@type {{mute:boolean}}*/
	const audioStorage = JSON.parse(localStorage.getItem('reax-audio') ?? 'null');
	
	if ( audioStorage ) {
		setAudioState({ mute : audioStore.mute });
	}
	
	// audios.duringTheUpgrade2.play();
	
	return () => {
		
		return {
			get audios(){
				try {
					return audios;
				}catch ( e ) {
					return null;
				}
			},
			get mute () {
				return audioStore.mute;
			} ,
			toggleMute (mute = !audioStore.mute) {
				setAudioState({ mute });
				localStorage.setItem('reax-audio' , JSON.stringify({ mute }));
			} ,
		};
	};
});

const audios = require('./audios').audios;
