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
                    resp.status(201).json({atendimento});
                }
            });

        }
        
    }

    lista(resp){
        const sql = `SELECT * FROM atendimentos`;

        conexao.query(sql, (erro, resultados) => {
            if (erro){
                resp.status(400).json(erro);
            } else {
                resp.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, resp){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            if (erro){
                resp.status(400).json(erro);
            } else {
                resp.status(200).json(resultados[0]);
            }
        });

    }

    altera(id, valores, resp){
        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = `UPDATE atendimentos SET ? WHERE id = ?`

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro){
                resp.status(500).json(erro);
            } else {
                resp.status(200).json({id, valores});
            }
        });
    }

    remove(id, resp){
        const sql = `DELETE FROM atendimentos WHERE id=?`;

        conexao.query(sql, id, (erro, resultado) => {
            if (erro){
                resp.status(500).json(erro);
            } else {
                resp.status(200).json({'status' : 'removido', 'id' : id});
            }
        });
    }


}

module.exports = new Atendimento;