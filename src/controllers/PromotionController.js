const Promotion = require('../models/promotion');


module.exports = {

    index: async(req ,res ,next) => {
        const promotion = await Promotion.find({});

        if(!promotion){
            res.status(400).json({ error :  "Promotion not found ! "}).populate('company');
        }

        res.status(200).json(promotion);
    },

    show: async (req, res, next) => { 

        const promotion = await (await Promotion.findById(req.params.promotionId)).populate('company');

        if(!promotion){
            res.status(400).json({ error: "Promotion not found ! "});
        }

        res.status(200).json(promotion)
        
    },

    showByCompany: async(req, res ,next ) => {

        const promotion = await Promotion.find().where('company').equals(req.params.companyId).populate('company');

        if(!promotion){
            res.status(400).json({ error : "Promotion not found !"});
        }

        res.status(200).json(promotion);
    },

    store: async(req, res, next) => {

        try{
            const newPromotion =  await Promotion.create(req.body);
            return res.status(201).json(newPromotion);
        }catch(err) {
            return res.status(400).json({ error : err});
        }
    },

    replacePromotion: async( req ,res , next) => {
        const { promotionId } = req.params;
        const data = req.body;

        const  result = await Promotion.findByIdAndUpdate(promotionId, data);
        
        if(!result){
            res.status(400).json({ error : "Promotion not found to uptade "});
        }

        res.status(200).json(result);

    },

    update: async(req, res, next) => {
        const { promotionId } = req.params;

        const data = req.body;

        const result = await Promotion.findByIdAndUpdate(promotionId, data);

        if(!result){
            res.status(400).json({ error : "Promotion not found to update"});
        }
        res.status(200).json(result);
    }

}