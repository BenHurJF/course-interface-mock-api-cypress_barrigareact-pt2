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


    cy.intercept('GET', '/contas', [
        { id: 942073, nome: "Carteira Teste", visivel: true, usuario_id: 25541 },
        { id: 942074, nome: "Banco conta Real", visivel: true, usuario_id: 25541 }
    ]
    ).as('contas')
}

export default buildEnv;