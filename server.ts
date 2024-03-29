require('dotenv').config();
import { app } from './src/app';

const port = process.env.PORT;

app.use('/api', require('./src/routes/productRoute'));
app.use('/api', require('./src/routes/userRoute'));
app.use('/api', require('./src/routes/authRoute'));

if(process.env.NODE_ENV !== 'test'){
    app.listen(port, () => {
        console.log(`Server Running on port ${port}`);
    })
}