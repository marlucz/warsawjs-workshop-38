const { Observable } = require("rxjs");

const arr = [1, 2, 3, 4];

const arrObs$ = new Observable(observer => {
  arr.forEach(e => {
    observer.next(e);
  });
  observer.complete();
});

const subscription = arrObs$.subscribe(
  data => console.log(data),
  () => {},
  () => {
    console.log("done");
  }
);
