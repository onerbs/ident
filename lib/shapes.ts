import { Graphics } from './graphics'

export function centerShape(index: number, g: Graphics, cell: number, positionIndex: number) {
  let k: number
  let m: number
  let w: number
  let h: number
  let inner: number
  let outer: number

  switch (index % 14) {
    case 0:
      k = cell * 0.42
      g.addPolygon([
        0, 0,
        cell, 0,
        cell, cell - k * 2,
        cell - k, cell,
        0, cell
      ])
      break;

    case 1:
      w = 0 | (cell * 0.5)
      h = 0 | (cell * 0.8)
      g.addTriangle(cell - w, 0, w, h, 2)
      break;

    case 2:
      w = 0 | (cell / 3)
      g.addRectangle(w, w, cell - w, cell - w)
      break;

    case 3:
      inner = cell * 0.1
      // Use fixed outer border widths in small icons
      // to ensure the border is drawn
      outer = (
        cell < 6 ? 1 :
          cell < 8 ? 2 :
            (0 | (cell * 0.25))
      )
      inner =
        inner > 1 ? (0 | inner) : // large icon => truncate decimals
          inner > 0.5 ? 1 :       // medium size icon => fixed width
            inner                 // small icon => anti-aliased border
      g.addRectangle(outer, outer, cell - inner - outer, cell - inner - outer)
      break;

    case 4:
      m = 0 | (cell * 0.15)
      w = 0 | (cell * 0.5)
      g.addCircle(cell - w - m, cell - w - m, w)
      break;

    case 5:
      inner = cell * 0.1
      outer = inner * 4

      // Align edge to nearest pixel in large icons
      outer > 3 && (outer = 0 | outer)

      g.addRectangle(0, 0, cell, cell)
      g.addPolygon([
        outer, outer,
        cell - inner, outer,
        outer + (cell - outer - inner) / 2, cell - inner
      ], true)
      break;

    case 6:
      g.addPolygon([
        0, 0,
        cell, 0,
        cell, cell * 0.7,
        cell * 0.4, cell * 0.4,
        cell * 0.7, cell,
        0, cell
      ])
      break;

    case 7:
      g.addTriangle(cell / 2, cell / 2, cell / 2, cell / 2, 3)
      break;

    case 8:
      g.addRectangle(0, 0, cell, cell / 2)
      g.addRectangle(0, cell / 2, cell / 2, cell / 2)
      g.addTriangle(cell / 2, cell / 2, cell / 2, cell / 2, 1)
      break;

    case 9:
      inner = cell * 0.14
      // Use fixed outer border widths in small icons
      // to ensure the border is drawn
      outer = (
        cell < 4 ? 1 :
          cell < 6 ? 2 :
            (0 | (cell * 0.35))
      )
      inner =
        cell < 8 ? inner : // small icon => anti-aliased border
          (0 | inner)      // large icon => truncate decimals
      g.addRectangle(0, 0, cell, cell)
      g.addRectangle(outer, outer, cell - outer - inner, cell - outer - inner, true)
      break;

    case 10:
      inner = cell * 0.12
      outer = inner * 3

      g.addRectangle(0, 0, cell, cell)
      g.addCircle(outer, outer, cell - inner - outer, true)
      break;

    case 11:
      g.addTriangle(cell / 2, cell / 2, cell / 2, cell / 2, 3)
      break;

    case 12:
      m = cell * 0.25
      g.addRectangle(0, 0, cell, cell)
      g.addRhombus(m, m, cell - m, cell - m, true)
      break;

    default:
      if (!positionIndex) {
        m = cell * 0.4, w = cell * 1.2
        g.addCircle(m, m, w)
      }
      break;
  }
}

export function outerShape(index: number, g: Graphics, cell: number) {
  switch (index % 4) {
    case 0:
      g.addTriangle(0, 0, cell, cell, 0)
      break;

    case 1:
      g.addTriangle(0, cell / 2, cell, cell / 2, 0)
      break;

    case 2:
      g.addRhombus(0, 0, cell, cell)
      break;

    default:
      let m = cell / 6
      g.addCircle(m, m, cell - 2 * m)
      break;
  }
}
