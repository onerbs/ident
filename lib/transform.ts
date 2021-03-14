import { Point } from './point'

/**
 * Translates and rotates a point before being passed on to the canvas context.
 *
 * This was previously done by the canvas context itself, but this caused
 * a rendering issue in Chrome on sizes > 256 where the rotation transformation
 * of inverted paths was not done properly.
 */
export class Transform {
  /** The x-coordinate of the upper left corner of the transformed rectangle. */
  private readonly x: number

  /** The y-coordinate of the upper left corner of the transformed rectangle. */
  private readonly y: number

  /** The size of the transformed rectangle. */
  private readonly size: number

  /** Rotation specified as 0 = 0 rad, 1 = 0.5π rad, 2 = π rad, 3 = 1.5π rad */
  private readonly rotation: number

  constructor(x: number, y: number, size: number, rotation: number) {
    this.x = x
    this.y = y
    this.size = size
    this.rotation = rotation
  }

  /**
   * Transforms the specified point based on the translation and rotation specification for this Transform.
   * If `w` or `h` are greater than 0, the returned point is of the upper left corner of the transformed rectangle.
   * @param x - The x-coordinate
   * @param y - The y-coordinate
   * @param w - The width of the transformed rectangle.
   * @param h - The height of the transformed rectangle.
   */
  point(x: number, y: number, w = 0, h = 0): Point {
    const right = this.x + this.size
    const bottom = this.y + this.size
    switch (this.rotation) {
      case 1:
        return new Point(right - y - h, this.y + x)

      case 2:
        return new Point(right - x - w, bottom - y - h)

      case 3:
        return new Point(this.x + y, bottom - x - w)

      default:
        return new Point(this.x + x, this.y + y)
    }
  }
}

export const STATIC = new Transform(0, 0, 0, 0)
