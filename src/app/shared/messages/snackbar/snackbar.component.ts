import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  state,
  style,
  animate,
} from "@angular/animations";
import { NotificationService } from "../notification.service";

import { Observable, timer } from "rxjs";
import {tap, switchMap} from 'rxjs/operators';

@Component({
  selector: "mt-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.css"],
  animations: [
    trigger("snack-visibility", [
      state(
        "hidden",
        style({
          opacity: 0,
          bottom: "0px",
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          bottom: "30px",
        })
      ),
      transition("hidden => visible", animate("500ms 0s ease-in")),
      transition("visible => hidden", animate("500ms 0s ease-out")),
    ]),
  ],
})
export class SnackbarComponent implements OnInit {
  message: string = "Hello there!";
  snackVisibilityState: string = "hidden";

  constructor(private notificationService: NotificationService) {}

  /**
   * Básucanebte foi criado um EventEmiter em uma classe de serviço e a gente tem duas pontas
   * aqueles que usam o serviço para publicar mensagem, e temos o componente snackbar que é
   * aqueles que se inscrevem no notifier ou seja no event emiter do serviço para receber essa mensagem
   * Então usamos um método subscribe para receber a mensagem, mudar a visibilidade do snackbar
   *  e usamos um outro subscribe com um operador de timer, onde ele passa a contar um tempo e ele nofitica a gente
   * que o tempo esgotou então usamos esse momendo para ocultar o snackbar
   */
  ngOnInit() {
    // this.notificationService.notifier.subscribe((message) => {
    //   this.message = message;
    //   this.snackVisibilityState = "visible";
    //   Observable.timer(3000).subscribe((timer) => {
    //     this.snackVisibilityState = "hidden";
    //   });
    // });

    this.notificationService.notifier
    .pipe(tap(message => {
      this.message = message;
      this.snackVisibilityState = "visible";
    }),
      switchMap(message => timer(3000))
    ).subscribe(timer => (this.snackVisibilityState = "hidden"));
  }

  toggleSnack() {
    this.snackVisibilityState =
      this.snackVisibilityState === "hidden" ? "visible" : "hidden";
  }
}
