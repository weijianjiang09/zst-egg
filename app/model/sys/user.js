'use strict';
const base = require('../base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysUser = app.model.define('sys_user',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(64),
      name: STRING(32),
      password: STRING(255),
      sex: STRING(2),
      phone: STRING(32),
    }));

  SysUser.associate = () => {
    SysUser.belongsToMany(app.model.Sys.Role, {
      through: app.model.Sys.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
  };

  return SysUser;
};
