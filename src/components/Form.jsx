import React, { useState, useEffect } from "react";
import axios from 'axios';
import { GAS_URL } from "../credentials.js";
import { Select } from "@chakra-ui/react"

var categoriStageUrl = `https://jirei-seido-api.mirasapo-plus.go.jp/categories/stages`;

export const Form = () => {
    const initialInput = {
        prefecture: "新潟県",
        stage: {
            id: "1",
            name: "事業計画",
        },
        industry: {
            id: "1",
            name: "農業",
        },
    };

    const [input, setInput] = useState(initialInput);
    const [stageList, setStageList] = useState({});

    useEffect(() => {
        axios.get(categoriStageUrl)
        .then(res => {
            setStageList(res.data);
            // const response = res.data.title;
            // console.log(response);
        });
    }, []);

    // -----------------------フォームの保存用処理---------------------------
    const saveUserInfo = () => {
        
        localStorage.setItem("info", JSON.stringify(input)); // localStrageにjsonとして保存
        /*
        axios.post(GAS_URL, {
            "mail": input.prefectureInput
        })
        .then(response => {
            console.log(response.data);
        })
        */
    }

    const submit = (e) => {
        if (e.key === 'Enter') {
            saveUserInfo();
            return;
        }
    }

    const changeInput1 = (e) => {
        setInput({
            ...input,
            prefecture: e.target.value
        });
    }

    /*
    const info = localStorage.getItem("info");
    const localInput = info ? JSON.parse(info) : {
        prefecture: "",
    }
    */

    // --------------------------レンダリング----------------------------
    return(
        <>
        <div>
        <input id="search-input" type='text'
        onChange={(e) => {changeInput1(e)}} placeholder="都道府県を入力してください"
        value={input.prefecture}
        onKeyPress={(e) => submit(e)} // TODO: submitは保存処理。つくる。
        />
        <br/>
        
        </div>
        {
        <Select placeholder="関東・甲信越地方">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </Select>
        }

        <button
        onClick={(e) => submit(e)}
        />
        </>
    )
}