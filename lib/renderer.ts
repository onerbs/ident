import { Point } from './point'

export interface Renderer {
  /**
   * The icon size.
   */
  iconSize: number

  /**
   * Fills the background with the specified color.
   * @param color - The color on the format #rrggbb[aa].
   */
  setBackground(color: string): void

  /**
   * Marks the beginning of a new shape of the specified color.
   * Should be ended with a call to endShape.
   * @param color - The color on format #rrggbb[aa]
   */
  beginShape(color: string): void

  /**
   * Marks the end of the currently drawn shape.
   * This causes the queued paths to be rendered on the canvas.
   */
  endShape(): void

  /**
   * Adds a polygon to the rendering queue.
   * @param points - An array of Point objects
   */
  addPolygon(points: Point[]): void

  /**
   * Adds a circle to the rendering queue.
   * @param point - The upper left corner of the circle bounding box
   * @param diameter - The diameter of the circle
   * @param counterClockwise - True if the circle is drawn counter-clockwise (will result in a hole if rendered on a clockwise path)
   */
  addCircle(point: Point, diameter: number, counterClockwise?: boolean): void

  /**
   * Called when the icon has been completely drawn.
   */
  finish(): void
}
