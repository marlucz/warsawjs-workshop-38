const { timer } = require("rxjs");
const { map } = require("rxjs/operators");

const posts$ = timer(0, 1000).pipe(
  map(() => [...new Array(Math.round(Math.random() * 10))].map((_, i) => i))
);

function loadComments(id) {
  return [...new Array(Math.round(Math.random() * 3))].map(
    (_, i) => `Comment ${i} for post id - ${id}`
  );
}
/**
 * Given an Observable of list of post ids and a function that loads comments for a specific post. Create an Observable of posts with loaded comments.
 */
function addCommentsToThePost(postId) {
  return {
    id: postId,
    comments: loadComments(postId)
  };
}
function addCommentsToListOfPosts(posts) {
  // posts is a list of ids - [0, 1, 2, 3]
  return posts.map(post => addCommentsToThePost(post));
}
const postsWithComments$ = posts$.pipe(
  map(posts => addCommentsToListOfPosts(posts))
); // your solution here
// result: [
//   {
//     id: 1,
//     comments: [ 'Comment 0 for post id - 2', 'Comment 1 for post id - 2' ],
//   },
//   {
//     id: 2,
//     comments: [ 'Comment 0 for post id - 2', 'Comment 1 for post id - 2' ],
//   },
// ]
// console.log(loadComments(2))
postsWithComments$.subscribe(console.log);
