const { DataTypes, Model } = require("sequelize");

class Comment extends Model {
  id;
  post_id;
  description;
  user_id;
}
module.exports = (db) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1024),
      },
    },
    {
      sequelize: db,
      modelName: "comments",
      timestamps: true,
    }
  );
  Comment.sync({ force: false, alter: false });
  return Comment;
};
