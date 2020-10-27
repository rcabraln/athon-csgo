const conexao = require('./src/config/conexao');
conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        const app = require('./src/config/custom-express');
        app.listen(3000, function() {
            console.log('Servidor rodando na porta 3000')
        });
    }
})


