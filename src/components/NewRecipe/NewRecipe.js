import React from "react";
import Input from "./Input";
import DynamicInputGenerator from "./DynamicInput/DynamicInputGenerator";
import Select from "./Select/Select";
import { useState, useContext } from "react";
import BookContext from "../../context/Context";
import style from "./NewRecipe.module.css";
import storage from "../../firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewRecipePage = () => {
  const BookPages = useContext(BookContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [addRecipe, setAddRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let ArrInputs = [];
  const pushInputs = (newInput) => {
    ArrInputs = ArrInputs.filter((input) => input.id !== newInput.id);
    ArrInputs.push(newInput);
    formValidation();
  };

  const formValidation = () => {
    setFormIsValid(
      ArrInputs.reduce((prev, curr) => prev && curr.IsValid, true)
    );
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    const data = event.target.elements;
    urlStorage(data.image.files[0], data);
    setIsLoading(true);

    for (let inputState = 0; inputState < ArrInputs.length; inputState++) {
      if (!(ArrInputs[inputState].type === "dynamic"))
        ArrInputs[inputState].reset();
    }
    setFormIsValid(false);
    setAddRecipe(false);
  };

  const urlStorage =  async (image, data) => {
    const storageRef = ref(storage, `/${image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
      //   const percent = Math.round(
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          createRecipe(data, url);
        });
      }
    );
  }

  const createRecipe = (data, url) => {
    const newRecipe = [
      {
        component: "DiscriptionPage",
        type: (BookPages.ArrTypesHebrew.indexOf(data.type.value) + 1),
        name: data.name.value,
        time: `${data.time.value} ${data.timeUnits.value}`,
        stars: data.stars.value,
        url: url,
        ingredients: Object.keys(data)
          .filter((key) => key.includes("ingredients"))
          .map((ingredient) => {
            return data[ingredient].value;
          }),
      },
      {
        component: "InstructionsPage",
        instructions: Object.keys(data)
          .filter((key) => key.includes("instructions"))
          .map((instruction) => {
            return data[instruction].value;
          }),
      },
    ];
    console.log(newRecipe);
    BookPages.postPageHandler(newRecipe);
    document.getElementById("newRecipe").style.zIndex = "-1";
    setIsLoading(false);
  }

  return (
    <div id="newRecipe" className={style.note}>
      {(!isLoading && !addRecipe) && 
        <button
          className={`${style.addRecipeButton} purple`}
          onClick={setAddRecipe.bind(null, true)}
        >
          +
        </button>
      }  
      {(isLoading && !addRecipe) && <p className={`${style.loading} purple`}>יוצר מתכון חדש...</p>}
      {addRecipe && (
        <form className={style.form} onSubmit={formSubmissionHandler}>
          <Input
            id="name"
            type="text"
            label="שם המנה"
            pushInputs={pushInputs}
            validation={(input) => input.trim() !== ""}
            err = "שם המנה לא יכול להיות ריק"
            autocomplete= "off"
          ></Input>
          <Select
            id="type"
            values={["ראשונות", "עיקריות", "קינוחים"]}
            label={"סוג המנה"}
          ></Select>
          <div className={style["time-continer"]}>
            <Input
              id="time"
              type="number"
              label="זמן הכנה"
              pushInputs={pushInputs}
              validation={(input) => input.trim() !== "" && input <= 100 && input >= 1}
              err = "זמן ההכנה קטן מ-100"
              min="1"
              max="100"
              step="0.5"
            ></Input>
            <Select id="timeUnits" values={["דקות", "שעות"]}></Select>
          </div>
          <Input
            id="stars"
            type="number"
            label="הכוכבים של טלי"
            pushInputs={pushInputs}
            validation={(input) => input.trim() !== "" && input <= 5 && input >= 0}
            err = "מספר הכוכבים גדול מ-0 וקטן מ-5"
            min="0"
            max="5"
            step="0.1"
          ></Input>
          <Input
            id="image"
            type="file"
            label="תמונה"
            accept="image/*"
            pushInputs={pushInputs}
            validation={(input) => input.trim() !== ""}
          ></Input>
          <DynamicInputGenerator
            id="ingredients"
            type="text"
            label="רכיבים"
            pushInputs={pushInputs}
            validation={(input) => input.trim() !== ""}
            autocomplete= "off"
          ></DynamicInputGenerator>
          <DynamicInputGenerator
            id="instructions"
            type="text"
            label="הוראות"
            pushInputs={pushInputs}
            validation={(input) => input.trim() !== ""}
            autocomplete= "off"
          ></DynamicInputGenerator>
          <div className={style["form-actions"]}>
            <button disabled={!formIsValid}>יצירת מתכון חדש</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewRecipePage;
