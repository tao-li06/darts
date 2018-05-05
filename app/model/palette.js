export const scale = (hue, lightness, steps, pos) => {
  const l = (100 - lightness) * pos / steps + lightness;
  return `hsla(${hue}, 100%,${l}%, 1)`
}
