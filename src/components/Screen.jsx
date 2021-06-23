import React, { useState, useEffect } from "react";
import axios from 'axios';

const apiUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/supports?limit=100&stage_category=1&industry_category=3&prefecture.name=北海道";

export const Screen = () => {
    const [posts, setPosts] = useState([])
    const initialPosts = [];

    useEffect(() => {
        axios.get(apiUrl)
        .then(res => {
            res.data.items.forEach((result) => {
                initialPosts.push(result.title);
                console.log(result.title);
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
