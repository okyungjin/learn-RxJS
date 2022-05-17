let clicks = 0;
let timeoutId;

function handleClick() {
  clicks += 1;

  if (!timeoutId) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      clicks = 0;
    }, 400);
    return;
  }

  clearTimeout(timeoutId);

  if (clicks <= 2) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      clicks = 0;
      console.log('더블 클릭!')
    }, 400);
  } else {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      clicks = 0;
    }, 400);
  }
}

button.addEventListener('click', handleClick);
