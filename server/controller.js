import { SchoolDetail, UserDetail } from "../src/Database/models.js";

const handlerFunctions = {
  register: async (req, res) => {
    const { name, email, password, zipCode } = req.body;

    console.log(name, email, password, zipCode);

    const alreadyExists = await UserDetail.findAll({
      where: {
        email,
      },
    });

    if (alreadyExists.length > 0) {
      res.json({ message: "Information already in use"});
      return
    } else {
      const newUser = await UserDetail.create({
        name: name,
        email: email,
        password: password,
        zipCode: zipCode,
      });

      console.log(newUser)

      req.session.user = newUser;

      res.send({
        message: "account created",
        user_id: newUser.userId,
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
};

export default handlerFunctions;
