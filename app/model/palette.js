export const scale = (hue, lightness, steps, pos) => {
  const l = (100 - lightness) * pos / steps + lightness;
  return `hsla(${hue}, 100%,${l}%, 1)`
}

export const color = (hue, lightness, percent) => {
  const l = (lightness - 100) * percent + 100;
  return `hsla(${hue}, 100%,${l}%, 1)`
}
