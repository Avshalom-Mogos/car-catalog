import express, { Application, Request, Response } from 'express';
//@types/node UNINSTALL if there is no use

const app: Application = express();
const port: String | Number = process.env.PORT || 5000;

const cars: Object[] = [
    { type: 'BMW', year: 1992, price: 500000, imgUrl: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg' },
    { type: 'BMW', year: 2005, price: 200000, imgUrl: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg' },
    { type: 'BMW', year: 1990, price: 150000, imgUrl: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_960_720.jpg' }
];

app.get('/cars', (req: Request, res: Response) => {
    res.send(cars);
});


app.listen(port, () => console.log(`server is up on port:${port}`));