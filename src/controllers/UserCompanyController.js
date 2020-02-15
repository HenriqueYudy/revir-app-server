const UserCompany = require('../models/UserCompany');

module.exports = {

    index: async(req, res, next) => {
        const userCompany = await UserCompany.find({});

        if(!userCompany){
            res.status(400).json({ error : "Companies not found"});
        }

        res.status(200).json( userCompany );
    },

    show: async(req, res, next) => {
        const userCompany = await UserCompany.findById(
            req.params.userCompanyId
        )


        if(!userCompany){
            res.status(400).json({error: "Companies not found !"});
        }

        res.status(200).json(userCompany);

    },

    store: async(req, res, next) => {
        try{
            const newUserCompany = await UserCompany.create(req.body);
            return res.status(201).json(newUserCompany);
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    replaceUserCompany: async (req, res, next) => {
        const { userCompanyId } = req.params;
        const data = req.body;

        const result = await UserCompany.findByIdAndUpdate(userCompanyId, data);
        res.status(200).json({ success : true });
    },

    update: async (req, res, next)=>{
        const { userCompanyId } = req.params;
        const data = req.body;

        const result = await UserCompany.findByIdAndUpdate(userCompanyId, data);
        res.status(200).json({ success: true});
    }

}