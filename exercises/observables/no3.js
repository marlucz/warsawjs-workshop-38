const { Observable } = require("rxjs");

const promiseGood = new Promise((resolve, reject) => {
  resolve("it works");
});

const promiseBad = new Promise((resolve, reject) => {
  reject("it crashed");
});

function toObservable(promise) {
  return new Observable(observer => {
    promise
      .then(
        data => observer.next(data),
        complete => {
          console.log("complete");
        }
      )
      .catch(err => observer.error(err));
  });
}

const promiseAsObservableGood$ = toObservable(promiseGood);
const promiseAsObservableBad$ = toObservable(promiseBad);

promiseAsObservableGood$.subscribe(
  data => console.log(`success: ${data}`),
  error => console.log(`error: ${error}`),
  () => console.log("complete")
);

promiseAsObservableBad$.subscribe(
  data => console.log(`success: ${data}`),
  error => console.log(`error: ${error}`),
  () => console.log("complete")
);
