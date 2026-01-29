const urlService = require('../services/urlshorter.service')
exports.urlshorter = async (req,res)=>{
    try {
        let longUrl = req.body.longUrl
        let shortUrl = await urlService.getShortUrl(longUrl)
        res.status(200).json({
            "status": "success",
            "shortUrl": shortUrl
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
};  

exports.redirectUrl = async (req, res)=>{
    try {
        let shortId  = req.params.shortId
        let result = await urlService.redirectShortUrl(shortId)
        if(result.error === 'NOT_FOUND'){
            return res.status(404).json({"message": "Short URL not found"})
        }
        if(result.error === 'EXPIRED'){
            return res.status(410).json({"message": "Short URL is expired !"})
        }
        return res.redirect(302, result.longUrl)
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({
            "status": "error",
            "message": error
        })
    }
}