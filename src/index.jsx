import * as $ from "jquery";
import Post from '@models/Post'
import './styles/styles.css'
// import json from './assets/json.json'
import JsPic from '@/assets/breed'
import "./styles/less.less";
import './styles/scss.scss'
import './babel'
// import xml from './assets/data.xml'
// import csv from "./assets/data.csv";
import React from 'react'
import { redner } from "react-dom";
import { render } from "react-dom/cjs/react-dom.development";


const post = new Post("Webpack Post Title", JsPic)

// $('pre').addClass('code2').html(post.toString())

console.log("post to string: ", post.toString());


const App = () => (
    <div className="container">
    <h1>Webpack course : )</h1>


    <hr />

    <div className="logo"></div>

    <hr />

    <pre></pre>

    <hr />

    <div className="box">
        <h2>Less</h2>
    </div>
    <div className="card">
        <h2>SCSS</h2>
    </div>
</div>
)

render(<App/>, document.getElementById('app'))

// console.log("csv", csv);

