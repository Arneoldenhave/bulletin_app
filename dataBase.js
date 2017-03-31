const Sequelize = require('sequelize');
const connectString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + "@localhost/bulletinboard";

const dataBase = {
	//empty object for storing stuff
}

dataBase.connect = new Sequelize(connectString);

//CREATE TABLES
dataBase.Messages = dataBase.connect.define('message', {
	title: Sequelize.STRING,
	message: Sequelize.STRING,

})



//EXPORT
module.exports = dataBase;
