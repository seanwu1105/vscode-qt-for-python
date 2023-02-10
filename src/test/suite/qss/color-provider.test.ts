/* eslint-disable @typescript-eslint/no-magic-numbers */

import * as assert from 'node:assert'
import {
  extractHexAarrggbbToColor,
  extractHexRgbToColor,
  extractHexRrggbbToColor,
  extractHsvaToColors,
  extractHsvToColors,
  extractRgbaToColors,
  extractRgbToColors,
  fromColorToHexAarrggbb,
  fromColorToHexRgb,
  fromColorToHexRrggbb,
  fromColorToHsv,
  fromColorToHsva,
  fromColorToRgb,
  fromColorToRgba,
  hsvToRgb,
  rgbToHsv,
} from '../../../qss/color-provider'

suite('color-provider', () => {
  test('hex rgb', () => {
    const expected = '#fff'
    const color = extractHexRgbToColor(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHexRgb(color), expected)
  })

  test('hex rrggbb', () => {
    const expected = '#ffffff'
    const color = extractHexRrggbbToColor(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHexRrggbb(color), expected)
  })

  test('hex aarrggbb', () => {
    const expected = '#ffffffff'
    const color = extractHexAarrggbbToColor(expected).map(
      ({ color }) => color,
    )[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHexAarrggbb(color), expected)
  })

  test('rgb', () => {
    const expected = 'rgb(255, 255, 255)'
    const color = extractRgbToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToRgb(color), expected)
  })

  test('rgb with percentage', () => {
    const expected = 'rgb(100%, 100%, 100%)'
    const color = extractRgbToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToRgb(color), 'rgb(255, 255, 255)')
  })

  test('rgba', () => {
    const expected = 'rgba(255, 255, 255, 10)'
    const color = extractRgbaToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToRgba(color), expected)
  })

  test('rgba with percentage', () => {
    const expected = 'rgba(100%, 100%, 100%, 1)'
    const color = extractRgbaToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToRgba(color), 'rgba(255, 255, 255, 1)')
  })

  test('hsv', () => {
    const expected = 'hsv(60, 255, 255)'
    const color = extractHsvToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHsv(color), 'hsv(60, 100%, 100%)')
  })

  test('hsv with percentage', () => {
    const expected = 'hsv(60, 100%, 100%)'
    const color = extractHsvToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHsv(color), expected)
  })

  test('hsva', () => {
    const expected = 'hsva(60, 255, 255, 255)'
    const color = extractHsvaToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHsva(color), 'hsva(60, 100%, 100%, 100%)')
  })

  test('hsva with percentage', () => {
    const expected = 'hsva(60, 100%, 100%, 100%)'
    const color = extractHsvaToColors(expected).map(({ color }) => color)[0]
    assert.ok(color)
    assert.strictEqual(fromColorToHsva(color), expected)
  })

  test('hsv <-> rgb', () => {
    const expected = { h: 60, s: 1, v: 1 }
    assert.deepStrictEqual(rgbToHsv(hsvToRgb(expected)), expected)
  })
})
