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
    const info = localStorage.getItem("info");
    const localInput = info ? JSON.parse(info) : console.log("error: localstrage is null");
    
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    const [input, setInput] = useState(localInput);
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
        <br/>
        </div>
        <div className="form-header">
            <p>設定</p>
        </div>
        <div className="form-container">
            <div>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">{`会社の地域 (現在: ${localInput.prefecture})`}</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value="">
                    <em>{input.prefecture}</em>
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
                <InputLabel htmlFor="grouped-select">{`事業ステージ (現在: ${localInput.stage.name})`}</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem 
                    value="">
                    <em>{input.stage.name}</em>
                    </MenuItem>
                    {stageList.map(stage => (
                        <MenuItem 
                        value={stage.name} 
                        onClick={() => {
                            setInput({
                                ...input,
                                stage: {id: stage.id, name: stage.name}
                            }); 
                        }}
                        >{stage.name}</MenuItem>
                    ))
                    }
                </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">{`会社の地域 (現在: ${localInput.industry.name})`}</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <MenuItem value="">
                    <em>{input.industry.name}</em>
                    </MenuItem>
                    {industryList.map(industry => (
                        <MenuItem 
                        value={industry.name}
                        onClick={() => {
                            setInput({
                                ...input,
                                industry: {id: industry.id, name: industry.name}
                            }); 
                        }}
                        >{industry.name}</MenuItem>
                    ))
                    }
                </Select>
                </FormControl>
            </div>
        </div>
        <div className="form-footer">
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={buttonClasses.button}
                    id="btn"
                    onClick={() => saveUserInfo()}
                    endIcon={<CloudUploadIcon></CloudUploadIcon>}
                >
                    条件を変更
                </Button>
            </div>
        </div>
​
        </>
    )
}

