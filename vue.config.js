const CompressionPlugin = require("compression-webpack-plugin");
const webpackConf = require('./webpack.conf.js');
module.exports = {
	publicPath : process.env.BASE_URL ,
	crossorigin : 'anonymous' ,
	productionSourceMap : false ,
	lintOnSave : false ,
	runtimeCompiler : true ,
	css : {
		// 打开开发阶段有骨架屏样式，但是所有样式无法热加载；关闭开发阶段无法加载骨架屏样式
		extract : false ,
		loaderOptions : { // 向预处理器 Loader 传递配置选项
			less : { // 配置less（其他样式解析用法一致）
				javascriptEnabled : true , // 设置为true
				test : /\.(sass|css)$/ ,
				loader : [
					'style-loader' ,
					'css-loader' ,
					'less-loader',
				] ,
			} ,
		} ,
	} ,
	devServer : {
		index : 'index.html' ,
		hot : true ,
		host : '0.0.0.0' ,
		open : false , // port:8082,
		disableHostCheck : true ,
		overlay : {
			warnings : false ,
			errors : false ,
		} ,
		writeToDisk : true,
		watchOptions : {
			ignored : [/node_modules/,/dist/]
		},
		historyApiFallback : {
			rewrites : [
				{
					from : /\/*/ ,
					to : '/',
				} ,
			] ,
		} ,
		proxy : {
			'/api' : {
				// target : 'http://39.103.234.220' ,
				/*我方后端服务器地址*/
				target : 'http://47.92.247.123' ,
				// target : 'http://111.229.36.88:8081' ,
				changeOrigin : true ,
				pathRewrite : {
					'^/api' : '' ,
				} ,
			} ,
		} ,
	} ,
	pages : {
		index : {
			// page 的入口
			entry : 'src/main.js' , // 模板来源
			template : 'public/index.html' , // 在 dist/index.html 的输出
			filename : 'index.html' , // 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks : [
				'chunk-vendors' ,
				'chunk-common' ,
				'index',
			] ,
		} ,
	} ,
	configureWebpack : (config) => {
		
		config.plugins = [...config.plugins,...webpackConf.plugins];
		
		if ( process.env.NODE_ENV !== 'production' ) return;
		config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
		config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
		config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
		config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
		const plugins = [
			new CompressionPlugin({
				test : /\.js$|\.html$|\.css/ ,
				threshold : 10240 ,
				deleteOriginalAssets : false ,
			}) ,
		];
		config.externals = {
			// 'vue-router': 'VueRouter',
			'axios' : 'axios' ,
		};
		config.plugins = [
			...config.plugins ,
			...plugins ,
		];
	} ,
	chainWebpack : config => {
		config.plugin('html-index').tap(args => {
			//seo要求
			args[0].minify = false;
			return args;
		});
		config.module.rule("vue").use("vue-loader").loader("vue-loader").tap(options => Object.assign(options , {
			transformAssetUrls : {
				audio : "src" ,
			} ,
		}) );
	} ,
};


