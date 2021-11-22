/// <reference types="Cypress" />
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
        ]).as('contasCreate')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
        cy.get('input[data-test="nome"]').type('Exemple add Account testes 1')
        cy.get('.btn').click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Conta inserida com sucesso')
    })

    it('2 - Alterando a conta', () => {
        cy.intercept('PUT', '/contas/942073',
            { id:942073, nome:"Conta para saldo 222222", visivel:true, usuario_id:25541 }
        ).as('putContas')

        cy.intercept('GET', '/contas', [
            { id: 942073, nome: "Conta para saldo 222222", visivel: true, usuario_id: 25541 },
            { id: 942074, nome: "Banco conta Real", visivel: true, usuario_id: 25541 },
            { id: 942076, nome: "Exemple add Account testes 1", visivel: true, usuario_id: 25541 }
        ]
        ).as('contasExibirAposPUT')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
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
        ]).as('CONTAS1')

        cy.get(`a[class='nav-link dropdown-toggle']`).click()
        cy.get('[href="/contas"]').click()
        cy.get('input[data-test="nome"]').type('Exemple add Account testes 1')
        cy.get('.btn').click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Erro: Error: Request failed with status code 400')
    })

    it('4 - Inserir movimentação/Transação', () => {
        cy.get('[data-test=menu-movimentacao]').click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição para TESTE E2E')
        cy.get(loc.MOVIMENTACAO.VALOR).type(333.99)
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Ben-Hur Jeffer')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get('[data-test=status]').click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Movimentação inserida com sucesso!')
        cy.xpath(loc.EXTRATO.FN_XP_ASSERT_DESC('Descrição para TESTE E2E'), { timeout: 22000 }).should('exist')
        cy.xpath(loc.EXTRATO.FN_XP_ASSERT_VALUE('333,99'), { timeout: 22000 }).should('exist')
        cy.xpath('//li//div[@class="col col-md-1"]//i[@class="far fa-trash-alt"]')
    })

    it('5 - Consultar Saldo', () => {
        cy.get(loc.SALDO.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get('[data-test=menu-extrato]').click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get('[data-test=status]', { timeout: 10000 }).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get('.toast-message', { timeout: 22000 }).should('contain', 'Movimentação alterada com sucesso!')

        cy.get(loc.SALDO.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('6 - Remover Movimentação', () => {
        cy.get('[data-test=menu-extrato]').click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Descrição para TESTE E2E')).click()
        cy.get('.toast-message').should('contain', 'Movimentação removida com sucesso!')
    })
})