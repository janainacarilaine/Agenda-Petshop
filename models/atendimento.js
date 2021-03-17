const conexao = require('../infra/conexao');
class Atendimento{
    adiciona(atendimento){
        const sql = `INSERT INTO atendimentos set ?`;
        
        conexao.query(sql, atendimento, (erro, resultados) => {
            if (erro) 
                console.log(erro);
            else{
                console.log(resultados);
            }    
        });
    }
}

module.exports = new Atendimento;