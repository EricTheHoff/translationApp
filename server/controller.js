import {
  SchoolDetail,
  UserDetail,
  FurtherStudy,
} from "../src/Database/models.js";
import axios from "axios";
import bcrypt from "bcryptjs";

const handlerFunctions = {
  register: async (req, res) => {
    const { email, password, zipCode, profilePic } = req.body;

    const salt = bcrypt.genSaltSync(12);
    const hash = await bcrypt.hash(password, salt);

    const alreadyExists = await UserDetail.findOne({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      res
        .status(500)
        .json({ error: `An account with that email already exists.` });
    } else {
      const newUser = await UserDetail.create({
        email: email,
        password: hash,
        zipCode: zipCode,
        profilePic: profilePic,
      });

      req.session.user = newUser;
      req.session.userId = newUser.userId;

      res.send({
        message: "account created",
        user_id: newUser.user_id,
      });
    }
  },

  getSavedSchools: async (req, res) => {
    const savedSchool = await SchoolDetail.findAll();
    res.json(savedSchool);
  },

  deleteSavedSchools: async (req, res) => {
    const { schoolId } = req.params;
    await SchoolDetail.destroy({
      where: { schoolId: schoolId },
    });

    res.json({ success: true, deletedSchool: schoolId });
  },

  deleteAccount: async (req, res) => {
    // const { id } = req.params;
    const id = req.session.userId;
    const user = await UserDetail.findOne({
      where: { userId: id },
    });
    await user.destroy();
    req.session.destroy();
    res.json({ success: true });
  },

  editAccount: async (req, res) => {
    // const { id } = req.params
    const id = req.session.userId;
    const { email, newPassword, zipcode, currentPassword, profilePic } =
      req.body;
    const user = await UserDetail.findOne({ where: { userId: id } });
    const hashMatch = await bcrypt.compare(currentPassword, user.password);

    if (newPassword === "") {
      user.email = email;
      user.zipCode = zipcode;
      user.profilePic = profilePic;

      await user.save();
      res.json({ success: true });
    } else if (hashMatch === false) {
      res.json({ success: false });
    } else {
      const salt = bcrypt.genSaltSync(12);
      const hash = await bcrypt.hash(newPassword, salt);
      user.email = email;
      user.password = hash;
      user.zipCode = zipcode;

      res.json({ success: true });
      await user.save();
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDetail.findOne({ where: { email: email } });
    const hashMatch = await bcrypt.compare(password, user.password);

    if (user && hashMatch === true) {
      req.session.userId = user.userId;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  },

  user: async (req, res) => {
    const id = req.session.userId;
    const user = await UserDetail.findOne({ where: { userId: id } });

    res.send(user);
  },
  userSchools: async (req, res) => {
    const user = await UserDetail.findOne({
      where: { userId: req.session.userId },
      include: SchoolDetail,
    });

    res.json(user);
  },

  userStatus: async (req, res) => {
    if (req.session.userId) {
      const user = await UserDetail.findByPk(req.session.userId);
      res.send({ email: user.email, success: true });
    } else {
      res.json({ success: false });
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  },

  getSavedSchools: async (req, res) => {
    const savedSchool = await SchoolDetail.findAll();
    res.json(savedSchool);
  },
  deleteSavedSchools: async (req, res) => {
    const { schoolId } = req.params;
    await SchoolDetail.destroy({
      where: { schoolId: schoolId },
    });
  },

  profileImage: async (req, res) => {
    const { image } = req.body;
    console.log(image);
    await UserDetail.create({
      where: { image: image },
    });
  },

  getImage: async (req, res) => {
    await UserDetail.findOne({
      where: { image: image },
    });
    res.json(image);
  },

  getSavedWords: async (req, res) => {
    const savedTranslation = await SavedWord.findAll();
    res.json(savedTranslation);
  },

  getWordsById: async (req, res) => {
    const { wordId } = req.params;
    const getWordId = await SavedWord.findByPk(wordId);
    res.json(getWordId);
  },

  deleteSavedWords: async (req, res) => {
    const { wordId } = req.params;
    await SavedWord.destroy({
      where: { wordId: wordId },
    });
    res.json({ success: true, deletedWord: wordId });
  },

  translate: async (req, res) => {
    try {
      const { translation, language, source } = req.body;
      const body = {
        text: [translation],
        target_lang: language,
        source_lang: source,
      };
      console.log(req.body);

      const response = await axios.post(
        "https://api-free.deepl.com/v2/translate",
        body,
        {
          headers: {
            Authorization: process.env.REACT_APP_DEEPL_API_KEY,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  saveTranslation: async (req, res) => {
    const { translatedText, originalText, id, toLanguage } = req.body;

    const translation = await SavedWord.create({
      word: translatedText,
      original: originalText,
      userId: id,
      toLanguage: toLanguage,
    });
    if (translation) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSavedPhrases: async (req, res) => {
    const savedPhrases = await FurtherStudy.findAll();
    console.log(savedPhrases);
    res.json(savedPhrases);
  },

  saveWord: async (req, res) => {
    const { originalLanguage, word, toLanguage } = req.body;
    const savingWord = await SavedWord.create({
      word: word,
      original: originalLanguage,
      toLanguage: toLanguage,
    });
    res.json(savingWord);
  },
  saveTutor: async (req, res) => {
    const userId = req.session.userId;

    try {
      const { name, rating, vicinity, website } = req.body;

      // Check if the tutor already exists in the database
      const existingTutor = await SchoolDetail.findOne({
        where: {
          name: name,
        },
      });

      if (!existingTutor) {
        // If the tutor doesn't exist, create a new record in the database
        const savingTutor = await SchoolDetail.create({
          name: name,
          rating: rating,
          address: vicinity,
          website: website,
        });

        // Associate the new tutor with the user who added it
        const user = await UserDetail.findByPk(userId);
        if (user) {
          // Create an entry in the SchoolUserDetail table with the userId and savingTutorId
          // await user.addSchoolsAddedByUser(savingTutor);
          await user.addSchoolDetail(savingTutor);
        }

        // Fetch user data including added schools
        const updatedUser = await UserDetail.findByPk(userId, {
          include: SchoolDetail,
        });

        res.json({ success: true, user: updatedUser });
      } else {
        // If the tutor already exists, respond accordingly
        res.json({ message: "Tutor already exists in the database" });
      }
    } catch (error) {
      console.error("Error saving tutor:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default handlerFunctions;
