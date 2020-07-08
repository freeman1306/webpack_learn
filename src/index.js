import * as $ from "jquery";
import Post from '@models/Post'
import './styles/styles.css'
// import json from './assets/json.json'
import JsPic from '@/assets/breed'
// import xml from './assets/data.xml'
// import csv from "./assets/data.csv";


const post = new Post("Webpack Post Title", JsPic)

$('pre').html(post.toString())

console.log("post to string: ", post.toString());


// console.log("csv", csv);

