const SentimentModel = require("../models/sentiment.model");
const Joi = require("joi");

class SentimentService {

    // getAllSentiments = async ({perPage= 10, currentPage=1}) => {
    //     try {
    //         let skip = (currentPage-1) * perPage;
            
    //         let data = await SentimentModel.find()
    //             .populate("categories")
    //             .populate("city")
    //             .populate("ownerId")
    //             .sort({_id: -1})
    //             .skip(skip)
    //             .limit(perPage)
    //         return data;
    //     } catch(exception) {
    //         console.log(exception)
    //         throw {status: 500, msg: "Query execution failed."}
    //     }
    // }

    getAllCount = async (filter={}) => {
        return await SentimentModel.count(filter);
    }

    createSentiment = async(data) => {
        try {
            let sentiment = new SentimentModel(data);
            return await sentiment.save()
        } catch(exception) {
            console.log(exception)
            throw {
                status: 500, msg: "DB Query failed"
            }
        }
    }

    // getSentimentById = async(id) => {
    //     try {
    //         let sentiment = await SentimentModel.findById(id)
    //             .populate("categories")
    //             .populate("city")
    //             .populate("ownerId");
    //         if(sentiment) {
    //             return sentiment
    //         } else {
    //             throw {status: 404, msg: "Sentiment does not exists"}
    //         }
    //     } catch(err) {
    //         console.log(err)
    //         throw err
    //     }
    // }
    

    // deleteSentimentById = async(id) => {
    //     try{
    //         let delResponse = await SentimentModel.findByIdAndDelete(id)
    //         if(delResponse){
    //             return delResponse
    //         } else {
    //             throw {status: 404, msg: "Sentiment has been already deleted or does not exists"}
    //         }
    //     } catch(except) {
    //         throw except
    //     }
    // }

    // getSentimentByFilter = async(filter, paging) =>  {
    //     try {
    //         let skip = (paging.currentPage-1) * paging.perPage;
    //         let response = await SentimentModel.find(filter)
    //             .populate("categories")
    //             .populate("city")
    //             .populate("ownerId")
    //                 .sort({_id: -1})
    //                 .skip(skip)
    //                 .limit(paging.perPage)
    //         return response;
    //     } catch(exception) {
    //         throw exception
    //     }
    // }
}

module.exports = SentimentService;