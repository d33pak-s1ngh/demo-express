const express =  require('express');
const path = require('path');

const {products} = require('./data');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/',(req,res) => {
    const newProducts = products.map((product) => {
        const {id, name}  = product;
        return {id, name};
    })
    res.json(newProducts);
    // res.sendFile(path.resolve(__dirname,'./express.html'));
    // res.status(200).send('<h1>Home page</h1>');
});

app.get('/about/:id',(req,res) => {
    res.status(200).send(`<h1>About page</h1> ${req}`);
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>No resource found</h1>');
});

app.listen(port, () => {
console.log('server listening at',port);
});