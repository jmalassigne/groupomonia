'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Article, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'articleId'
      });

      models.Article.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'ArticleId',
        otherKey: 'userId'
      });

      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      models.Like.belongsTo(models.Article, {
        foreignKey: 'articleId',
        as: 'article'
      });
    }
  };
  Like.init({
    articleId:{
       type: DataTypes.INTEGER,
       references: {
         model: 'Article',
         key: 'id'
       }
      },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
     },
    value: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};