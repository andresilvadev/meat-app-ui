export class User {
  
  constructor(
    public email: string,
    public name: string,
    private password: string){}


  matches(another: User): boolean {
    return another !== undefined && 
    another.email === this.email && 
    another.password === this.password
  }

}

/**
 * Tipando a constante users da forma correta
 * É sempre importante a gente estar tipando constante ou variável ou
 * argumento de método ou retorno para que o typecript possa detectar o máximo de
 * erros possíveis.
 * 
 * Assinatura do tipo chave e valor 
 * Sintaxe especial onde objeto do tipo string e a chave que é do tipo user
 */
export const users: {[key:string]: User} = {
  "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
  "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21')
}