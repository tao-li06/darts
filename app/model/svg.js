import { color } from './palette';
import { sortKeys } from './record';

const flat = (map) => Object.keys(map).map(key => `${key}="${map[key]}"`).join(' ');

const node = (tag) => (options, ...children) => {
  if (!children) {
    return `<${tag} ${options && flat(options)} />`;
  } else {
    return (
      `<${tag} ${options && flat(options)}>
          ${children.join(' ')}
      </${tag}>
      `);
  }
}

const svg = node('svg');
const g = node('g');
const rect = node('rect');
const text = node('text');

const print = (data,
  columns,
  headerWidth = 20,
  fontSize = 8,
  cellW = 15,
  cellH = 15,
  maxNameCharLength = 22,
  normalize = Math.log2,
  max = 2,
  min = -2,
  [h1, l1] = [0, 50],
  [h2, l2] = [240, 50],
  steps = 5) => {
  const keys = sortKeys(Object.keys(data));
  const nameHeight = maxNameCharLength * fontSize * 0.52;
  const len = keys.length;

  const cells = [];     
  for (let step = 0; step < steps; step++) {
    cells.push(
      g(
        { transform: `translate(0, ${cellH * (steps * 2 - step)})`},
        text(
          { 'font-size': fontSize, x: cellW / 2, y: cellH / 2, 'text-anchor': "middle", 'alignment-baseline': "central" },
          (min * (1 - step / steps)).toFixed(1)
        ),
        rect(
          { transform: `translate(${cellW}, 0)`, width: cellW, height: cellH, fill: color(h2, l2, 1 - step / steps)}
        )
      )
    );
    cells.push(
      g(
        { transform:`translate(0, ${cellH * (step)})`},
        text(
           { 'font-size': fontSize, x: cellW / 2, y: cellH / 2, 'text-anchor': "middle", 'alignment-baseline': "central"},
           (max * (1 - step / steps)).toFixed(1)
        ),
        rect(
          { transform: `translate(${cellW}, 0)`, width: cellW, height: cellH, fill: color(h1, l1, 1- step / steps)}
        )
      )
    );
  }
  cells.push(
    g(
      { transform: `translate(0, ${cellH * (steps)})` },
      text(
        { 'font-size': fontSize, x: cellW / 2, y: cellH / 2, 'text-anchor': "middle", 'alignment-baseline': "central"},
        0
      ),
      rect(
        { transform: `translate(${cellW}, 0)`, width: cellW, height: cellH, fill: color(h2, l2, 0)}
      )
    )
  );

  const s = 
    svg(
      { 'xmlns:dc': "http://purl.org/dc/elements/1.1/",
        'xmlns:cc': "http://web.resource.org/cc/",
        'xmlns:rdf': "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        'xmlns:svg': "http://www.w3.org/2000/svg",
        'xmlns': "http://www.w3.org/2000/svg" 
      },
      g(
        {},
        cells.join(' ')
      ),
      g(
        { transform: 'translate(80, 0)'},
        g(
          { transform: 'translate(0,0)'},
          columns.map((column, index) => 
            text(
              { 'font-size': fontSize, x: headerWidth / 2, y: cellH * (index) + cellH / 2, 'text-anchor': 'middle', 'alignment-baseline': 'central'},
              column
            )
          ).join(' ')
        ),
        g(
          { transform: `translate(${headerWidth},0)`, width: cellW * len },
          keys.map((rowIndex, rowItemIndex) => {
            const row = data[rowIndex];
            return g(
              { transform: `translate(${cellW * (rowItemIndex)}, 0)`, height: columns.length * cellH + nameHeight },
              Object.keys(row).map((i) => {
                  const v = row[i];
                  const value = normalize(v);
                  const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                  return g(
                    { transform: `translate(0, ${cellH * (i)})`},
                    rect(
                      { width: cellW, height: cellH, fill: value > 0 ? color(h1, l1, percent) : color(h2, l2, percent) }
                    ),
                    text(
                      { fill: Math.abs(value) > 0.6? "white":"black" , x: cellW / 2,y: cellH / 2, 'font-size': fontSize, 'text-anchor': "middle", 'alignment-baseline': "central" },
                      v.toFixed(1)
                    )
                  );
                }
              ).join(' '),
              text(
                { 'font-size': fontSize, x: cellW / 2 - (fontSize / 2), y: cellH * columns.length,
                  transform: `rotate(90 ${cellW / 2 - (fontSize / 2)}, ${cellH * columns.length})` },
                  rowIndex
              )
            );
          }).join(' ')
        )
      )
    );
  console.log(s);
}

export default print;