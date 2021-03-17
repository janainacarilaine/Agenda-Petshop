const Atendimento = require('../models/atendimento');
module.exports = app => {

    app.get('/atendimentos', (req, resp) =>{
        resp.send(`GET -> rota de atendimentos`);
    });

    app.post('/atendimentos', (req, resp) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, resp);
    });

}
    