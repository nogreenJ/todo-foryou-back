const { Router } = require('express');

const { getTarefasByUsuario, addTarefa, updateTarefa, deleteTarefa, getTarefaPorCodigo } = require('../controllers/tarefaController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasTarefas = new Router();

rotasTarefas.route('/tarefa')
    .get(
        /*
            #swagger.tags = ['Tarefas']
            #swagger.summary = 'Listar Tarefas'
            #swagger.description = 'Retorna as tarefas do usuário da sessão.'
            #swagger.responses[200] = {
                description: "Listagem de tarefas do usuário",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/tarefaListResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }] 
        */
       verificaJWT, getTarefasByUsuario
    )
    .put(
        /*
            #swagger.tags = ['Tarefas']
            #swagger.summary = 'Atualizar Tarefa'
            #swagger.description = 'Atualiza os dados de uma tarefa. Quando passado status = 2, tarefa é finalizada com data final igual à data atual.'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/tarefaAtualizacao"
                        }  
                    }
                }
            } 
            #swagger.responses[200] = {
                description: "Tarefa atualizada",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/tarefaResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]
        */
       verificaJWT, updateTarefa
    )
    .post(
        /*
            #swagger.tags = ['Tarefas']
            #swagger.summary = 'Cadastrar Tarefa'
            #swagger.description = 'Cadastra uma tarefa'
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/tarefaCadastro"
                        }  
                    }
                }
            } 
            #swagger.responses[200] = {
                description: "Nova tarefa cadastrada",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/tarefaResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]
        */
       verificaJWT, addTarefa
    );

rotasTarefas.route('/tarefa/:codigo')
    .get(
        /*
            #swagger.tags = ['Tarefas']
            #swagger.summary = 'Buscar Tarefa'
            #swagger.description = 'Busca uma tarefa pelo seu código'
            #swagger.parameters = {
                required: true,
                in: "path",
                name: 'codigo',
                description: 'Código da tarefa'
            }
            #swagger.responses[200] = {
                description: "Tarefa encontrada",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/tarefaResponseSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]
        */
       verificaJWT, getTarefaPorCodigo
    )
    .delete(
        /*
            #swagger.tags = ['Tarefas']
            #swagger.summary = 'Deletar Tarefa'
            #swagger.description = 'Deleta uma tarefa pelo seu código'
            #swagger.parameters = {
                required: true,
                in: "path",
                name: 'codigo',
                description: 'Código da tarefa'
            }  
            #swagger.responses[200] = {
                description: "Tarefa encontrada",
                content: {
                    "application/json": {
                        schema:{
                            $ref: "#/components/schemas/statusMsgReturnSuccess"
                        }
                    }           
                }
            }  
            #swagger.security = [{
                "bearerAuth": []
            }]
        */
       verificaJWT, deleteTarefa
    );

module.exports = { rotasTarefas };