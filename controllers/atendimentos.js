module.exports = app => {

    app.get('/atendimentos', (req, resp) =>{
        resp.send(`GET -> rota de atendimentos`);
    });

    app.post('/atendimentos', (req, resp) =>{
        console.log(req.body);
        resp.send('POST -> para atendimentos!');
    });

}
    