import { from, range, fromEvent, merge, concat } from 'rxjs';
import {
  pluck, filter, map, throttleTime, startWith,
  bufferCount, skipLast, toArray, scan, mergeMap
} from 'rxjs/operators'


export default (lines, spaces, printFunc) => {
  // 방향키를 1 or -1로 치환한 스트림
  const keypress$ = fromEvent(document, 'keydown').pipe(
    pluck('key'), // key 항목만 추출
      filter(k => k.includes('Arrow')), // Arrow 문자열이 포함된, 즉 방향키만 필터링
        map(k => { // 방향에 따라 -1, 1을 반환하는 keypress stream 생성
          return {
            ArrowDown: 1,
            ArrowUp: -1,
            ArrowLeft: -1,
            ArrowRight: 1
          }[k]   }));


  // 마우스 스크롤을 1초 간격으로 끊은 뒤
  // 방향에 따라 1 또는 -1로 치환한 스트림
  const scroll$ = merge(  // stream merge
    fromEvent(document, 'mousewheel'),
    fromEvent(document, 'wheel'),
  ).pipe(
    throttleTime(1000), // 주어진 시간에 한 값만 통과하도록 한다. 스크롤 이벤트는 1초에 한 번 받는다.
    map(s => s.deltaY > 0 ? 1 : -1)
  );


  // stream for keypress$ + scroll$ + default value (0)
  const input$ = merge(
    keypress$, scroll$
  ).pipe(startWith(0)); // 스트림의 시작에 기본 값을 지정


  // first line and last line에 공백으로 들어갈 스트림
  const spaces$ = range(0, spaces).pipe(map(() => ''));
  
  // 프롬프터에 표시할 행들을 앞뒤 공백과 이어 붙인 뒤
  // spaces + 1개 라인, 1줄 간격으로 묶어서 배열 형태로 반환하는 스트림
  const lines$ = concat(
    spaces$,
    from(lines),
    spaces$
  ).pipe(
    bufferCount(spaces * 2 + 1, 1),
      skipLast(spaces * 2),
        toArray());


  // input$의 입력에 따라 lines$의 1줄 간격으로 묶인 배열을 하나씩 발행하는 스트림
  const final$ = input$.pipe(
    scan((acc, cur) => {
      return Math.min(Math.max(acc += cur, 0), lines.length - 1)
    }),
    mergeMap(cursor => { // mergeMap: 한 스트림에서 발행되는 값을 사용해서 주어진 또 다른 스트림을 실행하고, 값을 반환
      return lines$.pipe(
        map(buffereds => buffereds[cursor])
      )
    })
  );

  // 최종 스트림 구독
  final$.subscribe(printFunc);
}
