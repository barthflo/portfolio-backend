'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class About extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Picture, {
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				as: 'picture',
			});
		}
	}
	About.init(
		{
			description: DataTypes.TEXT,
			pictureId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Picture',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'About',
		},
	);
	return About;
};
