export namespace Draw {
	
	/**
	 * 箱子信息
	 */
	export interface Box {
		"id": number,
		"name": string,
		"discount": number,
		"weight": number,
		"boxType": number,
		"price": number,
		"discountPrice": number,
		"image": string,
		"probability": string,
		"beasemap": string,
		"background": string,
		"game": number
	}
}
