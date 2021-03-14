import { Point } from './point'
import { Renderer } from './renderer'
import { Transform, STATIC } from './transform'

/**
 * Provides helper functions for rendering common basic shapes.
 */
export class Graphics {
  private renderer: Renderer
  tf: Transform

  constructor(renderer: Renderer) {
    this.renderer = renderer
    this.tf = STATIC
  }

  /**
   * Adds a polygon to the underlying renderer.
   * @param points - The points of the polygon clockwise on the format [ x0, y0, x1, y1, ..., xn, yn ]
   * @param invert - Specifies if the polygon will be inverted
   */
  addPolygon(points: number[], invert?: boolean) {
    const di = invert ? -2 : 2
    const transformedPoints: Point[] = []

    for (let i = invert ? points.length - 2 : 0; i < points.length && i >= 0; i += di) {
      transformedPoints.push(this.tf.point(points[i], points[i + 1]))
    }

    this.renderer.addPolygon(transformedPoints)
  }

  /**
   * Adds a polygon to the underlying renderer.
   * Source: http://stackoverflow.com/a/2173084
   * @param x - The x-coordinate of the upper left corner of the rectangle holding the entire ellipse
   * @param y - The y-coordinate of the upper left corner of the rectangle holding the entire ellipse
   * @param size - The size of the ellipse
   * @param invert - Specifies if the ellipse will be inverted
   */
  addCircle(x: number, y: number, size: number, invert?: boolean) {
    const p = this.tf.point(x, y, size, size)
    this.renderer.addCircle(p, size, invert)
  }

  /**
   * Adds a rectangle to the underlying renderer.
   * @param x - The x-coordinate of the upper left corner of the rectangle
   * @param y - The y-coordinate of the upper left corner of the rectangle
   * @param w - The width of the rectangle
   * @param h - The height of the rectangle
   * @param invert - Specifies if the rectangle will be inverted
   */
  addRectangle(x: number, y: number, w: number, h: number, invert?: boolean) {
    this.addPolygon([
      x, y,
      x + w, y,
      x + w, y + h,
      x, y + h
    ], invert)
  }

  /**
   * Adds a right triangle to the underlying renderer.
   * @param x - The x-coordinate of the upper left corner of the rectangle holding the triangle
   * @param y - The y-coordinate of the upper left corner of the rectangle holding the triangle
   * @param w - The width of the triangle
   * @param h - The height of the triangle
   * @param r - The rotation of the triangle (clockwise). 0 = right corner of the triangle in the lower left corner of the bounding rectangle
   * @param invert - Specifies if the triangle will be inverted
   */
  addTriangle(x: number, y: number, w: number, h: number, r: number, invert?: boolean) {
    const points = [
      x + w, y,
      x + w, y + h,
      x, y + h,
      x, y
    ]
    points.splice(((r || 0) % 4) * 2, 2)
    this.addPolygon(points, invert)
  }

  /**
   * Adds a rhombus to the underlying renderer.
   * @param x - The x-coordinate of the upper left corner of the rectangle holding the rhombus
   * @param y - The y-coordinate of the upper left corner of the rectangle holding the rhombus
   * @param w - The width of the rhombus
   * @param h - The height of the rhombus
   * @param invert - Specifies if the rhombus will be inverted
   */
  addRhombus(x: number, y: number, w: number, h: number, invert?: boolean) {
    this.addPolygon([
      x + w / 2, y,
      x + w, y + h / 2,
      x + w / 2, y + h,
      x, y + h / 2
    ], invert)
  }
}
