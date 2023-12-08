import {
  SchoolDetail,
  UserDetail,
  SavedWord,
  dbConnection,
} from "./models.js";

await dbConnection.sync({ force: true });
await SchoolDetail.create({
  name: "rosetta stone",
  address: "190 E 300 N Lehi, UT 84043",
  phone: "(555) 555-5555",
  website: "www.rosettastone.com",
  userId: 1,
});

const userOne = await UserDetail.create({
  name: "John Doe",
  email: "johndoe1998@gmail.com",
  password: "ilovejohndoe420",
//   schoolId: 1,
//   wordId: 1,
  zipCode: '93457',
  image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
});

const wordOne = await SavedWord.create({
  word: "novato",
//   userId: 1,
});
await userOne.addSavedWord(wordOne)

const user1 = await UserDetail.findOne()
const user1Eager = await UserDetail.findOne({
    where: {
        userId: 1
    },
    include: SavedWord
})

console.log(user1)
// console.log(await user1.getSavedWords())
console.log(user1Eager.savedWords)


await dbConnection.close()
