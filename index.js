const mongoose = require('mongoose')
const userModel = require("./schemas/user")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


//connect to database using an env file
mongoose.connect(
    process.env.CONNECTION_STRING,
    {},
    () => console.log("Connected to DB")
);

//first requirment

// const user1 = new userModel({
//     name:"yasmin",
//     age:21,
//     favoriteFoods: ["ma7shy", "soup", "pizza","burger","noodles","fera5 mashwya"]
// })
// user1.save((err,data)=>{
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// })
// userModel.create([
//     {name:"Nada",
//     age:22,
//     favoriteFoods: ["burger","noodles"]},
//     {name:"Saif",
//         age:18,
//         favoriteFoods: ["pizza","burger","fera5 mashwya"]},
//     {name:"Haitham",
//         age:32,
//         favoriteFoods: ["ma7shy", "soup","noodles","fera5 mashwya"]}]).then((data)=>{console.log(data)}).catch((err)=>{console.error(err)})
const cb = (err,res)=>{
    if (err) {
    console.error(err);
    } else {
    console.log(res);
}}
//3 find
userModel.find({name:"Nada"}).exec(cb)
//4 find one
userModel.findOne({age:18}).exec(cb)
//5 find by id
userModel.findById("623daf7892db6bc969dde201").exec(cb)
//6 update
userModel.findById("623daf7892db6bc969dde201")
    .then((data)=>{
        // console.log("here")
        // console.log(data)
        const favoriteFoods = data.favoriteFoods
        // console.log(favoriteFoods)
        if(!favoriteFoods.includes("Hamburger")){
            
            favoriteFoods.push("Hamburger")
            userModel.findByIdAndUpdate(
                "623daf7892db6bc969dde201",
                {favoriteFoods},
                {new: true, useFindAndModify: false}
            )
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    })
    .catch((err)=>{
        console.error(err)
    })
// 7 findOneAndUpdate
userModel.findOneAndUpdate(
    {name:"Nada"},
    {age: 25}
).exec(cb)

//8 findByIdAndRemove
userModel.findByIdAndRemove("623daf7892db6bc969dde202").exec(cb)
//9 deleteMany
userModel.deleteMany({age: { $gte: 20 }}).exec(cb)
//chain
userModel.find({favoriteFoods:"burger"})
    .sort({name: asc})
    .limit(2)
    .select("age favoriteFoods")
    .exec(cb)
