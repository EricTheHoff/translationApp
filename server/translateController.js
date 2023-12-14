import {
  SchoolDetail,
  UserDetail,
  FurtherStudy,
} from "../src/Database/models.js";
import axios from "axios";
import bcrypt from "bcryptjs";

const translateFunctions = {
  getSavedWords: async (req, res) => {
    const savedTranslation = await SavedWord.findAll();
    res.json(savedTranslation);
  },

  getWordsById: async (req, res) => {
    const { wordId } = req.params;
    const getWordId = await SavedWord.findByPk(wordId);
    res.json(getWordId);
  },
  deleteWords: async (req, res) => {
    const { wordId } = req.params;
    await SavedWord.destroy({
      where: { wordId: wordId },
    });
    res.json({ success: true, deletedWord: wordId });
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
  translate: async (req, res) => {
    try {
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
    }
  },
  saveTranslation: async (req, res) => {
    const { translatedText, originalText, id, toLanguage } = req.body;

    const translation = await SavedWord.create({
      word: translatedText,
      original: originalText,
      userId: id,
      toLanguage: toLanguage,
    });
    if (translation) {
      res.status(200).json({ message: "OK" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default translateFunctions;
