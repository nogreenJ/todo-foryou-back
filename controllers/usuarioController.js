const {addUsuarioBD, getUsuarioPorCodigoBD, updateUsuarioBD} = require('../usecases/usuarioUseCases');

const addUsuario = async (request, response) => {
    await addUsuarioBD(request.body)
        .then(data => defaultCallbackUsuario(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao cadastrar Usuário"});
        });
}

const updateUsuario = async (request, response) => {
    await updateUsuarioBD(request.body)
        .then(data => defaultCallbackUsuario(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao atualizar Usuário"});
        });
}

const getUsuarioPorCodigo = async (request, response) => {
    await getUsuarioPorCodigoBD(parseInt(request.params.codigo))
        .then(data => defaultCallbackUsuario(data, response))
        .catch(err => {
            console.log(err);
            response.status(500).json({msg: "Erro ao buscar Usuário"});
        });
}

const defaultCallbackUsuario = (data, response) =>{
    response.status(data.status)
            .json(data);
}

module.exports = {
    addUsuario, updateUsuario, getUsuarioPorCodigo
}