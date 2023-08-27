
import cors from "cors";
import express, { Request, Response } from 'express';
import { sample_foods } from "./data";

const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/foods", (req: Request, res: Response) => {
    res.send(sample_foods);
})
const port=5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})