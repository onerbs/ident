import { Point } from '../point'

/**
 * Represents an SVG path element.
 */
export class SvgPath {
  /** This property holds the data string (path.d) of the SVG path. */
  dataString: string

  constructor() {
    this.dataString = ''
  }

  /**
   * Adds a polygon with the current fill color to the SVG path.
   * @param points An array of Point objects.
   */
  addPolygon(points: Point[]) {
    let dataString = ''
    for (let i = 0; i < points.length; i++) {
      dataString += (i ? 'L' : 'M')
        + svgValue(points[i].x)
        + ' '
        + svgValue(points[i].y)
    }
    this.dataString += `${dataString}Z`
  }

  /**
   * Adds a circle with the current fill color to the SVG path.
   * @param point - The upper left corner of the circle bounding box
   * @param diameter - The diameter of the circle
   * @param counterClockwise - True if the circle is drawn counter-clockwise (will result in a hole if rendered on a clockwise path)
   */
  addCircle(point: Point, diameter: number, counterClockwise: boolean) {
    const sweepFlag = counterClockwise ? 0 : 1
    const svgRadius = svgValue(diameter / 2)
    const svgDiameter = svgValue(diameter)
    const svgArc = `a${svgRadius},${svgRadius} 0 1,${sweepFlag}`

    this.dataString += `M${svgValue(point.x)} `
      + svgValue(point.y + diameter / 2)
      + `${svgArc} ${svgDiameter},0`
      + `${svgArc} ${-svgDiameter},0`
  }
}

/**
 * Prepares a measure to be used as a measure in an SVG path, by
 * rounding the measure to a single decimal. This reduces the file
 * size of the generated SVG with more than 50% in some cases.
 */
function svgValue(value: number) {
  return ((value * 10 + 0.5) | 0) / 10
}
