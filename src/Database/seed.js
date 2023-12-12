import {
  SchoolDetail,
  UserDetail,
  SavedWord,
  Images,
  dbConnection,
  FurtherStudy,
} from "./models.js";
import bcrypt from 'bcryptjs';

await dbConnection.sync({ force: true });
await SchoolDetail.create({
  name: "rosetta stone",
  address: "190 E 300 N Lehi, UT 84043",
  phone: "(555) 555-5555",
  website: "www.rosettastone.com",
  userId: 1,
});

const hash = await bcrypt.hash('test', 12)
const userOne = await UserDetail.create({
  email: "test@test.com",
  password: hash,
  profilePic: null,
  zipCode: "93457",
});

const wordOne = await SavedWord.create({
  word: "novato",
});
await userOne.addSavedWord(wordOne);

const user1 = await UserDetail.findOne();
const user1Eager = await UserDetail.findOne({
    where: {
        userId: 1
    },
    include: SavedWord
});

await FurtherStudy.bulkCreate([{
  phrase: "Hello, How are You?",
  userId: 1
},{
  phrase: "Howdy, How are You?",
  userId: 1
},{
  phrase: "Hola, How are You?",
  userId: 1
},{
  phrase: "What's Gucci, How are You?",
  userId: 1
}]);

const image1 = await Images.create({
  image: "bear",
});
const image2 = await Images.create({
  image: "cat",
});
const image3 = await Images.create({
  image: "chicken",
});
const image4 = await Images.create({
  image: "dog",
});
const image5 = await Images.create({
  image: "koala",
});
const image6 = await Images.create({
  image: "meerkat",
});
const image7 = await Images.create({
  image: "panda",
});
const image8 = await Images.create({
  image: "rabbit",
});
const image9 = await Images.create({
  image: "sealion",
});


console.log(user1);
// console.log(await user1.getSavedWords())
console.log(user1Eager.savedWords)


await dbConnection.close();
