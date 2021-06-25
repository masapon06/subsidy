import React, { useState, useEffect } from "react";
import axios from 'axios';
import { GAS_URL } from "../credentials.js";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { Input } from "@material-ui/core";


const stageUrl = `https://jirei-seido-api.mirasapo-plus.go.jp/categories/stages`;
const prefectureUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/prefectures";
const industryUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/categories/industries";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

const useButtonStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

// ------------------フォームコンポーネント----------------
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
    
    const classes = useStyles();

    const buttonClasses = useButtonStyles();

    const [input, setInput] = useState(initialInput);

    const initialStageList = [];
    const [stageList, setStageList] = useState([]);
    const initialPrefectureList = [];
    const [prefectureList, setPrefectureList] = useState([]);
    const initialIndustryList = [];
    const [industryList, setindustryList] = useState([]);

    useEffect(() => {
        axios.get(stageUrl)
        .then(res => {
            setStageList(res.data);
        });
        axios.get(prefectureUrl)
        .then(res => {
            setPrefectureList(res.data);
        });
        axios.get(industryUrl)
        .then(res => {
            setindustryList(res.data);
            console.log(industryList);
        });
    }, []);

    // -----------------------フォームの保存用処理---------------------------
    const saveUserInfo = () => {
        localStorage.setItem("info", JSON.stringify(input)); // localStrageにjsonとして保存
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

    let index = 0;

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
        <div>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">会社の地域</InputLabel>
            <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                <em>会社の地域</em>
                </MenuItem>
                {prefectureList.map(prefecture => (
                    <MenuItem
                    onClick={() => {
                        setInput({
                            ...input,
                            prefecture: prefecture.name,
                        }); 
                    }}
                    value={prefecture.name}
                    >{prefecture.name}</MenuItem>
                ))
                }
            </Select>
            </FormControl>
        </div>
        <div>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">事業ステージ</InputLabel>
            <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                <em>事業ステージ</em>
                </MenuItem>
                {stageList.map(name => (
                    <MenuItem value={name.name}>{name.name}</MenuItem>
                ))
                }
            </Select>
            </FormControl>
        </div>
        <div>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">業種</InputLabel>
            <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                <em>業種</em>
                </MenuItem>
                {industryList.map(industry => (
                    <MenuItem value={industry.name}>{industry.name}</MenuItem>
                ))
                }
            </Select>
            </FormControl>
        </div>
        <div>
            <Button
                variant="contained"
                color="primary"
                className={buttonClasses.button}
                onClick={(e) => submit(e)}
                endIcon={<CloudUploadIcon></CloudUploadIcon>}
            >
                この条件で登録
            </Button>
        </div>
        <button
        onClick={(e) => submit(e)}
        />
        </>
    )
}