import React, { useState, useEffect } from "react";
import axios from 'axios';

const contentUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/supports/259"; // 新創業融資制度

export const Content = () => {
    const [content, setContent] = useState({})

    const initialContent = {
        "title": "",
        "subtitle": "",
        "target": "",
        "summary": "",
        "body": "",
        "usage": "",
        "inquiry": "",
    };

    useEffect(() => {
        axios.get(contentUrl)
        .then(res => {
            initialContent.title = res.data.title;
            initialContent.subtitle = res.data.title;
            initialContent.target = res.data.target;
            initialContent.summary = res.data.summary;
            initialContent.body = res.data.usage;
            initialContent.inquiry = res.data.inquiry;
            setContent(initialContent)
        });
    }, []);

    return (
      <>
        <h2>{content.title}</h2>
        <h3>{content.subtitle}</h3>
        <div className="container">
                <div>
                    <h4>対象の事業者</h4>
                    <a>{content.target}</a>
                </div>
                <div>
                    <h4>概要</h4>
                    <a>{content.summary}</a>
                </div>
                <div>
                    <a>{content.body}</a>         
                </div>
                <div>
                    <h4>連絡先</h4>
                    <a>{content.inquiry}</a>
                </div>
        </div>
      </>
    );
}