import React, { useState, useEffect } from "react";
import axios from 'axios';

// components
import { Form } from './Form.jsx';
import { Content } from './Content.jsx';
import { Index } from './Index.jsx';
import { Tab } from './Tab.jsx';

const apiUrl = "https://jirei-seido-api.mirasapo-plus.go.jp/supports?limit=100&stage_category=1&industry_category=3&prefecture.name=北海道";

const initialScreenState = {
  isVisibleForm: false,
  isVisibleIndex: false,
  isVisibleContent: false,
  isVisibleAbout: false,
};

export const Screen = () => {
    const [switchScreen, setScreen] = useState(initialScreenState);

    return (
      <>
        <div className="responsive">
        {switchScreen.isVisibleIndex && 
        <Index/>
        }
        {switchScreen.isVisibleForm && 
        <Form/>
        }
        <Tab
          onClickFormTab={
            (posts) => setScreen({
              isVisibleForm: true,
              isVisibleIndex: false,
              isVisibleContent: false,
              isVisibleAbout: false,
              })
            }
            onClickContentTab={() => setScreen({
              ...switchScreen,
              isVisibleForm: false,
              isVisibleIndex: false,
              isVisibleContent: true,
              isVisibleAbout: false,
              })
            }
            onClickIndexTab={() => setScreen({
              ...switchScreen,
              isVisibleForm: false,
              isVisibleIndex: true,
              isVisibleContent: false,
              isVisibleAbout: false,
            })
            }
            onClickAboutTab={() => setScreen({
              ...switchScreen,
              isVisibleForm: false,
              isVisibleIndex: true,
              isVisibleContent: false,
              isVisibleAbout: true,
            })
            }
        />
        </div>
      </>
    );
}
