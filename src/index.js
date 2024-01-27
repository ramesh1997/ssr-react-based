import 'babel-polyfill';
import express from "express";
import renderer from "./helpers/renderer";
const app = express();
import createStore from "./helpers/createStore";
app.use(express.static('public'));
app.get("*",(req,res) => {
    const store = createStore();

    // some logic to initialie
    //and load sata into the store
res.send(renderer(req,store))
})
app.listen(3005,() =>{
    console.log("listing on port 3005")
});