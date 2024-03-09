const express = require("express");
const axios = require("axios");
const newsRouter = express.Router();

newsRouter.get('', async(req, res) => {
    try {
        const newsApi = await axios.get(`http://localhost:3000/api`);
        res.render('posts', {articles: newsApi});

    } catch (error) {
        if(error.response){
            res.render('posts', {articles: null});
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.header);
        }else if(error.request){
            res.render('posts', {articles: null});
            console.log(error.request)
        }else{
            console.log(error.message);
            res.render('posts', {articles: null});
        }
    }
})