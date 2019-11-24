const { Observable } = require("rxjs");

const arrObs$ = new Observable(observer => {
  let x = 0;
  const timer = setInterval(() => {
    observer.next(x++);
  }, 1000);
});

const subscriber = arrObs$.subscribe({
  next(x) {
    console.log(x);
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  }
});

setTimeout(() => {
  subscriber.unsubscribe();
}, 5000);
