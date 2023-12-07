import { SchoolDetail, UserDetail, SavedWord } from "../src/Database/models.js";

const handlerFunctions = {
  register: async (req, res) => {
    const { name, email, password, zipCode } = req.body;

    console.log(name, email, password, zipCode);

    const alreadyExists = await UserDetail.findAll({
      where: {
        name,
        email,
      },
    });

    if (alreadyExists[0]) {
      res.status(200).send("Username or email already exists");
    } else {
      const newUser = await UserDetail.create({
        name: name,
        email: email,
        password: password,
        zipCode: zipCode,
      });

      req.session.user = newUser;

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

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDetail.findOne({ where: { email: email } });

    if (user && password === user.password) {
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

  getSavedWords: async (req, res) => {
    const savedTranslation = await SavedWord.findAll();
    res.json(savedTranslation)
  },

  getWordsById: async (req, res) => {
    const { wordId } = req.params
    const getWordId = await SavedWord.findByPk(wordId)
    res.json(getWordId)
  }
};

export default handlerFunctions;
