const { pool } = require('../config');
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body;
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        if (results.rowCount == 0) {
            return {
                status: 401,
                msg: "Não foi encontrado um Usuário com o e-mail informado"
            };
        }

        const usuario = results.rows[0];
        if (usuario.senha != senha) {
            return {
                status: 401,
                msg: "Senha incorreta"
            };
        }
        
        return {
            status: 200,
            msg: "Login bem-sucedido",
            user: new Usuario(
                usuario.codigo,
                usuario.email,
                "."
            )
        };
    } catch (err) {
        throw err;
    }
}

module.exports = { autenticaUsuarioDB };