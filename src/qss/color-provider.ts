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
        ...extractRgbaToColors(text),
        ...extractHsvToColors(text),
        ...extractHsvaToColors(text),
        ...extractHslToColors(text),
        ...extractHslaToColors(text),
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
        new ColorPresentation(fromColorToRgba(color)),
        new ColorPresentation(fromColorToHsva(color)),
        new ColorPresentation(fromColorToHsla(color)),
      ]

      if (color.alpha === 1)
        supportedPresentation.push(
          new ColorPresentation(fromColorToHexRgb(color)),
          new ColorPresentation(fromColorToHexRrggbb(color)),
          new ColorPresentation(fromColorToRgb(color)),
          new ColorPresentation(fromColorToHsv(color)),
          new ColorPresentation(fromColorToHsl(color)),
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

export function extractHsvToColors(text: string): readonly MatchedColor[] {
  // parse 'hsv(360, 100%, 100%)'
  const matches = text.matchAll(
    /hsv\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, h, s, v] = match

      if (isNil(h) || isNil(s) || isNil(v)) return undefined

      const rgb = hsvToRgb({
        h: Number(h),
        s: fromColorValueStringToNumber(s),
        v: fromColorValueStringToNumber(v),
      })
      return {
        color: new Color(rgb.r, rgb.g, rgb.b, 1),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export function extractHsvaToColors(text: string): readonly MatchedColor[] {
  // parse 'hsv(360, 100%, 100%, 100%)'
  const matches = text.matchAll(
    /hsva\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, h, s, v, a] = match

      if (isNil(h) || isNil(s) || isNil(v) || isNil(a)) return undefined

      const rgb = hsvToRgb({
        h: Number(h),
        s: fromColorValueStringToNumber(s),
        v: fromColorValueStringToNumber(v),
      })
      return {
        color: new Color(rgb.r, rgb.g, rgb.b, fromColorValueStringToNumber(a)),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export function extractHslToColors(text: string): readonly MatchedColor[] {
  // parse 'hsl(360, 100%, 100%)'
  const matches = text.matchAll(
    /hsl\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, h, s, l] = match

      if (isNil(h) || isNil(s) || isNil(l)) return undefined

      const rgb = hslToRgb({
        h: Number(h),
        s: fromColorValueStringToNumber(s),
        l: fromColorValueStringToNumber(l),
      })
      return {
        color: new Color(rgb.r, rgb.g, rgb.b, 1),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export function extractHslaToColors(text: string): readonly MatchedColor[] {
  // parse 'hsla(360, 100%, 100%, 100%)'
  const matches = text.matchAll(
    /hsla\s*\(\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*\)/g,
  )

  return [...matches]
    .map(match => {
      if (isNil(match.index)) return undefined

      const [code, h, s, l, a] = match

      if (isNil(h) || isNil(s) || isNil(l) || isNil(a)) return undefined

      const rgb = hslToRgb({
        h: Number(h),
        s: fromColorValueStringToNumber(s),
        l: fromColorValueStringToNumber(l),
      })
      return {
        color: new Color(rgb.r, rgb.g, rgb.b, fromColorValueStringToNumber(a)),
        offsetRange: {
          start: match.index,
          end: match.index + code.length,
        },
      }
    })
    .filter(notNil)
}

export type MatchedColor = {
  readonly color: Color
  readonly offsetRange: {
    readonly start: number // inclusive
    readonly end: number // exclusive
  }
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

export function fromColorToHsv(color: Color) {
  const { h, s, v } = rgbToHsv({ r: color.red, g: color.green, b: color.blue })
  return `hsv(${h}, ${s * 100}%, ${v * 100}%)`
}

export function fromColorToHsva(color: Color) {
  const { h, s, v } = rgbToHsv({ r: color.red, g: color.green, b: color.blue })
  return `hsva(${h}, ${s * 100}%, ${v * 100}%, ${color.alpha * 100}%)`
}

export function fromColorToHsl(color: Color) {
  const { h, s, l } = rgbToHsl({ r: color.red, g: color.green, b: color.blue })
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`
}

export function fromColorToHsla(color: Color) {
  const { h, s, l } = rgbToHsl({ r: color.red, g: color.green, b: color.blue })
  return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${color.alpha * 100}%)`
}

function fromColorValueStringToNumber(str: string) {
  if (str.endsWith('%')) return parseInt(str.slice(0, -1), 10) / 100
  return parseInt(str, 10) / 255
}

export function hsvToRgb({ h, s, v }: { h: number; s: number; v: number }) {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  return { r: r + m, g: g + m, b: b + m }
}

export function rgbToHsv({ r, g, b }: { r: number; g: number; b: number }) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const c = max - min

  let h = 0
  let s = 0
  const v = max

  if (c !== 0) {
    if (max === r) {
      h = ((g - b) / c) % 6
    } else if (max === g) {
      h = (b - r) / c + 2
    } else {
      h = (r - g) / c + 4
    }

    h *= 60
    s = c / max
  }

  return { h, s, v }
}

export function hslToRgb({ h, s, l }: { h: number; s: number; l: number }) {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  return { r: r + m, g: g + m, b: b + m }
}

export function rgbToHsl({ r, g, b }: { r: number; g: number; b: number }) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const c = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (c !== 0) {
    if (max === r) {
      h = ((g - b) / c) % 6
    } else if (max === g) {
      h = (b - r) / c + 2
    } else {
      h = (r - g) / c + 4
    }

    h *= 60
    s = c / (1 - Math.abs(2 * l - 1))
  }

  return { h, s, l }
}
