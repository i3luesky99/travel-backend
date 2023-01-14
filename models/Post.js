const { DataTypes, Model } = require("sequelize");

class Post extends Model {
  id;
  user_id;
  title;
  content;
  createdAt;
  updatedAt;
}
module.exports = (db) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
      },
      content: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "posts",
      timestamps: true,
    }
  );
  Post.sync({ force: false, alter: false });
  return Post;
};
