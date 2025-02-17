class Tarefa {
    constructor(codigo, titulo, descricao, status, dt_criacao, dt_finalizacao, usuario_id) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status; // 0 - Nova, 1 - Fazendo, 2 - Feita
        this.dt_criacao = dt_criacao;
        this.dt_finalizacao = dt_finalizacao;
        this.usuario_id = usuario_id;
    }
}

module.exports = Tarefa;