const { v4: uuidv4 } = require('uuid');
const url = require('../models/urlshorter.model');

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function uuidToBase62(uuid) {
  const hex = uuid.replace(/-/g, '');

  let num = BigInt('0x' + hex);
  let base62 = '';

  while (num > 0) {
    base62 = BASE62[num % 62n] + base62;
    num = num / 62n;
  }

  return base62;
}
function generateShortId() {
  const uuid = uuidv4();
  const base62 = uuidToBase62(uuid);
  return base62.substring(0, 8);
}

module.exports={
    getShortUrl: async (longUrl)=>{
      try{
        let shortyUrl = `https://shorty.com/`
        let urlDoc = await url.findOne({longUrl})
        if(urlDoc){
          return shortyUrl+`${urlDoc.shortId}`
        }
        let shortId = generateShortId()
        let shortUrl = shortyUrl+`${shortId}`
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate()+7)
        console.log(expiresAt)
         urlDoc = await url.create({
          longUrl,
          shortId,
          expiresAt
        })
        return shortUrl
      }catch(error){
        console.log("error", error)
        throw new error;
      }
    },
    redirectShortUrl: async (shortId)=>{
      try {
        console.log("shortId", shortId);
        let longUrlDoc = await url.findOne({shortId})
        console.log("longUrlDoc",longUrlDoc)
        if(!longUrlDoc){
          return { "error": "NOT_FOUND" }
        }
        if(longUrlDoc.expiresAt && longUrlDoc.expiresAt < new Date()){
          return { "error": "EXPIRED" }
        }
        await url.updateOne(
          {"_id": longUrlDoc._id},
          {"$inc": {clickCount: 1}}
        )
        return {longUrl: longUrlDoc.longUrl};
      } catch (error) {
        throw new error;
      }
    }
}