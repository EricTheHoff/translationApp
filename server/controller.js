import { SchoolDetail } from "../src/Database/models.js";

const handlerFunctions = {
  getSavedSchools: async (req, res) => {
    const savedSchool = await SchoolDetail.findAll();
    res.json(savedSchool);
  },
  deleteSavedSchools: async (req, res) => {
    const { schoolId } = req.params
    await SchoolDetail.destroy({
      where: { schoolId: schoolId},
    });
   
    
    res.json({ success: true, deletedSchool: schoolId });
  },
};

export default handlerFunctions;
