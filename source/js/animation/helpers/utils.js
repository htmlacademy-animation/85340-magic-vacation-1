const toRad = (angle) => angle * Math.PI / 180;

export const WW = window.innerWidth;

export const WH = window.innerHeight;

export const percentOf = (dimension, percent) => dimension * percent / 100;

export const rotate = (ctx, angle, cx, cy) => {
  ctx.translate(cx, cy);
  ctx.rotate(toRad(angle));
  ctx.translate(-cx, -cy);
};

export const rotationMatrix = (cx, cy, x, y, angle) => {
  const cos = Math.cos(toRad(angle));
  const sin = Math.sin(toRad(angle));

  return {
    x: (x - cx) * cos - (y - cy) * sin + cx,
    y: (x - cx) * sin + (y - cy) * cos + cy
  };
};
