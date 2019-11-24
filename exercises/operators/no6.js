const { timer } = require("rxjs");
const { scan, pairwise, tap, map } = require("rxjs/operators");
const price$ = timer(0, 1000).pipe(
  scan(acc => Math.round(acc + Math.random() * 60 - 30), 150)
);
/*
Given a price that is updated every second. Calculate the change in price every second and then calculate real-time sum of all price changes from the beginning.
*/
const change$ = price$.pipe(
  pairwise(),
  map(([prev, curr]) => curr - prev),
  map(x => Math.abs(x))
);
const changeSum$ = change$.pipe(scan((acc, value) => acc + value, 0));
changeSum$.subscribe(console.log);
