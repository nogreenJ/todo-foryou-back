const { Router } = require('express');

const { updateUsuario, getUsuarioPorCodigo } = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .put(
        /*
            #swagger.tags = ['Usuários']
            #swagger.summary = 'Atualizar Usuário'
            #swagger.description = 'Atualiza dados do usuário da sessão'
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
                description: "Usuário atualizado",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/usuarioResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]  
        */
       verificaJWT, updateUsuario
    );

rotasUsuarios.route('/usuario/:codigo')
    .get(
        /*
            #swagger.tags = ['Usuários']
            #swagger.summary = 'Buscar Usuário'
            #swagger.description = 'Busca dados do usuário pelo seu código'
            #swagger.parameters = {
                required: true,
                in: "path",
                name: 'codigo',
                description: 'Código do usuário'
            } 
            #swagger.responses[200] = {
                description: "Usuário encontrado",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/usuarioResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]  
        */
       verificaJWT, getUsuarioPorCodigo
    )

module.exports = { rotasUsuarios };