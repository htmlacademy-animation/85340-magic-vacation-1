export const elasticIn = (x) => (timeFraction) => {
  return Math.pow(Math.max(x * timeFraction, 2), 10 * (timeFraction - 1)) * Math.cos(10 * Math.PI * timeFraction);
};

export const elasticOut = (x) => makeEaseOut(elasticIn(x));

export const back = (x) => (timeFraction) => {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
};

export const makeEaseOut = (timing) => {
  return (timeFraction) => {
    return 1 - timing(1 - timeFraction);
  };
};

export const linear = (timeFraction) => timeFraction;
