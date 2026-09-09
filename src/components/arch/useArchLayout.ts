import { useEffect, useMemo, useRef, useState } from 'react'
import type { ArchitectureSpec } from '@/lib/types'

export interface NodeRect {
  id: string
  x: number
  y: number
  w: number
  h: number
  cx: number
  cy: number
  row: number
}

const ROW_HEIGHT = 92
const ROW_GAP = 52
const COL_GUTTER = 14

/**
 * Positions come straight from the col/row coordinates in the spec, converted
 * to pixels with one measured container width. Nothing is derived from the
 * rendered DOM, so edges and nodes can never disagree: measuring node boxes
 * would mean a reflow on every render and a first frame with the edges wrong.
 */
export function computeLayout(spec: ArchitectureSpec, width: number) {
  const cellWidth = width / spec.cols
  const rects = new Map<string, NodeRect>()

  for (const node of spec.nodes) {
    const span = node.span ?? 1
    const x = (node.col - 1) * cellWidth + COL_GUTTER / 2
    const w = Math.max(60, span * cellWidth - COL_GUTTER)
    const y = (node.row - 1) * (ROW_HEIGHT + ROW_GAP)

    rects.set(node.id, {
      id: node.id,
      x,
      y,
      w,
      h: ROW_HEIGHT,
      cx: x + w / 2,
      cy: y + ROW_HEIGHT / 2,
      row: node.row,
    })
  }

  return {
    rects,
    height: spec.rows * ROW_HEIGHT + (spec.rows - 1) * ROW_GAP,
  }
}

/** Bezier between two boxes: vertical when they sit on different rows,
 *  horizontal when they share one. */
export function edgeGeometry(a: NodeRect, b: NodeRect) {
  if (a.row === b.row) {
    const forward = a.x < b.x
    const start = forward ? { x: a.x + a.w, y: a.cy } : { x: a.x, y: a.cy }
    const end = forward ? { x: b.x, y: b.cy } : { x: b.x + b.w, y: b.cy }
    const dx = Math.max(20, Math.abs(end.x - start.x) / 2)
    const sign = forward ? 1 : -1
    return {
      d: `M ${start.x} ${start.y} C ${start.x + dx * sign} ${start.y}, ${end.x - dx * sign} ${end.y}, ${end.x} ${end.y}`,
      tip: end,
      angle: forward ? 0 : 180,
      // For this cubic the t=0.5 point is exactly the midpoint of the ends.
      mid: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 },
    }
  }

  const downward = a.row < b.row
  const start = { x: a.cx, y: downward ? a.y + a.h : a.y }
  const end = { x: b.cx, y: downward ? b.y : b.y + b.h }
  const dy = Math.max(26, Math.abs(end.y - start.y) / 2)
  const sign = downward ? 1 : -1

  return {
    d: `M ${start.x} ${start.y} C ${start.x} ${start.y + dy * sign}, ${end.x} ${end.y - dy * sign}, ${end.x} ${end.y}`,
    tip: end,
    angle: downward ? 90 : 270,
    mid: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 },
  }
}

/** Container width, tracked with a single observer for the whole diagram. */
export function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const update = () => setWidth(node.getBoundingClientRect().width)
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

export function useLayout(spec: ArchitectureSpec, width: number) {
  return useMemo(() => computeLayout(spec, width || 1), [spec, width])
}
