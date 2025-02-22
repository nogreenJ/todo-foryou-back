const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const addUsuarioBD = async (body) => {
    try {
        const { email, senha } = body;
        if (!email || !senha) {
            let errMsg = `${!email ? (errMsg ? ', ' : '') + "E-mail": ''}`;
            errMsg += `${!senha ? (errMsg ? ', ' : '') + "Senha": ''}`;
            return { msg: "ERRO: Alguns dados estão faltando: " + errMsg, status: 400 };
        }
        const notvalid = await getUsuarioPorEmailBD(email);
        if(notvalid.usuario){
            return { 
                status: 409, 
                msg: "Email já cadastrado no sistema." 
            };
        }
        const results = await pool.query(`INSERT INTO usuarios (email, senha) 
            VALUES ('${email}', '${senha}') returning codigo, email`);
        const usuario = results.rows[0];
        return { 
            status: 200,
            msg: "Usuário cadastrado", 
            usuario: new Usuario(usuario.codigo, usuario.email)
        };
    } catch (err) {
        console.log("ERRO:", err);
        throw "Erro ao inserir o usuario: " + err;
    }
}

const getUsuarioPorEmailBD = async (email) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios where email = '${email}'`);
        if (results.rowCount == 0) {
            return {
                status: 404, 
                msg: "Nenhum Usuário encontrado com o email: " + email,
            }
        } else {
            const usuario = results.rows[0];
            return {
                status: 200, 
                msg: "Usuário encontrado com sucesso",
                usuario: new Usuario(usuario.codigo, usuario.email)
            }
        }
    } catch (err) {
        console.log("ERRO:", err);
        throw "Erro ao consultar o usuario: " + err;
    }
}

const getUsuarioPorCodigoBD = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios where codigo = ${codigo}`);
        if (results.rowCount == 0) {
            return {
                status: 404, 
                msg: "Nenhum Usuário encontrado com o código: " + codigo,
            }
        } else {
            const usuario = results.rows[0];
            return {
                status: 200, 
                msg: "Usuário encontrado com sucesso",
                usuario: new Usuario(usuario.codigo, usuario.email)
            }
        }
    } catch (err) {
        console.log("ERRO: ", err);
        throw "Erro ao recuperar o usuario: " + err;
    }
}

const updateUsuarioBD = async (body) => {
    try {
        const { codigo, email, senha, novaSenha } = body;
        if(!codigo){
            return {
                status: 400, 
                msg: "Código não informado"
            }
        }
        if(!senha){
            return {
                status: 400, 
                msg: "Senha não informada"
            }
        }
        let updateFields = null;
        if(novaSenha){
            if(updateFields) {
                updateFields += ", ";
            } else {
                updateFields = "";
            }
            updateFields += `senha = '${novaSenha}'`
        }
        if(email){
            if(updateFields) {
                updateFields += ", ";
            } else {
                updateFields = "";
            }
            updateFields += `email = '${email}'`
        }
        if(!updateFields){
            const retVal = await getUsuarioPorCodigoBD(codigo);
            retVal.msg = "Usuário atualizado com sucesso";
            return retVal;
        }
        const query = `UPDATE usuarios set ` + updateFields + ` where codigo = ${codigo} and senha = '${senha}' returning codigo, email`;
        const results = await pool.query(query);
        if (results.rowCount == 0) {
            return {
                status: 401, 
                msg: "A senha informada está incorreta"
            }
        }
        const usuario = results.rows[0];
        return {
            status: 200, 
            msg: "Usuário atualizado com sucesso",
            usuario: new Usuario(usuario.codigo, usuario.email)
        }
    } catch (err) {
        console.log("ERRO:", err);
        throw "Erro ao alterar a usuario: " + err;
    }
}

module.exports = {
    addUsuarioBD, getUsuarioPorEmailBD, getUsuarioPorCodigoBD, updateUsuarioBD
}