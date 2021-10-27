const locators = {
    LOGIN: {
        user: 'div[class="input-group"] input',
        pass: 'div[class="form-group"] input[type="password"]',
        btnLogin: 'button[type="submit"]',
        MSG: '.toast-message'
    },
    MENU: {
         HOME: '[data-test=menu-home]'
    },
    ALTERAR: {
        FN_XP_ALTERCONTA: name => `//table//td[contains(.,'${name}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary',
    },
    EXTRATO: {
        FN_XP_ASSERT_DESC: DESC => `//li//span[contains(.,'${DESC}')]`,
        FN_XP_ASSERT_VALUE: value => `//li//span[contains(.,'Descrição para TESTE E2E')]/following-sibling::small[contains(.,'${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(.,'${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: alterar => `//span[contains(.,'${alterar}')]/../../..//i[@class='fas fa-edit']`
    },
    SALDO: {
        HOME: '[data-test=menu-home]',
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]`
    }

}

export default  locators;