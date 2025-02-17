const { pool } = require('../config');
const Tarefa = require('../entities/tarefa');

const listTarefasBD = async (usuarioId) => {
    try {
        if (usuarioId) {
            const { rows } = await pool.query(`SELECT * FROM TAREFAS where USUARIO_ID = ${usuarioId} ORDER BY codigo`);
            const tarList =  rows.map((tarefa) => 
                new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dt_criacao, tarefa.dt_finalizacao)
            );
            return {
                status: 200, 
                msg: 'Tarefas encontradas com sucesso',
                list: tarList 
            }
        } 
        return {
            status: 400, 
            msg: 'Usuário não informado!'
        }
    } catch (err) {
        throw err;
    }
}

const getTarefaPorCodigoBD = async (tarefaId) => {
    try {
        if (tarefaId) {
            const { rows } = await pool.query(`SELECT * FROM TAREFAS where CODIGO = ${tarefaId} LIMIT 1`);
            if (rows == 0) {
                return {
                    status: 404, 
                    msg: `Nenhuma Tarefa encontrada com o código ${tarefaId}`,
                }
            }
            const tarefa = rows[0];
            return {
                status: 200, 
                msg: 'Tarefa encontrada com sucesso',
                tarefa: new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dt_criacao, tarefa.dt_finalizacao, tarefa.usuario_id) 
            }
        } 
        return {
            status: 400, 
            msg: 'Código da Tarefa não informado!'
        }
    } catch (err) {
        throw err;
    }
}

const addTarefaBD = async (body, usuarioId) => {
    try {
        const { titulo, descricao } = body;
        const results = await pool.query(
            `INSERT INTO 
            tarefas (titulo, descricao, dt_criacao, usuario_id) 
            VALUES ('${titulo}', '${descricao}', ${new Date().getTime()}, ${usuarioId}) 
            returning codigo, titulo, descricao, status, dt_criacao, usuario_id`
        );

        const tarefa = results.rows[0];
        
        return {
            status: 200, 
            msg: 'Tarefa criada com sucesso',
            tarefa: new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dt_criacao, tarefa.dt_finalizacao, tarefa.usuario_id) 
        }
    } catch (err) {
        throw err;
    }
}

const updateTarefaBD = async (body) => {
    try {
        const { codigo, descricao, titulo, status } = body;
        const results = await pool.query(`
            UPDATE tarefas set descricao = '${descricao}', titulo = '${titulo}' , status = ${status}
            ${status == 2 ? ', DT_FINALIZACAO = ' + new Date().getTime() : ''}
            where codigo = ${codigo} 
            returning codigo, titulo, descricao, status, dt_criacao, usuario_id, dt_finalizacao`
        );
        if (results.rowCount == 0) {
            return {
                status: 404, 
                msg: `Nenhuma Tarefa encontrada com o código ${codigo} para ser alterada`,
            }
        }
        const tarefa = results.rows[0];
        return {
            status: 200, 
            msg: 'Tarefa atualizada com sucesso',
            tarefa: new Tarefa(tarefa.codigo, tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.dt_criacao, tarefa.dt_finalizacao, tarefa.usuario_id) 
        }
    } catch (err) {
        throw err;
    }
}

const deleteTarefaBD = async (tarefaId) => {
    try {
        if (tarefaId) {
            const results = await pool.query(`DELETE FROM TAREFAS where codigo = ${tarefaId}`);
            if (results.rowCount == 0) {
                return {
                    status: 404, 
                    msg: `Nenhuma Tarefa encontrada com o código ${codigo} para ser removida`,
                }
            } else {
                return {
                    status: 200, 
                    msg: 'Tarefa removida com sucesso'
                }
            }
        } 
        return {
            status: 400, 
            msg: 'Código da Tarefa não informado!'
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    listTarefasBD, addTarefaBD, updateTarefaBD, deleteTarefaBD, getTarefaPorCodigoBD
}