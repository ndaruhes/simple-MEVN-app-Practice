module.exports = (Sequelize, DataTypes) => {
	const User = Sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			email: {
                type: DataTypes.STRING,
				allowNull: false,
			},
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			createdAt: {
				field: 'created_at',
				type: DataTypes.DATE,
			},
			updatedAt: {
				field: 'updated_at',
				type: DataTypes.DATE,
			},
		},
		{
			tableName: "users",
		}
	);

	return User;
};
