/*
 * @Description: 
 * @Version: 2.0
 * @Autor: cjw
 * @Date: 2023-11-03 15:08:59
 * @LastEditors: cjw
 * @LastEditTime: 2023-11-03 15:41:45
 */

const { ProvidePlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require('path');
module.exports = {
	
	plugins: [
		new CopyWebpackPlugin({
			patterns : [
				{from : "public/worker_threads" ,to : path.resolve(__dirname,"node_modules/worker_threads")}
			]
		}),
		new ProvidePlugin({
			_: ['lodash'],
			Reaxes : ["reaxes","Reaxes"],
			orzMobx : ["reaxes","orzMobx"],
			reaxel : ["reaxes","reaxel"],
			obsReaction : ["reaxes","Reaxes","obsReaction"],
			contrastedCallback : ["reaxes","Reaxes","contrastedCallback"],
			collectDeps : ["reaxes","Reaxes","collectDeps"],
			reaxper : ["reaxes-vue2","reaxper"],
			orzPromise: ['reaxes-utils', 'orzPromise'],
			utils: ['reaxes-utils'],
			crayon: ['reaxes-utils', 'crayon'],
			logProxy: ['reaxes-utils', 'logProxy'],
			toolkit: ['reaxes-toolkit'],
			orzPending: ['reaxes-toolkit','orzPending'],
			requester : ['@/requester/index.js','requester']
		}),
		//清除dist
		new CleanWebpackPlugin()	
	],
}

