import React, { useState, useEffect } from "react";
import axios from 'axios';

// components
import { Form } from './Form.jsx';
import { Content } from './Content.jsx';
import { Index } from './Index.jsx';
import { Tab } from './Tab.jsx';

const apiUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/supports?limit=100&stage_category=1&industry_category=3&prefecture.name=北海道";

export const Screen = () => {
    const [posts, setPosts] = useState([]);
    const initialPosts = [];

    return (
      <>
        <div className="responsive">
        <Index/>
        <Tab/>
        </div>
      </>
    );
}
