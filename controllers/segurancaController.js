const { autenticaUsuarioDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(retVal => {
            if(retVal.status == 200){
                const usuario = retVal.user;
                const token = jwt.sign(
                    {usuario}, 
                    process.env.SECRET, 
                    {expiresIn: 3600} // 1 hora
                );
                console.log(`Usuário ${usuario.codigo} efetuou login`);
                response.json({ auth: true, token: token, msg: retVal.msg});
            } else {
                response.status(retVal.status).json({msg: retVal.msg});
            }
        })
        .catch(err => {
            console.log(err)
            response.status(500).json({msg: "Erro ao buscar dados"});
        });
}

function verificaJWT(request, response, next) {
    let token = request.headers['authorization'];
    if (!token){
        return response.status(401).json({msg: "Autenticação inválida"});
    }
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            if(err.message = "jwt expired"){
                response.status(440).json({
                    auth: false,
                    msg: "Tempo de sessão expirado, realize o login novamente"
                });
            } else {
                console.log(err);
                response.status(500).json({
                    auth: false,
                    msg: "Erro ao autenticar o token"
                });
            }
        } else {
            request.usuario = decoded.usuario;
            next();
        }
    });
}

module.exports = {
    login, verificaJWT
}