const buildEnv = () => {
    cy.intercept('POST', '/signin', {
        id: 1000,
        nome: "Usuário falso",
        token: "string grande aceita"
    }).as('signin')

    cy.intercept('GET', '/saldo', [{
        conta_id: 333,
        conta: "Conta para movimentacoes TESTE MOCK",
        saldo: "3332.00"
    },
    {
        conta_id: 222,
        conta: "Conta Banco TESTE MOCK",
        saldo: "99999999.00"
    }]
    ).as('saldo')

    cy.intercept('GET', '/extrato/**',
        [
        {"conta":"Conta para movimentacoes","id":836562,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":900218,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":836563,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":900219,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo 1","id":836564,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":900220,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo 1","id":836565,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":900220,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo 1","id":836566,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":900220,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para extrato","id":836567,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":900221,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para extrato","id":876327,"descricao":"asdsasadsdasdas","envolvido":"asddasadsassd","observacao":null,"tipo":"REC","data_transacao":"2021-11-22T03:00:00.000Z","data_pagamento":"2021-11-22T03:00:00.000Z","valor":"3333333.00","status":true,"conta_id":900221,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para alterar","id":876328,"descricao":"dasdas3333","envolvido":"dasdasd","observacao":null,"tipo":"REC","data_transacao":"2021-11-22T03:00:00.000Z","data_pagamento":"2021-11-22T03:00:00.000Z","valor":"3431432.00","status":true,"conta_id":900216,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":876329,"descricao":"221221","envolvido":"dsaddas","observacao":null,"tipo":"REC","data_transacao":"2021-11-22T03:00:00.000Z","data_pagamento":"2021-11-22T03:00:00.000Z","valor":"431431.00","status":true,"conta_id":900219,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null}
        ]
    )
}

export default buildEnv;

