const crypto=require('crypto');
const User=require('../models/user.model');
module.exports= async(req,res,next)=>{
    const email=req.body.email;
    //console.log(email);
    try {
        //const user=await User.findByName(req.body.email);
        await User.findByName(email,async(err, user) => {
            if(!user){
                res.json({mes:'user not exist'});
                console.log('notgood');
            }
            //console.log(data.email);
            const token=await crypto.randomBytes(32).toString('hex');
            user.token=await crypto.createHash('sha256').update(token).digest('hex');
            user.token_time=Date.now() + 5*60*1000;
            await User.updateById(user.id,user,(err, data) => {
                //res.json({data});
                req.user=data;
                req.token=token;
                next()
            })
            //console.log(user);
            //next()
        })
    } catch (err) {
        console.log(err.message);
        res.json({mes:'server error'});
    }
};