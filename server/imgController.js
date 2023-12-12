import { Images } from "../src/Database/models.js";

const imgFunctions = {

    bearImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    catImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    chickenImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    dogImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    koalaImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    meerkatImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    pandaImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    rabbitImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

    sealionImg: async (req, res) => {

        let image = await Images.findOne({
            where: { imageId: 1 }
        })
        res.json(image)
    },

}

export default imgFunctions;