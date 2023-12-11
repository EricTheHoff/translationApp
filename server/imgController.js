import { SchoolDetail, UserDetail, SavedWord, Images } from "../src/Database/models.js";

const imgFunctions = {

    bearImg: async (req, res) => {
        await Images.findOne({
            where: { imageId: 1}
        })
    }

}