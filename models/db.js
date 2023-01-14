const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("./User");
const PostModel = require("./Post");
const CommentModel = require("./Comment");

const db = new Sequelize("blog", "root", "123456", {
  host: "mysql-docker-local",
  dialect: "mysql",
  port: "3306",
});

db.sync({
  force: false, // To create table if exists , so make it false
  alter: false, // To update the table if exists , so make it false
});

const User = UserModel(db);
exports.User = User;

const Post = PostModel(db);
exports.Post = Post;

const Comment = CommentModel(db);
exports.Comment = Comment;

User.hasMany(Post, {
  as: "post",
  foreignKey: "user_id",
});
Post.belongsTo(User, {
  as: "user",
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  as: "comment",
  foreignKey: "post_id",
});
Comment.belongsTo(Post, {
  as: "post",
  foreignKey: "post_id",
});


// User.hasMany(Comment, {
//   as: "comment",
//   foreignKey: "user_id",
// });
// Comment.belongsTo(User, {
//   as: "user",
//   foreignKey: "user_id",
// });
