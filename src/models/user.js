"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsTo(models.Allcode, {
				foreignKey: "gender",
				targetKey: "keyMap",
				as: "genderData",
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			dateOfBirth: DataTypes.DATE,
			gender: DataTypes.STRING,
			address: DataTypes.STRING,
			image: DataTypes.STRING,
			roleId: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
