import { Observable } from 'rxjs';

Observable.prototype.map = mapFn => {
  const source = this;

  return new Observable(subscriber => {
    source.subscribe(
      value => subscriber.next(mapFn(value)),
      error => subscriber.error(error),
      () => subscriber.complete(),
    );
  });
}