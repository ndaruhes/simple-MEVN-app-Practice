'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('blogs', {
			id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false,
				},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cover: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slug: {
					type: Sequelize.STRING,
					allowNull: false,
				},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
					type: Sequelize.DATE,
					allowNull: false,
				},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('blogs');
	}
};
