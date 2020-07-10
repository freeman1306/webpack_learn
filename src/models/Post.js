export default class Post {
    constructor(title, img){
        this.title = title
        this.date = new Date()
        this.img = img
    }

    toString(){
       return JSON.stringify({
            title: this.title,
           date: this.date.toJSON(),
            img: this.img
        }, null, 2)
    }

    get upperCaseTitle() {
       return this.title.toUpperCase()
    }

}


import('lodash').then(_ => {
    console.log('Lodash', _.random(0, 42, true));
    
})