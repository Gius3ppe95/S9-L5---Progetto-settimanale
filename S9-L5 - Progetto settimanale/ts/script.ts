const costoC: number = 0.2;

class Operatore {
  carica: number;
  numeroChiamate: number;
  min: number = 0;
  sec: number = 0;
  myInterval: number;

  constructor(carica: number, numeroChiamate: number, min: number, sec: number, myInterval: number) {
    this.carica = carica;
    this.numeroChiamate = numeroChiamate;
    this.min = min;
    this.sec = sec;
    this.myInterval = myInterval;
  }
}

class User extends Operatore {
  constructor(carica: number, numeroChiamate: number, min: number, sec: number, myInterval: number) {
    super(carica, numeroChiamate, min, sec, myInterval);
  }
  ricarica(x: number): number {
    return (this.carica = x + this.carica);
  }
  chiamata() {
    this.numeroChiamate++;
  }
  azzeraChiamate(): number {
    return (this.numeroChiamate = 0);
  }
}

let arr: User[] = [];
let a = new User(1, 0, 0, 0, 0);
let b = new User(75, 0, 0, 0, 0);
let c = new User(60, 0, 0, 0, 0);

arr.push(a, b, c);
console.log(arr);

document.addEventListener("DOMContentLoaded", () => {
  arr.forEach((ele, i) => {
    let contenitore = <HTMLDivElement>document.querySelector(".contenitore");
    let div = document.createElement("div");
    if (div != null) {
      div.innerHTML = `   <h1>Utente ${i} </h1>
                                <p class="money${i}"></p>
                                <button class="ico1" onclick="iniziaChiamataA(${i})"><i class="bi bi-telephone-outbound-fill"></i></button>
                                <span class="chiama${i}">00:00</span>
                                <button class="ico2" onclick="terminaChiamataA(${i})"><i class="bi bi-telephone-inbound-fill"></i></button>
                                
                                <p>Numero Chiamate Effettuate: <span class="nChiamate${i}"></span></p>
                                <button onclick="azzChiamate(${i})"><i class="bi bi-trash"></i> Numero Chiamate</button>
                                <p><b>Vuoi ricaricare?</b>
                                <p> 
                                    <button onclick="ricaricamiA(${i})">5€</button>
                                    <button onclick="ricaricamiA1(${i})">10€</button>
                                    <button onclick="ricaricamiA2(${i})">20€</button>
                                    <span class="rica${i}"></span>
                                </p>
                                </p>
                        
                            `;
      contenitore.appendChild(div);
    }
  });
});

function stampaSaldo(i: number) {
  let mon = <HTMLParagraphElement>document.querySelector(".money" + i);
  mon.innerHTML = `SALDO: €${arr[i].carica}`;
}

function iniziaChiamataA(i: number) {
  if (arr[i].carica < 0.25) {
    return alert("Credito insufficente per effettuare una chiamata.");
  }
  arr[i].chiamata();
  arr[i].carica = arr[i].carica - costoC;
  arr[i].myInterval = setInterval(setTimer, 1000, i);
  function setTimer(i: number) {
    arr[i].sec++;
    if (arr[i].sec >= 60) {
      arr[i].sec = 0;
      arr[i].carica = arr[i].carica - costoC;
      arr[i].min++;
    }
    let spa = <HTMLSpanElement>document.querySelector(".chiama" + i);
    spa.innerHTML =
      (arr[i].min > 9 ? arr[i].min : "0" + arr[i].min) + ":" + (arr[i].sec > 9 ? arr[i].sec : "0" + arr[i].sec);
    stampaSaldo(i);
  }
  let spa = <HTMLSpanElement>document.querySelector(".nChiamate" + i);
  spa.innerHTML = `${arr[i].numeroChiamate}`;
}
function terminaChiamataA(i: number) {
  clearInterval(arr[i].myInterval);
  arr[i].min = 0;
  arr[i].sec = 0;
  let spa = <HTMLSpanElement>document.querySelector(".chiama" + i);
  spa.innerHTML = `
                    00 : 00
                    `;
  stampaSaldo(i);
}
function azzChiamate(i: number) {
  let spa = <HTMLSpanElement>document.querySelector(".nChiamate" + i);
  spa.innerHTML = `${arr[i].azzeraChiamate()}`;
}
function ricaricamiA(i: number) {
  let spa = <HTMLSpanElement>document.querySelector(".rica" + i);
  spa.innerHTML = ` Saldo aggiornato €${arr[i].ricarica(5)}`;
  stampaSaldo(i);
}
function ricaricamiA1(i: number) {
  let spa = <HTMLSpanElement>document.querySelector(".rica" + i);
  spa.innerHTML = ` Saldo aggiornato €${arr[i].ricarica(10)}`;
  stampaSaldo(i);
}
function ricaricamiA2(i: number) {
  let spa = <HTMLSpanElement>document.querySelector(".rica" + i);
  spa.innerHTML = ` Saldo aggiornato €${arr[i].ricarica(20)}`;
  stampaSaldo(i);
}
