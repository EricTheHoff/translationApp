import {
  SchoolDetail,
  UserDetail,
  FurtherStudy,
} from "../src/Database/models.js";
import axios from "axios";
import bcrypt from "bcryptjs";

const schoolFunctions = {
  getSavedSchools: async (req, res) => {
    const savedSchool = await SchoolDetail.findAll();
    res.json(savedSchool);
  },

  userSchools: async (req, res) => {
    const user = await UserDetail.findOne({
      where: { userId: req.session.userId },
      include: SchoolDetail,
    });

    res.json(user);
  },

  // deleteSchool: async (req, res) => {
  //   const { schoolId } = req.params;
  //   await SchoolDetail.destroy({
  //     where: { schoolId: schoolId },
  //   });
  //   res.send({
  //     success: true,
  //   });
  // },

  saveSchool: async (req, res) => {
    const userId = req.session.userId;

    try {
      const { name, rating, vicinity, website } = req.body;

      // 1. Query for UserDetail
      const user = await UserDetail.findByPk(userId, {
        include: {
          model: SchoolDetail,
        },
      });
      // 2. Check if SchoolDetail exists in db (query for SchoolDetail)
      // Check if the tutor already exists in the database
      const existingTutor = await SchoolDetail.findOne({
        where: {
          name: name,
        },
      });
      // - if Yes, need to check if SchoolDetail is already related to the user
      if (existingTutor) {
        for (let schoolDetailObj of user.schoolDetails) {
          // - if yes, reject because rel.already exists
          if (schoolDetailObj.name === name) {
            res.json({ message: "Tutor already added to this user" });
            return;
          }
        }
        await user.addSchoolDetail(existingTutor);
        // - if no, need to create SchoolDetail & relate it to the user
      } else {
        const newTutor = await SchoolDetail.create({
          name: name,
          rating: rating,
          address: vicinity,
          website: website,
        });
        // Associate the new tutor with the user who added it
        await user.addSchoolDetail(newTutor);
        res.json({ success: true });
        return;
      }
    } catch (error) {
      console.error("Error saving tutor:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  },
  deleteUserSchool: async (req, res) => {
    const { schoolId } = req.params;
    const userId = req.session.userId;

    try {
      // Find the user
      const user = await UserDetail.findByPk(userId);

      if (user) {
        // Use the `SchoolUserDetail` association to delete the relationship
        await user.removeSchoolDetail(schoolId);

        res.json({ success: true, deletedSchool: schoolId });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting saved school:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  placeSearch: async (req, res) => {
    try {
      const { lat, lng, radius, language } = req.query;
      const types = ["tutor", "academy", "institute", "center"];
      console.log(radius);
      // console.log(language);
      const apiKey = process.env.VITE_REACT_APP_GOOGLE_API_KEY;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${types}&keyword=${language}%20learning&key=${apiKey}`
      );
      // console.log(response.data);

      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default schoolFunctions;
