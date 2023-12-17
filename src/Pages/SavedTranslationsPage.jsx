import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SavedWord from "../Components/SavedWord";
import toast from 'react-hot-toast'
import { codeMapping } from "../CountryCodes/countryCodes.js";

const SavedTranslationsPage = () => {
    const [savedTranslations, setSavedTranslations] = useState([]);
    const [filteredTranslations, setFilteredTranslations] = useState([])
    const [language, setLanguage] = useState('')
    const uniqueToLanguages = [...new Set(savedTranslations.map((el) => el.toLanguage))]
    
    const handleDelete = (id) => {
        axios.delete(`/deleteWords/${id}`)

        .then(() => {
            toast.success('Translation Deleted')
            const updatedTranslations = savedTranslations.filter((el) => el.wordId !== id)

            setSavedTranslations(updatedTranslations)

            if (language !== '') {
                const updatedFilteredTranslations = updatedTranslations.filter((el) => el.toLanguage === language)
                setFilteredTranslations(updatedFilteredTranslations)
            }
        })
        .catch((error) => {
            toast.error(`An error has occurred.`)
            console.error(`The following error has occurred: ${error}`)
        })
    }

    useEffect(() => {
        axios.get("/saved-translations")

        .then((response) => {
            setSavedTranslations(response.data);
        })
        .catch((error) => console.error("error fetching data:", error));
    }, []);

    useEffect(() => {
        const filtered = savedTranslations.filter((el) => el.toLanguage === language)
        setFilteredTranslations(filtered)
    },[language])

    if (language === '') {
        return (
            <>
                <label htmlFor='language'>Choose a Language: </label>
                <select name='language' onChange={(e) => setLanguage(e.target.value)}>
                    <option value='' selected>--Choose a Language--</option>
                    {uniqueToLanguages.map((language, idx) => {
                        return (
                        <option key={idx} value={language}>{codeMapping[language]}</option>
                        )
                    })}
                </select>
    
                <div>
                    <p>Please Select a Language</p>
                </div>
    
                <Link to="/">Back to Home</Link>
            </>
        );
    } else {
        return (
            <>
                <label htmlFor='language'>Choose a Language: </label>
                <select name='language' onChange={(e) => setLanguage(e.target.value)}>
                    <option value='' selected>--Choose a Language--</option>
                    {uniqueToLanguages.map((language, idx) => {
                        return (
                        <option key={idx} value={language}>{codeMapping[language]}</option>
                        )
                    })}
                </select>
        
                <div>
                {filteredTranslations.map((el) => (
                    <SavedWord
                    key={el.wordId}
                    id={el.wordId}
                    translation={el}
                    handleDelete={handleDelete}
                    codeMapping={codeMapping}
                    />
                    ))}
                </div>
        
                <Link to="/">Back to Home</Link>
            </>
        )
    }
};

export default SavedTranslationsPage;
