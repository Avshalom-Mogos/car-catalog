import express, { Application, Request, Response } from 'express';
import cars  from './data/cars.json'
//@types/node UNINSTALL if there is no use


const app: Application = express();
const port: string | number = process.env.PORT || 5000;


app.get('/cars', (req: Request, res: Response) => {
    res.send(cars);
});

app.listen(port, () => console.log(`server is up on port:${port}`));