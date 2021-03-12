module.exports = (Sequelize, DataTypes) => {
	const Blog = Sequelize.define(
		"Blog",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			content: {
                type: DataTypes.STRING,
				allowNull: false,
			},
			cover: {
				type: DataTypes.STRING,
				allowNull: false,
			},
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			user_id: {
				type: DataTypes.INTEGER,
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
			tableName: "blogs",
		}
	);

	Blog.associate = (models) => {
		Blog.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'user_id'
		})
	}

	return Blog;
};
