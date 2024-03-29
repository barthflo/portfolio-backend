'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class SocialMedia extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	SocialMedia.init(
		{
			name: DataTypes.STRING,
			linkTo: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			timestamps: false,
			freezeTableName: true,
			tableName: 'SocialMedias',
			sequelize,
			modelName: 'SocialMedia',
		},
	);
	return SocialMedia;
};
