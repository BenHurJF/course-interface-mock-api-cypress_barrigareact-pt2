const locators = {
    LOGIN: {
        user: 'div[class="input-group"] input',
        pass: 'div[class="form-group"] input[type="password"]',
        btnLogin: '.btn',
        MSG: '.toast-message'
    },
    MENU: {
         HOME: '[data-test=menu-home]',
         EXTRATO: '[data-test=menu-extrato]'
    },
    ALTERAR: {
        FN_XP_ALTERCONTA: name => `//table//td[contains(.,'${name}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '#envolvido',
        CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary',
    },
    EXTRATO: {
        FN_XP_ASSERT_DESC: DESC => `//li//span[contains(.,'${DESC}')]`,
        FN_XP_ASSERT_VALUE: value => `//li//span[contains(.,'Testes beiu Extratooo 123')]/following-sibling::small[contains(.,'${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(.,'${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: alterar => `//span[contains(.,'${alterar}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`
    },
    SALDO: {
        HOME: '[data-test=menu-home]',
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]`
    }

}

export default  locators;