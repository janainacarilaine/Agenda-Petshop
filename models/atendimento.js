const moment = require('moment');
const conexao = require('../infra/conexao');
class Atendimento{
    adiciona(atendimento, resp){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome : 'data',
                valido : dataEhValida,
                mensagem : "Data deve ser a mesma ou depois da data atual!"     
            },

            {
                nome : 'cliente',
                valido : clienteEhValido,
                mensagem : "Cliente deve ter pelo menos 5 caracteres!"     
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros){
            resp.status(400).json(erros);

        } else {
            
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = `INSERT INTO atendimentos set ?`;

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro){
                    resp.status(400).json(erro);
                } else {
                    resp.status(201).json(resultados);
                }
            });

        }
        
    }
}

module.exports = new Atendimento;