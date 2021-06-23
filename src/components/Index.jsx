import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Index = () => {
    const info = localStorage.getItem("info");
    const localInput = info ? JSON.parse(info) : console.log("error: localstrage is null");

    const apiUrl = `https://jirei-seido-api.mirasapo-plus.go.jp/supports?limit=100&stage_category=${localInput.stage.id}&industry_category=${localInput.industry.id}&prefecture.name=${localInput.prefecture}`;
    
    const [posts, setPosts] = useState([])
    const initialPosts = [];

    useEffect(() => {
        axios.get(apiUrl)
        .then(res => {
            res.data.items.forEach((result) => {
                initialPosts.push(result.title);
            })
            // const response = res.data.title;
            // console.log(response);
            setPosts(initialPosts)
        });
    }, []);

    return (
      <>
        <div className="container">
            {
                posts.map(post => (
                <div className="posts-index-item" >
                    <a className="post-title">{post}</a> <br></br>                
                </div>
                )
                )
            }     
        </div>
      </>
    );
}
