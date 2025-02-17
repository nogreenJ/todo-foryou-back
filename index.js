const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());

app.use(rotas);

app.listen(process.env.PORT || 3002, () => {
    const porta = process.env.PORT ? process.env.PORT : 3002;
    console.log('Servidor da API rodando na porta ' + porta);
})