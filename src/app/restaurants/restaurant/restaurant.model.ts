/**
 * Não necessáriamente precisamos criar uma classe model Restaurant, precisamos criar
 * apenas uma representação de dados
 * 
 * Então criamos apenas um tipo que representa um restaurant, exatamente com as 
 * propriedades que vão refletir as propriedades do backend
 */

export interface Restaurant {
    id: string
    name: string
    category: string
    deliveryEstimate: string
    rating: number
    imagePath: string
}