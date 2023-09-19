export namespace Asserts {
	
	/**
	 * @description 支付渠道内的商品
	 */
	export type Goods = {
		"id": number,
		"goodsName": string,
		"goodsImg": string,
		"goodsPrice": number,
		"weight": number
	}
	
	/**
	 * 支付渠道,每个支付渠道内的商品可能不同
	 */
	export interface PaymentChannel {
		"client": number,
		"channel": string,
		"action": string,
		"image": string,
		"min": number,
		"max": number,
		"rechargeConfig": string,
		"type": number,
		"goodsList": Goods[],
		"url": string,
		"ids": number
	}
	
	export type GoodsWithGiving = Goods & {
		giving :any;
	}
	
	export interface PaymentChannelWithGiving {
		"client": number,
		"channel": string,
		"action": string,
		"image": string,
		"min": number,
		"max": number,
		"rechargeConfig": string,
		"type": number,
		"goodsList": GoodsWithGiving[],
		"url": string,
		"ids": number
	}
}
