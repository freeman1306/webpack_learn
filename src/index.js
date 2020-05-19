import Post from './Post'
import './styles/styles.css'
import json from './assets/json.json'
import JsPic from './assets/breed.png'


const post = new Post("Webpack Post Title", JsPic)

console.log("post to string: ", post.toString());


console.log("json", json);

