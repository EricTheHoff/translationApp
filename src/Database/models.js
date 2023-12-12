import { Model, DataTypes } from "sequelize";
import myDataBaseConnection from "../Database/db.js";
import util from "util";

export const dbConnection = await myDataBaseConnection("translationApp");

export class SchoolDetail extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
SchoolDetail.init(
  {
    schoolId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    // userId: { type: DataTypes.INTEGER },
  },

  {
    sequelize: dbConnection,
    modelName: "schoolDetails",
  }
);
export class UserDetail extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
UserDetail.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    profilePic: {type:DataTypes.STRING},
    // schoolId: { type: DataTypes.INTEGER },
    // wordId: { type: DataTypes.INTEGER },
    zipCode: { type: DataTypes.STRING(5) }
  },

  {
    sequelize: dbConnection,
    modelName: "userDetails",
  }
);
export class SavedWord extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
SavedWord.init(
  {
    wordId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    word: { type: DataTypes.STRING(650) },
    original: { type: DataTypes.STRING(500) },
    toLanguage: { type: DataTypes.STRING },
    // userId: { type: DataTypes.INTEGER },
  },

  {
    sequelize: dbConnection,
    modelName: "savedWords",
  }
);
export class Images extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Images.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: { type: DataTypes.STRING },
  },

  {
    sequelize: dbConnection,
    modelName: "images",
  }
);

SchoolDetail.belongsToMany(UserDetail, { through: "SchoolUserDetail" });
UserDetail.belongsToMany(SchoolDetail, {through: "SchoolUserDetail" });

UserDetail.hasMany(SavedWord, {foreignKey: "userId" });
// create userDetails.getSavedWords(), userDetails.addSavedWords(). it is going to try to create userDetails.createSavedWord
SavedWord.belongsTo(UserDetail, {foreignKey: "userId" });

UserDetail.hasMany(Images, { foreignKey: "userId" });
Images.belongsTo(UserDetail, { foreignKey: "userId" });