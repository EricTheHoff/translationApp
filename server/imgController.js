import { Images } from "../src/Database/models.js";

const imgFunctions = {

    bearImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    catImg: async (req, res) => {
        const { imageId } = req.body;
        let image = await Images.findOne({
            where: { imageId: 1 }
        })
          res.json(image)
    },

    chickenImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    dogImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    koalaImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    meerkatImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    pandaImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    rabbitImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

    sealionImg: async (req, res) => {
        const { imageId } = req.body;
        await Images.findOne({
            where: { imageId: imageId }
        })
          res.json(imageId)
    },

}

export default imgFunctions;