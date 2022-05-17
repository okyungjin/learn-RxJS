import { Observable, Subscriber } from 'rxjs';

let observable: Observable<any>;

// Observable subscribe 방법 1
const observer = {
  next: value => console.log('next', value),
  error: err => console.error('error', err),
  complete: () => console.info('complete')
};
observable.subscribe(observer); // Observable 구독


// Observable subscribe 방법 2 -- deprecated
observable.subscribe(
  value => console.log('next', value),
  err => console.error('error', err),
  () => console.info('complete')
);

// Observable subscribe 취소
const subscription1 = observable.subscribe(observer);
subscription1.unsubscribe();


// Observable 생성
const ob1 = new Observable(subscriber => {
  subscriber.next('0');
  subscriber.next('1');
  subscriber.next('2');
  subscriber.complete();
});

ob1.subscribe({
  next: value => console.log(`값 ${value}`),
  complete: () => console.log('✅')
});

// 값: 0
// 값: 1
// 값: 2
// ✅


// Observable 오류 처리
const ob2 = new Observable(subscriber => {
  subscriber.next('0');
  subscriber.next('1');
  subscriber.next('2');
  subscriber.error('💀'); // 구독자에게 에러 전달

  subscriber.next('값이');
  subscriber.next('더 이상');
  subscriber.next('흐르지 않아요.');
});

ob2.subscribe({
  next: value => console.log(`값 ${value}`),
  error: error => console.log(error),
  complete: () => console.log('✅')
});

// 값: 0
// 값: 1
// 값: 2
// 💀


// Obseravable Cleanup 
const ob3 = new Observable(subscriber => {
  subscriber.next('0');
  subscriber.next('1');
  subscriber.next('2');
  subscriber.complete();

  return () => console.log('Cleanup!');
});

const subscription2 = ob3.subscribe();
subscription2.unsubscribe();

// Cleanup!



// Observable.of
Observable.of('hello');
Observable.of(1, 2, 3);

// Observable.from
Observable.from([1, 2, 3]);
Observable.from(otherObservable);