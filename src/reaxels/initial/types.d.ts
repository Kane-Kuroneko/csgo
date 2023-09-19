export namespace Initial {
	export interface boxInfo {
		id: number;
		name: string;
		discount: number;
		weight: number;
		boxType: number;
		price: number;
		discountPrice: number;
		image: string;
		probability: string;
		beasemap: string;
		background: string;
		game: number;
	}
	
	export interface baseInfo {
		"userOnline": number,
		"buy": number,
		"user": number,
		"opening": number
	}
}
