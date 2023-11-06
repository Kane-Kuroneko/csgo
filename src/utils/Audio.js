export class ReaxlassAudio extends Audio { 
	constructor (url) {
		super(url);
		obsReaction(() => {
			const { mute } = reaxel_Audio();
			this.muted = mute;
		} , () => [reaxel_Audio().mute]);
	}
	
	stop(){
		this.pause();
		this.currentTime = 0;
	}
}

import { reaxel_Audio } from '../reaxels/initial/audio';
