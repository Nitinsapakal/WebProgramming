
const express = require("express");
const conn = require("../db/dbconnect");
const router = express.Router();

router.get("/products", (req, resp) => {
  conn.query("select * from product", (err, data) => {
    if (err) {
      resp.status(500).send(JSON.stringify("data not found" + err));
      console.log(JSON.stringify(err));
    } else {
      resp.send(data);
    }
  });
});

router.get("/products/product/:pid", (req, resp) => {
  conn.query(
    "select * from product where pid=?",
    [req.params.pid],
    (err, data) => {
      if (err) {
        resp.status(500).send(JSON.stringify("data not found" + err));
        console.log(JSON.stringify(err));
      } else {
        resp.send(data[0]);
      }
    }
  );
});

router.post("/products/product/:pid", (req, resp) => {
  conn.query(
    "insert into product values(?,?,?)",
    [req.body.pid, req.body.pname, req.body.price],
    (err, data) => {
      if (err) {
        resp.status(500).send(JSON.stringify("data not found" + err));
        console.log(JSON.stringify(err));
      } else {
        resp.send({ msg: "product added succesfully" });
      }
    }
  );
});

router.put("/products/product/:pid", (req, resp) => {
  conn.query("update product set pname=?,price=? where pid=?", [
    req.body.pname,
    req.body.price,
    req.body.pid,
  ],(err,data)=>{

    if(err){
        resp.status(500).send(JSON.stringify("data not found" + err));
    }
    else{
        resp.send({ msg: "product updated succesfully" });
    }
  });
});

router.delete("/products/product/:pid",(req,resp)=>{
    conn.query("delete from product where pid=?",[parseInt(req.params.pid)],(err,data)=>{
        if(err){
          console.log("in delete express");
            resp.status(500).send(JSON.stringify("data not found" + err));
        }
        else{

            resp.send({ msg: "product deleted succesfully" });
        }



    })
})
module.exports=router;