require('dotenv').config();
import { app } from './src/app';

const port = process.env.PORT;

app.use('/', require('./src/routes/productRoute'));
app.use('/', require('./src/routes/userRoute'));

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
})