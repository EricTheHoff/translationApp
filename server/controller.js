import { SchoolDetail, UserDetail } from "../src/Database/models.js";
import axios from 'axios'

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

  translate: async (req, res) => {
    try {
        const { translation, language } = req.body
        // const headers = {
        //     'Authorization': 'DeepL-Auth-Key 8ac3442f-8ea2-9a61-f98f-d358fd0a2a08:fx'
        // }
        const body = {
            'text': [translation],
            'target_lang': language
        }

        const response = await axios.post('https://api-free.deepl.com/v2/translate', body, {
            headers: {
                'Authorization': 'DeepL-Auth-Key'
            }
        })
        res.json(response.data)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
  }
};

export default handlerFunctions;
