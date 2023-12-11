import {
  SchoolDetail,
  UserDetail,
  SavedWord,
  Images,
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
});

const image1 = await Images.create({
  image: "../Images/Avatars/bear.png",
});
const image2 = await Images.create({
  image: "../Images/Avatars/cat.png",
});
const image3 = await Images.create({
  image: "../Images/Avatars/chicken.png",
});
const image4 = await Images.create({
  image: "../../Images/Avatars/dog.png",
});
const image5 = await Images.create({
  image: "../../Images/Avatars/koala.png",
});
const image6 = await Images.create({
  image: "../../Images/Avatars/meerkat.png",
});
const image7 = await Images.create({
  image: "../../Images/Avatars/panda.png",
});
const image8 = await Images.create({
  image: "../../Images/Avatars/rabbit.png",
});
const image9 = await Images.create({
  image: "../../Images/Avatars/sea-lion.png",
});


console.log(user1)
// console.log(await user1.getSavedWords())
console.log(user1Eager.savedWords)

console.log(
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9
)


await dbConnection.close()
