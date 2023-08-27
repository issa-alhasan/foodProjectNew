
import cors from "cors";
import express, { Request, Response } from 'express';
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
app.post("/api/users/login", (req: Request, res: Response) => {
   // const body = req.body;
   const {email,password}=req.body;
    const user=sample_users.find(user=>user.email===email && user.password===password);
    if(user){
       res.send(generateTokenResponse(user))
    }else{
        res.status(400).send("User name or Password is not valid!");
    }
});

const generateTokenResponse=(user:any)=>{
     const token =jwt.sign({
        email:user.email,
        isAdmin:user.isAdmin
     },"SomeRandomText",{
        expiresIn:"30d"
     })
     user.token=token;
     return user
}

app.get("/api/foods", (req: Request, res: Response) => {
    res.send(sample_foods);
})
app.get("/api/tag", (req: Request, res: Response) => {
    res.send(sample_tags);
})
app.get("/api/foods/tag/:tag", (req: Request, res: Response) => {
    const tag=req.params.tag;
    if(tag=="All"){
        res.send(sample_foods);
    }
    else{
        const food= sample_foods.filter(food => food.tags?.includes(tag));
        res.send(food);
    }
 })
app.get("/api/foods/search/:searchTerm", (req: Request, res: Response) => {
   const searchTerm=req.params.searchTerm;
   const food= sample_foods.filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
   res.send(food);
})
app.get("/api/foods/:foodId", (req: Request, res: Response) => {
    const foodId= req.params.foodId;
    const food= sample_foods.find(food=> food.id==foodId);
    res.send(food);
 })

const port=5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})