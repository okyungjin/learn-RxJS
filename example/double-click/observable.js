const button = document.getElementById('btn');
const clicks = fromEvent(button, 'click');

clicks
  .buffer(clicks.throttleTime(400))
  .map(events => events.length)
  .filter(count => count === 2)
  .subscribe(() => console.log('더블 클릭!'));