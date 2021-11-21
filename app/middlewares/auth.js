const jwt=require('jsonwebtoken');

module.exports=async(req, res, next) =>{
    if(req.headers.auth) {
        const token = req.headers.auth;
        //console.log(`token=${token}`);
        if(token){
            var secret='asdfghjkl';
        }
        else{
            return res.json({mes:'token not availabel'});
        }
        try {
            //console.log(`token2=${token}`);
            const decode=await jwt.verify(token,secret);
            //console.log(decode);
            req.user=decode.user;
            next()
        } catch (err) {
            console.log(err,"err")
            return res.json({mes:'token not valid'});
        }
        
    }else{
        return res.json({mes:'token not availabel'});
    }
}