# Table of Contents
- [Table of Contents](#table-of-contents)
- [왜 Observable이 필요한가?](#왜-observable이-필요한가)
  - [비동기를 다루는 기존 방식의 문제점](#비동기를-다루는-기존-방식의-문제점)
    - [1) Callbacks](#1-callbacks)
    - [2) Promises](#2-promises)
- [Observable이란?](#observable이란)

# 왜 Observable이 필요한가?
## 비동기를 다루는 기존 방식의 문제점
### 1) Callbacks
Callback 함수를 인자로 넘겨서 click 이벤트가 발생했을 때 callback 함수를 실행하도록 할 수 있다.
```js
const button = document.getElementById('btn');
button.addEventListener('click', event => {/* ... */});
```

**Callback Hell**
callback의 문제는 `Callback Hell` 이 일어나기 쉽다는 것인데, 로직을 중첩하여 쌓다보니 아래 예시처럼 소스가 복잡해진다는 문제점이 있다.

```js
fetchInitialData((error, data) => {
  if (!error) {
    setTimeout(() => {
      fetchData(data, (error, data) => {
        if (error) {
          hadleError(error);
        } else {
          fetchOtherError(data, (error, data) => {
            /* ... */
          });
        }
      });
    }, 1000);
  }
});
```

### 2) Promises
- `Promise` 는 미래의 실패 또는 완료에 대한 값을 다루는 인터페이스이다. `then()` 사용하여 비동기 값을 연속적으로 다룰 수 있다. 
- `Promise` 는 표준 스펙이기 때문에 Internet Explorer를 제외한 모든 브라우저에서 사용할 수 있다.
- 또한 `async / await` 과 같이 확장할 수 있는 syntax도 가지고 있다.

**Promise의 한계**

`Promise` 의 단점은 **취소가 불가능**하며, **단일 값**만을 다룬다는 점이다. `Promise` 는 요청하면 취소할 수 있는 방법이 존재하지 않는다.

> **근데 비동기 요청에 취소가 필요하긴 한가요?**라는 의문이 들 수도 있다.

검색창에서 많이 볼 수 있는 Auto Complete와 같은 기능에는 취소가 필요하다.

<img width="700" height="400" alt="auto-complete" src="https://user-images.githubusercontent.com/31913666/168423189-e6184994-cb6c-4480-bb41-4dfcd99850c4.png">

<br>


예를 들어 사용자가 검색창에  `angular` 를 입력한 후, 그 값을 모두 지우고 `react` 로 검색어를 변경한다고 가정하자. `angular` 를 입력한 후에 검색 결과를 불러오는 비동기 요청이 호출되며, `react` 를 입력했을 때도 비동기 요청이 호출된다. 

`react` 에 대한 검색 결과가 먼저 도착했다고 가정하면 사용자 화면에는 `react` 에 대한 검색 결과가 표시된다. 그 다음으로 `angular` 에 대한 검색 결과가 도착하면 사용자는 `angular` 에 대한 검색 결과를 보게된다.

> 이러한 로직에서 비동기 요청에 대한 취소가 필요하며, **Observable**을 사용하면 이를 구현할 수 있다.


# Observable이란?
Observable의 특징은 다음과 같다.

- 비동기 이벤트로 발생하는 **여러 데이터**를 다루는 인터페이스
- 이벤트 스트림
- 취소 가능
- 비동기 흐름을 쉽게 읽을 수 있음

