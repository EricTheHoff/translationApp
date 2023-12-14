import {
  SchoolDetail,
  UserDetail,
  SavedWord,
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
  zipCode: "93457",
});

const wordOne = await SavedWord.create({
  word: "Hvor kommer du fra?",
  original: "Where do you come from?",
  toLanguage: 'NB'
});
await userOne.addSavedWord(wordOne);

const user1 = await UserDetail.findOne();
const user1Eager = await UserDetail.findOne({
  where: {
    userId: 1,
  },
  include: SavedWord,
});

await FurtherStudy.bulkCreate([{
  phrase: "Hello, how are you?",
  difficulty: 1
},{
  phrase: "What's your name?",
  difficulty: 1
},{
  phrase: "Nice to meet you.",
  difficulty: 1
},{
  phrase: "Where are you from?",
  difficulty: 1
},{
  phrase: "Yes, I can speak a little.",
  difficulty: 1
},{
  phrase: "I am learning a language.",
  difficulty: 1
},{
  phrase: "How do you say that?",
  difficulty: 1
},{
  phrase: "Can you repeat that, please?",
  difficulty: 1
},{
  phrase: "I don't understand.",
  difficulty: 1
},{
  phrase: "Can you speak slowly, please?",
  difficulty: 1
},{
  phrase: "Excuse me, what did you say?",
  difficulty: 1
},{
  phrase: "Thank you.",
  difficulty: 1
},{
  phrase: "You're welcome.",
  difficulty: 1
},{
  phrase: "Good morning.",
  difficulty: 1
},{
  phrase: "Good afternoon.",
  difficulty: 1
},{
  phrase: "Good evening.",
  difficulty: 1
},{
  phrase: "Good night.",
  difficulty: 1
},{
  phrase: "How are you feeling today?",
  difficulty: 1
},{
  phrase: "I am happy.",
  difficulty: 1
},{
  phrase: "I am sad.",
  difficulty: 1
},{
  phrase: "What is the weather like today?",
  difficulty: 1
},{
  phrase: "It is sunny.",
  difficulty: 1
},{
  phrase: "It is rainy.",
  difficulty: 1
},{
  phrase: "It is windy.",
  difficulty: 1
},{
  phrase: "It is cloudy.",
  difficulty: 1
},{
  phrase: "It is cold.",
  difficulty: 1
},{
  phrase: "It is hot.",
  difficulty: 1
},{
  phrase: "What time is it?",
  difficulty: 1
},{
  phrase: "Can you help me, please?",
  difficulty: 1
},{
  phrase: "I need a phone.",
  difficulty: 1
},{
  phrase: "Where is it?",
  difficulty: 1
},{
  phrase: "How much does this cost?",
  difficulty: 1
},{
  phrase: "Where is the bathroom?",
  difficulty: 1
},{
  phrase: "I would like to order food.",
  difficulty: 1
},{
  phrase: "The food is delicious.",
  difficulty: 1
},{
  phrase: "Can I have the bill, please?",
  difficulty: 1
},{
  phrase: "How do I get there?",
  difficulty: 1
},{
  phrase: "Is it far from here?",
  difficulty: 1
},{
  phrase: "Turn left.",
  difficulty: 1
},{
  phrase: "Turn right.",
  difficulty: 1
},{
  phrase: "Go straight.",
  difficulty: 1
},{
  phrase: "Stop here.",
  difficulty: 1
},{
  phrase: "I'm lost. Where am I?",
  difficulty: 1
},{
  phrase: "Can you show me on the map?",
  difficulty: 1
},{
  phrase: "I need a doctor.",
  difficulty: 1
},{
  phrase: "I am not feeling well.",
  difficulty: 1
},{
  phrase: "I have a headache.",
  difficulty: 1
},{
  phrase: "Can you recommend a restaurant?",
  difficulty: 1
},{
  phrase: "Turn around.",
  difficulty: 1
},{
  phrase: "I forgot my keys.",
  difficulty: 1
},{
  phrase: "I like to eat pizza on Fridays.",
  difficulty: 2
},{
  phrase: "My favorite colors are blue, yellow, and green.",
  difficulty: 2
},{
  phrase: "She goes to school every day.",
  difficulty: 2
},{
  phrase: "We like to play soccer in the park.",
  difficulty: 2
},{
  phrase: "Can you pass me the salt, please?",
  difficulty: 2
},{
  phrase: "My family has a cat and a dog.",
  difficulty: 2
},{
  phrase: "The weather looks nice today.",
  difficulty: 2
},{
  phrase: "I really enjoy reading books.",
  difficulty: 2
},{
  phrase: "They watch movies on the weekend.",
  difficulty: 2
},{
  phrase: "He works in a small office.",
  difficulty: 2
},{
  phrase: "I have two brothers and one sister.",
  difficulty: 2
},{
  phrase: "We live in a small town.",
  difficulty: 2
},{
  phrase: "He cooks dinner for his family.",
  difficulty: 2
},{
  phrase: "I take the bus to work every day.",
  difficulty: 2
},{
  phrase: "My friend is coming to visit tomorrow.",
  difficulty: 2
},{
  phrase: "Do you like to listen to music?",
  difficulty: 2
},{
  phrase: "We go swimming in the summer.",
  difficulty: 2
},{
  phrase: "It's raining outside.",
  difficulty: 2
},{
  phrase: "My mom makes delicious cookies.",
  difficulty: 2
},{
  phrase: "They go shopping on Satudays.",
  difficulty: 2
},{
  phrase: "What is your favorite hobby?",
  difficulty: 2
},{
  phrase: "I want to learn to play the guitar.",
  difficulty: 2
},{
  phrase: "My brother and I share the same room.",
  difficulty: 2
},{
  phrase: "She is wearing a green dress.",
  difficulty: 2
},{
  phrase: "Can you help me with my homework?",
  difficulty: 2
},{
  phrase: "We go to the beach every year.",
  difficulty: 2
},{
  phrase: "My favorite subject at school is science.",
  difficulty: 2
},{
  phrase: "The movie starts at 7 tonight.",
  difficulty: 2
},{
  phrase: "I have a big family gathering next week.",
  difficulty: 2
},{
  phrase: "She loves to draw and paint.",
  difficulty: 2
},{
  phrase: "I usually wake up early.",
  difficulty: 2
},{
  phrase: "He plays the piano very well.",
  difficulty: 2
},{
  phrase: "We visit our grandparents during the holidays.",
  difficulty: 2
},{
  phrase: "What is the time right now?.",
  difficulty: 2
},{
  phrase: "I enjoy going for walks in the park.",
  difficulty: 2
},{
  phrase: "They have a big garden in their backyard.",
  difficulty: 2
},{
  phrase: "My dad fixes things around the house.",
  difficulty: 2
},{
  phrase: "I have a red car with blue trim.",
  difficulty: 2
},{
  phrase: "She is great at playing video games.",
  difficulty: 2
},{
  phrase: "I want to travel to different countries.",
  difficulty: 2
},{
  phrase: "We eat dinner together as a family.",
  difficulty: 2
},{
  phrase: "Can you help me find my keys?",
  difficulty: 2
},{
  phrase: "My favorite movie genre is comedy.",
  difficulty: 2
},{
  phrase: "They have a cute puppy.",
  difficulty: 2
},{
  phrase: "I like to take photographs.",
  difficulty: 2
},{
  phrase: "What is your favorite season?",
  difficulty: 2
},{
  phrase: "I have a lot of friends at school.",
  difficulty: 2
},{
  phrase: "We celebrate birthdays with cake.",
  difficulty: 2
},{
  phrase: "He likes to ride his bike.",
  difficulty: 2
},{
  phrase: "I enjoy going to the park with my friends.",
  difficulty: 2
},{
  phrase: "Learning grammar can be challenging but is important for good communication.",
  difficulty: 3
},{
  phrase: "Mastering verb conjugations helps in making correct sentences.",
  difficulty: 3
},{
  phrase: "Understanding physics can be tough even for experienced scientists.",
  difficulty: 3
},{
  phrase: "Figuring out the legal system can be challenging but is crucial for anyone involved in law.",
  difficulty: 3
},{
  phrase: "Mixing cultural elements often leads to interesting art.",
  difficulty: 3
},{
  phrase: "Tackling climate change requires everyone in the world to work together.",
  difficulty: 3
},{
  phrase: "Thinking about life's big questions can make you ponder philosophical ideas.",
  difficulty: 3
},{
  phrase: "Studying classical literature helps you appreciate and understand it better.",
  difficulty: 3
},{
  phrase: "Learning advanced math, like differential equations, takes time and effort.",
  difficulty: 3
},{
  phrase: "Understanding economic policy requires knowing what's happening in the global market.",
  difficulty: 3
},{
  phrase: "Cracking encrypted codes involves using math and logic.",
  difficulty: 3
},{
  phrase: "Making a convincing argument means knowing how to use language effectively.",
  difficulty: 3
},{
  phrase: "You need to know about historical events to understand global conflicts.",
  difficulty: 3
},{
  phrase: "Combining different subjects helps you solve problems in a well-rounded way.",
  difficulty: 3
},{
  phrase: "Making complex chemicals in chemistry is a big challenge for researchers.",
  difficulty: 3
},{
  phrase: "Thinking about the ethics of new technologies takes careful consideration.",
  difficulty: 3
},{
  phrase: "Learning a second language is not just about words but also understanding the culture.",
  difficulty: 3
},{
  phrase: "Planning a business strategy involves looking at the market thoroughly.",
  difficulty: 3
},{
  phrase: "Quantum computing is changing how we process information in a big way.",
  difficulty: 3
},{
  phrase: "Studying dark matter and dark energy is a major goal in space science.",
  difficulty: 3
},{
  phrase: "Breaking down societal norms is important for including everyone.",
  difficulty: 3
},{
  phrase: "Correct usage of statistics is key when making sense of research data.",
  difficulty: 3
},{
  phrase: "Both genes and the environment affect why humans act the way they do.",
  difficulty: 3
},{
  phrase: "Theoretical physics explores things that might challenge what we know.",
  difficulty: 3
},{
  phrase: "Adding artificial intelligence to daily life raises questions about what's right or wrong.",
  difficulty: 3
},{
  phrase: "Good architectural design is about making things look good and work well.",
  difficulty: 3
},{
  phrase: "Understanding how the brain works is a big area in cognitive science.",
  difficulty: 3
},{
  phrase: "Making cities sustainable means planning in a way that works for everyone.",
  difficulty: 3
},{
  phrase: "Studying genetics helps us figure out the reasons behind complex diseases.",
  difficulty: 3
},{
  phrase: "Fighting inequality means looking at it from different angles.",
  difficulty: 3
},{
  phrase: "Finding strong and durable materials is a big part of new research.",
  difficulty: 3
},{
  phrase: "Making countries work together means understanding how diplomacy works.",
  difficulty: 3
},{
  phrase: "Studying the universe means figuring out how it all started.",
  difficulty: 3
},{
  phrase: "Figuring out old languages is a big job for archaeologists and language experts.",
  difficulty: 3
},{
  phrase: "Saving different types of plants and animals requires an understanding of entire ecosystems.",
  difficulty: 3
},{
  phrase: "Making algorithms for computers involves knowing how to make them work best.",
  difficulty: 3
},{
  phrase: "Cognitive neuroscience studies how our brains handle complex thinking.",
  difficulty: 3
},{
  phrase: "Growing food in a way that lasts involves thinking about the environment and money.",
  difficulty: 3
},{
  phrase: "Studying climate change means looking at the weather, oceans, and air.",
  difficulty: 3
},{
  phrase: "Seeing how history affects us now means thinking about what happened in the past.",
  difficulty: 3
},{
  phrase: "Epigenetics shows us how our genes work in ways beyond their basic code.",
  difficulty: 3
},{
  phrase: "Figuring out how to use artificial intelligence ethically means making good choices with computer programs.",
  difficulty: 3
},{
  phrase: "Theoretical computer science looks at abstract ideas that help computers work well.",
  difficulty: 3
},{
  phrase: "Stopping online threats needs a plan that's always ready to change.",
  difficulty: 3
},{
  phrase: "Figuring out how our brains create consciousness is a big question in philosophy.",
  difficulty: 3
},{
  phrase: "Keeping old buildings but making them work for today is part of architectural conservation.",
  difficulty: 3
},{
  phrase: "Studying how city growth affects the environment means thinking about how everything works together.",
  difficulty: 3
},{
  phrase: "Studying the universe means looking at how everything works on a really big scale.",
  difficulty: 3
},{
  phrase: "Thinking about editing genes means balancing scientific progress with what's right and wrong.",
  difficulty: 3
},{
  phrase: "Properly maintaining a car can be difficult and expensive.",
  difficulty: 3
}]);


console.log(user1);
// console.log(await user1.getSavedWords())
console.log(user1Eager.savedWords);


await dbConnection.close();
