declare const _ : typeof import("lodash");
declare const { Reaxes , orzMobx,reaxel } : typeof import("reaxes");

declare const obsReaction : typeof import("reaxes").Reaxes['obsReaction'];
declare const collectDeps : typeof import("reaxes").Reaxes['collectDeps'];
declare const contrastedCallback : typeof import("reaxes").Reaxes['contrastedCallback'];
declare const reaxper : typeof import("reaxes-vue2/types")['reaxper'];
declare const utils : typeof import("reaxes-utils");

declare const requester : typeof import('@/requester').requester;
declare const {
	crayon ,
	orzPromise ,
	logProxy,
} : typeof utils;


declare const toolkit : typeof import("reaxes-toolkit");
declare const orzPending : typeof import('reaxes-toolkit')['orzPending'];


declare global {
	export const _ : typeof import("lodash");
	export const orzMobx : typeof import("reaxes").orzMobx;
	export const Reaxes : typeof import("reaxes").Reaxes;
	export const reaxel : typeof import("reaxes").reaxel;
	export const reaxper : typeof import("reaxes-vue2/types")['reaxper'];
	export const utils : typeof import("reaxes-utils");
	
	export const crayon : typeof import("reaxes-utils").crayon;
	export const logProxy : typeof import("reaxes-utils")['logProxy'];
	export const orzPromise : typeof import("reaxes-utils")['orzPromise'];
	
	export const toolkit : typeof import("reaxes-toolkit");
	export const orzPending : typeof import("reaxes-toolkit")['orzPending'];
	
	export const obsReaction : typeof import('reaxes').Reaxes['obsReaction'];
	export const collectDeps : typeof import('reaxes').Reaxes['collectDeps'];
	export const contrastedCallback : typeof import('reaxes').Reaxes['contrastedCallback'];
	declare const requester : typeof import('@/requester').requester;
}

// declare module "*.png";
declare module "*.png" {
	const value: any;
	export = value;
}
