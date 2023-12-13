import { UserDetail, SchoolDetail, dbConnection } from "./models.js";

// const user = await UserDetail.findOne({
//   include: {
//     model: SchoolDetail,
//   },
// });
// const school = await SchoolDetail.findOne({
//   include: {
//     model: UserDetail,
//   },
// });

// // await user.addSchoolDetail(school);

// // await user.save();

// console.log("User", user);
// console.log("School", school);

const newUser = await UserDetail.findByPk(8, {
  include: {
    model: SchoolDetail,
  },
});

console.log(newUser);

await dbConnection.close();
