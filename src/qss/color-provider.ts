/* eslint-disable @typescript-eslint/no-magic-numbers */

import type {
  CancellationToken,
  DocumentColorProvider,
  ProviderResult,
  TextDocument,
} from 'vscode'
import {
  Color,
  ColorInformation,
  ColorPresentation,
  languages,
  Range,
} from 'vscode'
import { isNil, notNil } from '../utils'

export function registerQssColorProvider() {
  return languages.registerColorProvider(
    { scheme: 'file', language: 'qss' },
    getDocumentColorProvider(),
  )
}

function getDocumentColorProvider(): DocumentColorProvider {
  return {
    provideDocumentColors: (
      document: TextDocument,
      _token: CancellationToken,
    ): ProviderResult<ColorInformation[]> => {
      const text = document.getText()

      const matchedColors = [
        ...extractHexRgbToColor(text),
        ...extractHexRrggbbToColor(text),
        ...extractHexAarrggbbToColor(text),
        ...extractRgbToColors(text),
      ]

      return matchedColors.map(match => {
        const start = document.positionAt(match.offsetRange.start)
        const end = document.positionAt(match.offsetRange.end)
        return new ColorInformation(new Range(start, end), match.color)
      })
    },

    provideColorPresentations: (
      color: Color,
      _context: { document: TextDocument; range: Range },
      _token: CancellationToken,
    ): ProviderResult<ColorPresentation[]> => {
      const supportedPresentation = [
        new ColorPresentation(fromColorToHexAarrggbb(color)),
      ]

      if (color.alpha === 1)
        supportedPresentation.push(
          new ColorPresentation(fromColorToHexRgb(color)),
          new ColorPresentation(fromColorToHexRrggbb(color)),
          new ColorPresentation(fromColorToRgb(color)),
        )

      return supportedPresentation
    },
  }
}

export function extractHexRgbToColor(text: string): readonly MatchedColor[] {
  // parse '#rgb'
  const matches = text.matchAll(/#([0-9a-f])([0-9a-f])([0-9a-f])\b/gi)

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, r, g, b] = match

      if (isNil(r) || isNil(g) || isNil(b)) return undefined

      return {
        color: new Color(
          parseInt(r, 16) / 15,
          parseInt(g, 16) / 15,
          parseInt(b, 16) / 15,
          1,
        ),
        offsetRange: { start: match.index, end: match.index + code.length },
      }
    })
    .filter(notNil)
}

export function extractHexRrggbbToColor(text: string): readonly MatchedColor[] {
  // parse '#rrggbb'
  const matches = text.matchAll(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})\b/gi)

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, r, g, b] = match

      if (isNil(r) || isNil(g) || isNil(b)) return undefined

      return {
        color: new Color(
          parseInt(r, 16) / 255,
          parseInt(g, 16) / 255,
          parseInt(b, 16) / 255,
          1,
        ),
        offsetRange: { start: match.index, end: match.index + code.length },
      }
    })
    .filter(notNil)
}

export function extractHexAarrggbbToColor(
  text: string,
): readonly MatchedColor[] {
  // parse '#aarrggbb'
  const matches = text.matchAll(
    /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})\b/gi,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, a, r, g, b] = match

      if (isNil(a) || isNil(r) || isNil(g) || isNil(b)) return undefined

      return {
        color: new Color(
          parseInt(r, 16) / 255,
          parseInt(g, 16) / 255,
          parseInt(b, 16) / 255,
          parseInt(a, 16) / 255,
        ),
        offsetRange: { start: match.index, end: match.index + code.length },
      }
    })
    .filter(notNil)
}

export function extractRgbToColors(text: string): readonly MatchedColor[] {
  // parse 'rgb(255, 255, 255)'
  const matches = text.matchAll(
    /rgb\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, r, g, b] = match

      if (isNil(r) || isNil(g) || isNil(b)) return undefined

      return {
        color: new Color(
          fromColorValueStringToNumber(r),
          fromColorValueStringToNumber(g),
          fromColorValueStringToNumber(b),
          1,
        ),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export function extractRgbaToColors(text: string): readonly MatchedColor[] {
  // parse 'rgba(255, 255, 255, 1)'
  const matches = text.matchAll(
    /rgba\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, r, g, b, a] = match

      if (isNil(r) || isNil(g) || isNil(b) || isNil(a)) return undefined

      return {
        color: new Color(
          fromColorValueStringToNumber(r),
          fromColorValueStringToNumber(g),
          fromColorValueStringToNumber(b),
          fromColorValueStringToNumber(a),
        ),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export function fromColorToHexRgb(color: Color) {
  return (
    '#' +
    Math.round(color.red * 15).toString(16) +
    Math.round(color.green * 15).toString(16) +
    Math.round(color.blue * 15).toString(16)
  )
}

export function fromColorToHexRrggbb(color: Color) {
  return (
    '#' +
    Math.round(color.red * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.green * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.blue * 255)
      .toString(16)
      .padStart(2, '0')
  )
}

export function fromColorToHexAarrggbb(color: Color) {
  return (
    '#' +
    Math.round(color.alpha * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.red * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.green * 255)
      .toString(16)
      .padStart(2, '0') +
    Math.round(color.blue * 255)
      .toString(16)
      .padStart(2, '0')
  )
}

export function fromColorToRgb(color: Color) {
  return (
    'rgb(' +
    Math.round(color.red * 255) +
    ', ' +
    Math.round(color.green * 255) +
    ', ' +
    Math.round(color.blue * 255) +
    ')'
  )
}

export function fromColorToRgba(color: Color) {
  return (
    'rgba(' +
    Math.round(color.red * 255) +
    ', ' +
    Math.round(color.green * 255) +
    ', ' +
    Math.round(color.blue * 255) +
    ', ' +
    Math.round(color.alpha * 255) +
    ')'
  )
}

function fromColorValueStringToNumber(str: string) {
  if (str.endsWith('%')) return parseInt(str.slice(0, -1), 10) / 100
  return parseInt(str, 10) / 255
}

export type MatchedColor = {
  readonly color: Color
  readonly offsetRange: {
    readonly start: number // inclusive
    readonly end: number // exclusive
  }
}
