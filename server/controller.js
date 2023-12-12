import {
  SchoolDetail,
  UserDetail,
  FurtherStudy,
} from "../src/Database/models.js";
import axios from "axios";
import bcrypt from 'bcryptjs'


const handlerFunctions = {
<<<<<<< HEAD

  register: async (req, res) => {
    const { name, email, password, zipCode, image } = req.body;


    console.log(name, email, password, zipCode);

    const alreadyExists = await UserDetail.findAll({
      where: {
        email,
      },
    });

    if (alreadyExists.length > 0) {

      res.json({ message: "Information already in use" });
      return

    } else {
      const newUser = await UserDetail.create({
        name: name,
        email: email,
        password: password,
        zipCode: zipCode,
        image: image,
      });

      console.log(newUser)


      req.session.user = newUser;

      res.send(IMAGE_DATA, {
        message: "account created",
        user_id: newUser.userId,
      });
    }

  },

=======
  register: async (req, res) => {
    const { email, password, zipCode } = req.body;

    const salt = bcrypt.genSaltSync(12)
    const hash = await bcrypt.hash(password, salt)

    const alreadyExists = await UserDetail.findOne({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      res.status(500).json({ error: `An account with that email already exists.`});
    } else {
      const newUser = await UserDetail.create({
        email: email,
        password: hash,
        zipCode: zipCode,
      });

      req.session.user = newUser;
      req.session.userId = newUser.userId

      res.send({
        message: "account created",
        user_id: newUser.user_id,
      });
    }
  },

>>>>>>> main
  getSavedSchools: async (req, res) => {
    const savedSchool = await SchoolDetail.findAll();
    res.json(savedSchool);
  },
<<<<<<< HEAD



  deleteSavedSchools: async (req, res) => {
    const { schoolId } = req.params;
    await SchoolDetail.destroy({
      where: { schoolId: schoolId },
    });


    res.json({ success: true, deletedSchool: schoolId });

  },


  deleteAccount: async (req, res) => {
    const { id } = req.params
    const user = await UserDetail.findOne({
      where: { userId: id }
    })
    await user.destroy()
    req.session.destroy()
    res.json({ success: true })
  },

  editAccount: async (req, res) => {
    const { email, password, zipcode } = req.body
    const user = await UserDetail.findOne({ where: { email: email } })

    user.email = email
    user.password = password
    user.zipCode = zipcode

    await user.save()

    res.json({ success: true })
  },


  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDetail.findOne({ where: { email: email } });

    if (user && password === user.password) {
=======

  deleteSavedSchools: async (req, res) => {
    const { schoolId } = req.params;
    await SchoolDetail.destroy({
      where: { schoolId: schoolId },
    });

    res.json({ success: true, deletedSchool: schoolId });
  },

  deleteAccount: async (req, res) => {
    const { id } = req.params;
    const user = await UserDetail.findOne({
      where: { userId: id },
    });
    await user.destroy();
    req.session.destroy();
    res.json({ success: true });
  },

  editAccount: async (req, res) => {
    const { id } = req.params
    const { email, newPassword, zipcode, currentPassword } = req.body;
    const user = await UserDetail.findOne({ where: { userId: id } });
    const hashMatch = await bcrypt.compare(currentPassword, user.password)

    if (newPassword === '') {
        user.email = email
        user.zipCode = zipcode

        await user.save()
        res.json({ success: true })

    } else if (hashMatch === false) {
        res.json({ success: false })

    } else {
        const salt = bcrypt.genSaltSync(12)
        const hash = await bcrypt.hash(newPassword, salt)
        user.email = email;
        user.password = hash;
        user.zipCode = zipcode;
    
        await user.save();
        res.json({ success: true });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDetail.findOne({ where: { email: email } });
    const hashMatch = await bcrypt.compare(password, user.password)

    if (user && hashMatch === true) {
>>>>>>> main
      req.session.userId = user.userId;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  },

<<<<<<< HEAD

=======
>>>>>>> main
  user: async (req, res) => {
    const id = req.session.userId;
    const user = await UserDetail.findOne({ where: { userId: id } });

    res.send(user);
  },

<<<<<<< HEAD

=======
>>>>>>> main
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
<<<<<<< HEAD

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
    console.log(image)
    await UserDetail.create({
      where: { image: image }
    });
  },

  getImage: async (req, res) => {

    await UserDetail.findOne({
      where: { image: image }
    })
    res.json(image)
  },
=======
>>>>>>> main

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
<<<<<<< HEAD
      where: { wordId: wordId }
    })
    res.json({ success: true, deletedWord: wordId })
=======
      where: { wordId: wordId },
    });
    res.json({ success: true, deletedWord: wordId });
>>>>>>> main
  },

  translate: async (req, res) => {
    try {
<<<<<<< HEAD
      const { translation, language, source } = req.body
      const body = {
        'text': [translation],
        'target_lang': language,
        'source_lang': source
      }

      const response = await axios.post('https://api-free.deepl.com/v2/translate', body, {
        headers: {
          'Authorization': process.env.REACT_APP_DEEPL_API_KEY
        }
      })
      res.json(response.data)
    }
    catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
=======
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
>>>>>>> main
    }
  },

  saveTranslation: async (req, res) => {
<<<<<<< HEAD
    const { translatedText, originalText, id, toLanguage } = req.body
=======
    const { translatedText, originalText, id, toLanguage } = req.body;
>>>>>>> main

    const translation = await SavedWord.create({
      word: translatedText,
      original: originalText,
      userId: id,
<<<<<<< HEAD
      toLanguage: toLanguage
    })
    if (translation) {
      res.status(200).json({ message: 'OK' })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }

=======
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
    const { name, rating, vicinity, website } = req.body;
    console.log(req.body);
    console.log("hello");
    const savingTutor = await SchoolDetail.create({
      name: name,
      rating: rating,
      address: vicinity,
      website: website,
    });
    res.json(savingTutor);
>>>>>>> main
  },
};

export default handlerFunctions;
