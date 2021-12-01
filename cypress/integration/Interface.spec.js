/// <reference types="Cypress" />
import { requests } from 'cypress/types/sinon';
import buildEnv from '../support/BUILDeNV.JS';
import loc from '../support/locators';

describe('Cenários de teste', function () {
    beforeEach(() => {
        buildEnv()
        cy.LOGIN('beiujeffer@hotmail.com', 'senha errada')
    })

    after('', () => {
        cy.clearLocalStorage()
    })

    it('1- Inserindo Conta', () => {
        cy.intercept('POST', '/contas', { 
            id:942076, nome:"Exemple add Account testes 1", visivel:true, usuario_id:25541 
        }).as('criouAccount')
        
        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()

        cy.intercept('GET', '/contas', [
            { id:942073, nome:"Carteira Teste", visivel:true, usuario_id:25541 },
            { id:942074, nome:"Banco conta Real", visivel:true, usuario_id:25541 },
            { id:942076, nome:"Exemple add Account testes 1", visivel:true, usuario_id:25541 } 
        ]).as('contasCreate1')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
        cy.get('input[data-test="nome"]').type('Exemple add Account testes 1')
        cy.get('.btn').click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Conta inserida com sucesso')
    })

    it('2 - Alterando a conta', () => {
        cy.intercept('GET', '/contas', [
            { id: 942073, nome: "Conta para saldo 1", visivel: true, usuario_id: 25541 },
            { id: 942074, nome: "Banco conta Real", visivel: true, usuario_id: 25541 },
            { id: 942076, nome: "Exemple add Account testes 1", visivel: true, usuario_id: 25541 }
        ]
        ).as('contas1')

        cy.intercept('PUT', '/contas/942073',
        { id:942073, nome:"Conta para saldo 222222", visivel:true, usuario_id:25541 }
        ).as('putContas')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()

        cy.intercept('GET', '/contas', [
            { id: 942073, nome: "Conta para saldo 222222", visivel: true, usuario_id: 25541 },
            { id: 942074, nome: "Banco conta Real", visivel: true, usuario_id: 25541 },
            { id: 942076, nome: "Exemple add Account testes 1", visivel: true, usuario_id: 25541 }
        ]
        ).as('contasExibirAposPUT')

        cy.xpath(loc.ALTERAR.FN_XP_ALTERCONTA('Conta para saldo 1')).click()
        cy.get('input[data-test="nome"]').clear().type('Conta para saldo 222222')
        cy.get('.btn').click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Conta atualizada com sucesso!')
    })

    it('3 - Tentar criar conta já existente', () => {
        cy.intercept('GET', '/contas', [
            { id:942073, nome:"Carteira Teste", visivel:true, usuario_id:25541 },
            { id:942074, nome:"Banco conta Real", visivel:true, usuario_id:25541 },
            { id:942076, nome:"Exemple add Account testes 1", visivel:true, usuario_id:25541 } 
        ]).as('CONTAS123')

        cy.intercept('POST', '/contas', {
            statusCode: 400,
            Erro: 'Error: Request failed with status code 400'
        })

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
        cy.get('input[data-test="nome"]').type('Exemple add Account testes 1')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Erro: Error: Request failed with status code 400')
    })

    it('4 - Inserir movimentação/Transação', () => {
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
            {"conta":"Conta com movimentacao","id":879999,"descricao":"Testes beiu Extratooo 123","envolvido":"BenHur Jeffer S","observacao":null,"tipo":"REC","data_transacao":"2021-11-22T03:00:00.000Z","data_pagamento":"2021-11-22T03:00:00.000Z","valor":"333.99","status":true,"conta_id":900219,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null}
        ]
    )

        cy.intercept('POST', '/transacoes', 
            {
                id:879999,
                descricao:'Testes beiu Extratooo 123',
                envolvido:'BenHur Jeffer S',
                observacao:null,
                tipo:'REC',
                data_transacao:'2021-11-22T03:00:00.000Z',
                data_pagamento:'2021-11-22T03:00:00.000Z',
                valor:'333.99',
                status:true,
                conta_id:900216,
                usuario_id:25541,
                transferencia_id:null,
                parcelamento_id:null
            }
        )

        cy.get('[data-test=menu-movimentacao]').click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Testes beiu Extratooo 123')
        cy.get(loc.MOVIMENTACAO.VALOR).type(333.99)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('BenHur Jeffer S')
        // cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para alterar')
        cy.get('[data-test=status]').click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Movimentação inserida com sucesso!')

        cy.xpath(loc.EXTRATO.FN_XP_ASSERT_DESC('Testes beiu Extratooo 123'), { timeout: 10000 }).should('exist')
        cy.xpath(loc.EXTRATO.FN_XP_ASSERT_VALUE('333,99'), { timeout: 22000 }).should('exist')
        cy.xpath('//li//div[@class="col col-md-1"]//i[@class="far fa-trash-alt"]')
    })

    // it.only('5 - Consultar Saldo', () => {
    //     cy.get(loc.SALDO.HOME).click()
    //     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para movimentacoes TESTE MOCK')).should('contain', '3.332,00')
        
    //      cy.intercept('GET', '/transacoes/**',
    //       {"conta":"Movimentacao 1, calculo saldo","id":836564,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":900220,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
    //      )

    //      cy.intercept('PUT', '/transacoes/**',
    //        {"conta":"Conta para saldo","id":836564,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-11-01T03:00:00.000Z","data_pagamento":"2021-11-01T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":900220,"usuario_id":25541,"transferencia_id":null,"parcelamento_id":null},
    //       )

    //     cy.get('[data-test=menu-extrato]').click()
    //     cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    //     // cy.wait(2000)
    //     cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    //     cy.get('[data-test=status]', { timeout: 10000 }).click()
    //     cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    //     cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Movimentação alterada com sucesso!')

    //     cy.get(loc.SALDO.HOME).click()
    //     cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    // })

    // // it.skip('6 - Remover Movimentação', () => {
    //     cy.get('[data-test=menu-extrato]').click()
    //     cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Descrição para TESTE E2E')).click()
    //     cy.get('.toast-message').should('contain', 'Movimentação removida com sucesso!')
    // })

    it.only('6- Inserir Conta: VALIDAÇÃO', () => {
        cy.intercept('POST', '/contas', { 
            id:942076, nome:"", visivel:true, usuario_id:25541,
            onRequest: req => {
                console.log(req)
                expect(req.request.body.nome).to.be.not.null
            }
        }).as('criouAccount')
        
        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()

        cy.intercept('GET', '/contas', [
            { id:942073, nome:"Carteira Teste", visivel:true, usuario_id:25541 },
            { id:942074, nome:"Banco conta Real", visivel:true, usuario_id:25541 },
            // { id:942076, nome:"Exemple add Account testes 1", visivel:true, usuario_id:25541 } 
        ]).as('contasCreate1')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
        cy.get('input[data-test="nome"]').type('{CONTROL}')
        cy.get('.btn').click()

        cy.wait('@criouAccount').its('request.body.nome').should('not.be.empty')
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Conta inserida com sucesso')
    })
})