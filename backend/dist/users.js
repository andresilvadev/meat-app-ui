"use strict";
exports.__esModule = true;
exports.users = exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
/**
 * Tipando a constante users da forma correta
 * É sempre importante a gente estar tipando constante ou variável ou
 * argumento de método ou retorno para que o typecript possa detectar o máximo de
 * erros possíveis.
 *
 * Assinatura do tipo chave e valor
 * Sintaxe especial onde objeto do tipo string e a chave que é do tipo user
 */
exports.users = {
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21')
};
