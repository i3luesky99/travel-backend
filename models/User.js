const { DataTypes, Model, Sequelize } = require("sequelize");

class User extends Model {
  id;
  email;
  password;
  first_name;
  last_name;
  birth;
  address;
  phone;
  createdAt;
  updatedAt;

  // constructor(...args) {
  //   super(...args);
  //   restoreSequelizeAttributesOnClass(new.target, this);
  // }
}
module.exports = (db) => {
  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull:false
      },
      first_name: {
        type: DataTypes.STRING(100),
      },
      last_name: {
        type: DataTypes.STRING(100),
      },
      birth: {
        type: DataTypes.DATE,
      },
      address: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(10),
      },
    },
    {
      sequelize: db,
      modelName: "users",
      timestamps: true,
    }
  );
  User.sync({ force: false, alter: false });
  return User;
};
