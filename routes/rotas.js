const { Router } = require('express');

const { rotasUsuarios } = require('./rotasUsuarios');
const { rotasTarefas } = require('./rotasTarefas');

const { login } = require('../controllers/segurancaController');
const { addUsuario } = require('../controllers/usuarioController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(
    /*
        #swagger.tags = ['Segurança']
        #swagger.summary = 'Login'
        #swagger.description = 'Endpoint utilizado para login e autenticação pelos usuários'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginParams"
                    }  
                }
            }
        } 
        #swagger.responses[200] = {
            description: "Login bem-sucedido",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/loginReturnSuccess"
                    }
                }           
            }
        } 
    */
    login
);

// rota para cadastro do usuário
rotasUsuarios.route('/cadastro').post(
    /*
        #swagger.tags = ['Usuários']
        #swagger.summary = 'Cadastro'
        #swagger.description = 'Endpoint de cadastro de usuários'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/usuarioCadastro"
                    }  
                }
            }
        } 
        #swagger.responses[200] = {
            description: "Usuário cadastrado",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/usuarioResponseSuccess"
                    }
                }           
            }
        }  
    */
    addUsuario
);

rotas.use(rotasUsuarios);
rotas.use(rotasTarefas);

module.exports = rotas;