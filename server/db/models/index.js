'use strict';

const db = require('../index');
const Sequelize = db.Sequelize;

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// Exporting all models from here seems like a good idea!

// This is also probably a good place for you to set up your associations

const Student = db.define('Student', {
	firstName: {type: Sequelize.STRING, allowNull: false},
	lastName: {type: Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, validate: {
		isEmail: true, notEmpty: true
	}},
	gpa: {type: Sequelize.FLOAT},
	name: {type: Sequelize.VIRTUAL,
	get () {
		return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
	}}
});

const Campus = db.define('Campus', {
	name: {type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true }},
	imageUrl: {type: Sequelize.STRING, defaultValue: 'https://goo.gl/images/KxMrcr'},
	description: {type: Sequelize.TEXT}
});

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = { db, Student, Campus };

// need to require campus as a foreign key
