import {
  schoolDetails,
  userDetails,
  savedWords,
  dbConnection,
} from "./models.js";

await dbConnection.sync({ force: true });
await schoolDetails.create({
  name: "rosetta stone",
  address: "190 E 300 N Lehi, UT 84043",
  phone: "(555) 555-5555",
  website: "www.rosettastone.com",
  userId: 1,
});

await userDetails.create({
  name: "John Doe",
  email: "johndoe1998@gmail.com",
  password: "ilovejohndoe420",
  schoolId: 1,
  wordId: 1,
});

await savedWords.create({
  word: "novato",
  userId: 1,
});
