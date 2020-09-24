export default ({timing, draw, duration, fps}) => {
  fps = fps || 60;

  const start = performance.now();
  const fpsInterval = 1000 / fps;
  let now;
  let then = Date.now();
  let elapsed;

  requestAnimationFrame(function animate(time) {
    now = Date.now();
    elapsed = now - then;

    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    let progress = timing(timeFraction);

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      draw(progress);
    }

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
