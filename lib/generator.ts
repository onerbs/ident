import { Graphics } from './graphics'
import { parseHex } from './color'
import { Renderer } from './renderer'
import { Transform } from './transform'
import { centerShape, outerShape } from './shapes'
import { getTheme } from './theme'
import { Config, getConfig } from './config'

/**
 * Draws an ident to a specified renderer.
 */
export function generateIcon(renderer: Renderer, hash: string, config?: Config): void {
  const parsedConfig = getConfig(config)

  // Set background color
  if (parsedConfig.backColor) {
    renderer.setBackground(parsedConfig.backColor)
  }

  // Calculate padding and round to nearest integer
  let { iconSize } = renderer
  const padding = (0.5 + iconSize * parsedConfig.iconPadding) | 0
  iconSize -= padding * 2

  const graphics = new Graphics(renderer)

  // Calculate cell size and ensure it is an integer
  const cell = 0 | (iconSize / 4)

  // Since the cell size is integer based, the actual icon will be slightly smaller than specified => center icon
  const x = 0 | (padding + iconSize / 2 - cell * 2)
  const y = 0 | (padding + iconSize / 2 - cell * 2)

  function renderShape(ix: number, shapeFn: ShapeFn, sIndex: number, rIndex: number, positions: number[][]): void {
    const shapeIndex = parseHex(hash, sIndex, 1)
    let rotationIndex = rIndex ? parseHex(hash, rIndex, 1) : 0
    renderer.beginShape(theme[colors[ix]])
    for (let i = 0; i < positions.length; i++) {
      graphics.tf = new Transform(
        x + positions[i][0] * cell,
        y + positions[i][1] * cell,
        cell, rotationIndex++ % 4
      )
      shapeFn(shapeIndex, graphics, cell, i)
    }
    renderer.endShape()
  }

  // AVAILABLE COLORS
  const hue = parseHex(hash, -7) / 0xfffffff

  // Available colors for this icon
  const theme = getTheme(hue, parsedConfig)

  // The index of the selected colors
  const colors: number[] = []

  let index: number

  function isDuplicate(values: number[]): boolean {
    if (values.indexOf(index) >= 0) {
      for (let value of values) {
        if (colors.indexOf(value) >= 0) {
          return true
        }
      }
    }
    return false
  }

  for (let i = 0; i < 3; i++) {
    index = parseHex(hash, 8 + i, 1) % theme.length
    if (isDuplicate([0, 4]) // Disallow dark gray and dark color combo
    ||  isDuplicate([2, 3]) // Disallow light gray and light color combo
    ) index = 1
    colors.push(index)
  }

  // ACTUAL RENDERING

  // Sides
  renderShape(0, outerShape, 2, 3, [[1, 0], [2, 0], [2, 3], [1, 3], [0, 1], [3, 1], [3, 2], [0, 2]])
  // Corners
  renderShape(1, outerShape, 4, 5, [[0, 0], [3, 0], [3, 3], [0, 3]])
  // Center
  renderShape(2, centerShape, 1, 0, [[1, 1], [2, 1], [2, 2], [1, 2]])

  renderer.finish()
}

type ShapeFn = (i: number, g: Graphics, c: number, z: number) => void
