const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "TODO For You",
        description: "Lista de afazeres"
    },
    servers: [
        {
            url: 'http://localhost:3003'
        }
    ],
    components: {
        schemas: {
            //Seguranca
            loginParams: {
                $email: "joaodsilva@gmail.com", 
                $senha: "SenhaSegura123"
            },
            loginReturnSuccess: { 
                auth: true, 
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImNvZGlnbyI6MSwiZW1haWwiOiJqb2FvZHNpbHZhQGdtYWlsLmNvbSIsIm5vbWUiOiJKb8OjbyBkYSBTaWx2YSIsInNlbmhhIjoiLiJ9LCJpYXQiOjE3Mzk3NDM1NTAsImV4cCI6MTczOTc0NzE1MH0.SghXFJYC7d4_hCH4d9GOkSYVrkg6Kbntos4EY3xWGjE", 
                msg: "Login bem-sucedido"
            },
            //Usuário
            usuarioCadastro: {
                $nome: "João da Silva", 
                $email: "joaodsilva@gmail.com", 
                $senha: "SenhaSegura123"
            },
            usuarioAtualizacao: {
                $codigo: "João da Silva", 
                nome: "João da Silva", 
                email: "joaodsilva@gmail.com", 
                $senha: "SenhaSegura123", 
                novaSenha: "SenhaSegura456"
            },
            usuarioResponseSuccess: { 
                status: 200,
                msg: "Usuário cadastrado", 
                usuario: {
                    codigo: 1, 
                    nome: "João da Silva", 
                    email: "joaodsilva@gmail.com"
                }
            },
            //Tarefas
            tarefaCadastro: {
                $titulo: "Comprar pão", 
                $descricao: "Preciso comprar pão para amanhã"
            },
            tarefaAtualizacao: {
                $codigo: 22, 
                $titulo: "Comprar pão", 
                $descricao: "Preciso comprar pão para amanhã",
                $status: 1
            },
            tarefaResponseSuccess: {
                status: 200, 
                msg: 'Tarefa atualizada com sucesso',
                tarefa: {
                    codigo: 5,
                    titulo: 'Limpar casa',
                    descricao: '',
                    status: 2,
                    dt_criacao: 1739733200, 
                    dt_finalizacao: 1739819517,
                    usuario_id: 1
                }
            },
            tarefaListResponseSuccess: {
                status: 200, 
                msg: 'Tarefas encontradas com sucesso',
                list: [
                    {
                        codigo: 1,
                        titulo: 'Buscar encomenda',
                        descricao: 'A encomenda já chegou, mas preciso buscá-la',
                        status: 0,
                        dt_criacao: 1739733119, 
                        dt_finalizacao: null
                    },
                    {
                        codigo: 5,
                        titulo: 'Limpar casa',
                        descricao: '',
                        status: 2,
                        dt_criacao: 1739733200, 
                        dt_finalizacao: 1739819517
                    },
                    {
                        codigo: 22,
                        titulo: "Comprar pão", 
                        descricao: "Preciso comprar pão para amanhã",
                        status: 1,
                        dt_criacao: 1739733800, 
                        dt_finalizacao: null
                    },
                ] 
            },
            //Retorno genérico
            statusMsgReturnSuccess: {
                status: 200, 
                msg: 'Mensagem de Retorno'
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "<JWT token here>"
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/rotas.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index');
});