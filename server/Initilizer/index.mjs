import {createConnection} from 'mysql';
import Express from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';


const port = 3000;
export const connection = createConnection({
	host : "rm-8vbg80trb9tp55h4wzo.mysql.zhangbei.rds.aliyuncs.com" ,
	user : "hanghash" ,
	password : "Hang1023!" ,
	database : "hang-test",
});

connection.connect((error) => {
	if (error) throw error;
	console.log("Connected!");
});





export const express = Express();




express.use(cors());
express.use(BodyParser.json());
express.use(
	BodyParser.urlencoded({
		extended: true,
	}),
);

const queryPromise = (...args) => {
	
	return new Promise((resolve , reject) => {
		connection.query(...args , (error , results , fields) => {
			if ( error ) {
				reject(error);
			} else {
				resolve({
					results ,
					fields ,
				});
			}
		});
	});
};

express.post('/user/clear',(req,res) => {
	
	res.setHeader('Access-Control-Allow-Origin','*');
	
	console.log(req.body);
	Promise.all([
		queryPromise(`UPDATE user_user SET name=${Math.random()} WHERE name='${req.body.phone}'`) ,
		queryPromise(`UPDATE user_user SET phone=${'13000000000'} WHERE phone='${req.body.phone}'`),
	]).then((data) => {
		res.send(data);
	}).catch(e => {
		res.send({
			errorMessage : e.message || e,
		});
	});
});


express.listen(port,(sd) => {
	console.log(sd);
});
