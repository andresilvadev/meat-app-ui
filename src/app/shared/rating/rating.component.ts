import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "mt-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
  /**
   * Criamos um array de números que vamos ter para as estrelas
   */
  rates: number[] = [1, 2, 3, 4, 5];

  /**
   * Valor do componente que vamos chamar de rate que vai iniciar o valor com zero
   */
  rate: number = 0;

  /**
   * Propriedade que faz o preview ao passar o mouse nas estrelas.
   * Quando eu entrar com o mouse eu vou setar o rate, mas eu vou guardar o valor
   * original do componente para e poder ir mechendo na hora que eu passar o mouse
   * quando eu tirar o mouse se eu não tiver setado eu pego o previousRate e seto o
   * rate novamente
   */
  previousRate: number;

  /**
   * Evento rated para quem tiver usando o componente possa saber que a gente clicou e
   * selecionou um determinado valor
   * Onde vamos enviar um valor number toda vez que eu emitir o evento
   */
  @Output() rated = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  setRate(r: number) {
    this.rate = r;
    this.previousRate = undefined;

    // Emite o evento toda vez que eu setar o valor
    this.emmitRated(r);
  }

  setTemporaryRate(r: number) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate;
    }
    this.rate = r;
  }

  clearTemporaryRate() {
    if (this.previousRate != undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

  emmitRated(r: number) {
    this.rated.emit(r);
  }
}
