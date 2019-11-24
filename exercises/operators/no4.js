const { timer } = require("rxjs");
const { scan, startWith, pairwise, map, filter } = require("rxjs/operators");
const names = ["Tom", "Bob", "Alice", "Peter"];
let id = 0;
const posts$ = timer(0, 1000).pipe(
  startWith([]),
  scan(
    acc =>
      Math.random() > 0.8
        ? [
            ...acc,
            {
              id: id++,
              author: names[Math.round(Math.random() * 2.9)]
            }
          ]
        : acc,
    []
  )
);
/*
Given an Observable that represents a real time list of posts, create an observable that sends messages like "Tom published a new post" when any new posts appear in the list. Use post's ids to compare them.
*/
const pairs$ = posts$.pipe(pairwise());
const pairs2$ = pairs$.pipe(
  map(([previous, current]) => {
    if (previous.length !== current.length) {
      return current[current.length - 1].author;
    }
  }),
  filter(author => author !== undefined)
);
pairs2$.subscribe(console.log);
