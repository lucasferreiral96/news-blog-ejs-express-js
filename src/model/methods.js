const mongoose = require("mongoose");
const schema = require("./schema");



const getData = async () => {

    try {
        const user = await schema.find({});
        return user;

    } catch (error) {
        
    }
}

module.exports = {getData};