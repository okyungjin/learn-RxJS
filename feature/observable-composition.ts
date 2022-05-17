import { Observable } from 'rxjs';

function transform(prev: Observable<number>): Observable<string>;

function transform(prev) {
  return new Observable(subscriber => {
    prev.subscribe(
      value => subscriber.next(`값은 ${value} 입니다.`),
      error => subscriber.error(error),
      complete => subscriber.complete(),
    );
  });
}

transform(Observable.from([1, 2, 3]))
  .subscribe(value => console.log(value));

// 값은 1 입니다.
// 값은 2 입니다.
// 값은 3 입니다.