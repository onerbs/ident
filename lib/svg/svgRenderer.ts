import { SvgPath } from './svgPath'
import { parseHex, RE_COLOR_LONG } from '../color'
import { Renderer } from '../renderer'
import { SvgWriter } from './svgWriter'
import { Point } from '../point'

/**
 * Renderer producing SVG output.
 */
export class SvgRenderer implements Renderer {
  readonly iconSize: number
  private path: SvgPath
  private store: PathStore
  private writer: SvgWriter

  constructor(writer: SvgWriter) {
    this.path = new SvgPath()
    this.store = {}
    this.writer = writer
    this.iconSize = writer.iconSize
  }

  setBackground(fillColor: string) {
    const match = RE_COLOR_LONG.exec(fillColor)
    if (match) {
      const opacity = match[2] ? parseHex(match[2], 0) / 255 : 1
      this.writer.setBackground(match[1], opacity)
    }
  }

  beginShape(color: string) {
    this.path = this.store[color] || (this.store[color] = new SvgPath())
  }

  endShape() { }

  addPolygon(points: Point[]) {
    this.path.addPolygon(points)
  }

  addCircle(point: Point, diameter: number, counterClockwise: boolean) {
    this.path.addCircle(point, diameter, counterClockwise)
  }

  finish() {
    const pathsByColor = this.store
    for (let color in pathsByColor) {
      if (pathsByColor.hasOwnProperty(color)) {
        this.writer.appendPath(color, pathsByColor[color].dataString)
      }
    }
  }
}

type PathStore = {
  [index: string]: SvgPath
}
