require("./index.css");
const { getPosts } = require("./api");
const { renderPosts, renderStatus } = require("./ui");
const { timer, fromEvent, combineLatest, Subject, of, merge } = require("rxjs");
const {
  switchMap,
  map,
  tap,
  startWith,
  share,
  retryWhen,
  delay,
  scan
} = require("rxjs/operators");
const error$ = new Subject();
const post$ = timer(0, 5000).pipe(
  switchMap(() => getPosts()),
  retryWhen(errorObs$ =>
    errorObs$.pipe(
      tap(x => error$.next(x)),
      delay(1000)
    )
  ),
  share()
);
const filter$ = fromEvent(document.getElementById("filter"), "input").pipe(
  map(event => event.target.value),
  startWith("")
);
const filteredPosts$ = combineLatest(post$, filter$).pipe(
  map(([posts, filter]) => filterPosts(posts, filter))
);
const successStatus$$ = post$.pipe(
  map(posts =>
    timer(0, 1000).pipe(
      map(time => `Fetched ${posts.length} posts in ${time}s.`)
    )
  )
);
const error$$ = error$.pipe(map(err => of(`Error: ${err.message}`)));
const status$$ = merge(successStatus$$, error$$);
const statusMessage$ = status$$.pipe(
  // ----(--1--2--3-->) ----(--1--2--3-->) ----(--1--2--3-->)
  switchMap(status$ => status$)
);
filteredPosts$.subscribe(renderPosts);
// statusMessage$.subscribe(renderStatus)

// Given an Observable that represents real time Ether (blockchain currency) price, create an observable that represents the change in price in percentage between now and 5 seconds ago (hint: use delay operator).
const price$ = timer(0, 700).pipe(
  scan(acc => Math.round(acc + Math.random() * 60 - 30), 150)
);

const last$ = price$.pipe(delay(5000));

const difference$ = combineLatest(price$, last$).pipe(
  map(([last, price]) => `Price: ${price}, changed: ${price - last}`)
);

difference$.subscribe(renderStatus);

function filterPosts(posts, filter) {
  const filterLowerCase = filter.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(filterLowerCase)
  );
}
