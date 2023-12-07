import { SchoolDetail, UserDetail } from "../src/Database/models.js";

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

    deleteAccount: async (req, res) => {
        const { id } = req.params
        const user = await UserDetail.findOne({
            where: { userId: id}
        })
        await user.destroy()
        res.json({ success: true })
        // const userId = req.session.UserDetail.userId
        // await UserDetail.destroy({
        //     where: { userId: userId }
        // })
        // req.session.destroy()
    },

    // editAccount: async () => {},
};

export default handlerFunctions;
