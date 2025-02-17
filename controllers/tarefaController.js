const {listTarefasBD, addTarefaBD, updateTarefaBD, deleteTarefaBD, getTarefaPorCodigoBD} = require('../usecases/tarefaUseCases');

const getTarefasByUsuario = async (request, response) => {
    await listTarefasBD(request.usuario.codigo)
        .then(data => defaultCallbackTarefa(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao buscar Tarefas"});
        });
}

const addTarefa = async (request, response) => {
    await addTarefaBD(request.body, request.usuario.codigo)
        .then(data => defaultCallbackTarefa(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao criar Tarefa"});
        });
}

const updateTarefa = async (request, response) => {
    await updateTarefaBD(request.body)
        .then(data => defaultCallbackTarefa(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao atualizar Tarefa"});
        });
}

const getTarefaPorCodigo = async (request, response) => {
    await getTarefaPorCodigoBD(request.params.codigo)
        .then(data => defaultCallbackTarefa(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao buscar Tarefa"});
        });
}

const deleteTarefa = async (request, response) => {
    await deleteTarefaBD(request.params.codigo)
        .then(data => defaultCallbackTarefa(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao deletar Tarefa"});
        });
}

//Função genérica para retornar apenas uma tarefa
const defaultCallbackTarefa = (data, response) => {
    response.status(data.status)
            .json(data);
}

module.exports = {
    getTarefasByUsuario, addTarefa, updateTarefa, deleteTarefa, getTarefaPorCodigo
}