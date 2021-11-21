
const Cart=require('../../models/forentend/cart.model');
const Order=require('../../models/forentend/order.model');



//add to cart
exports.addcart = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    // Validate request
    if (req.body.user_id===undefined||req.body.course_id===undefined) {
        res.status(400).send({
            message: "All field is require!"
        });
    }else{

    // Create a cart
    const cart = new Cart({
        user_id: req.body.user_id,
        course_id: req.body.course_id,
        //created_at: req.body.created_at,
        //modified_at: req.body.modified_at
    });



    // Save Topic in the database
    Cart.create(cart, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Topic."
            });
        else res.send(data);
    });
}
    //res.status(500).send({message:'user all redy exist'});
}



//show cart detail
exports.findcart = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Cart.findAll(req.params.user_id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menu."
            });
        else res.send(data);
    });
};


exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Cart.RemoveByID(req.params.courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Item with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Item with id " + req.params.courseId
                });
            }
        } else res.send({ message: `Item was deleted successfully!` });
    });
};



exports.checkout=(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Cart.checkout(req.params.cartId,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Item with id ${req.params.cartId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Item with id " + req.params.cartId
                });
            }
        } else res.send({ message: `Item was deleted successfully!` });
    })

}


exports.coponapply = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");

    if (req.body.coupon===undefined||req.body.amount===undefined||req.body.user_id===undefined||req.body.discount_amount===undefined) {
        res.status(400).send({
            message: "Coupon_code,total amount,user_id and discount_amount All field is require!"
        });
    }else{
    copon=req.body.coupon;
    total=req.body.amount;
    user=req.body.user_id;
    discount=req.body.discount_amount;
    Cart.coupon(copon,total,user,discount,(err, data) => {
        console.log(data);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menu."
            });
        else {
            console.log(data);
            res.status(200).send(data);
        }
    });
}
};

exports.checkout=(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    if (req.body.user_id===undefined||req.body.total_price===undefined||req.body.code===undefined||req.body.finalprice===undefined||req.body.status===undefined||req.body.total_items===undefined||req.body.discount_amount===undefined) {
        res.status(400).send({
            message: "All field is require!"
        });
    }else{
    const order=new Order({
        id_users:req.body.user_id,
        total_amount:req.body.total_price,
        couponcode:req.body.code,
        paid_amount:req.body.finalprice,
        status:req.body.status,
        total_items:req.body.total_items,
        discount_amount	:req.body.discount_amount
    })
    Order.create(order, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else res.send(data);
      });
    }
    }