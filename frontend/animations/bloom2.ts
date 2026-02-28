/**
 *  Art is a constant process of inventing ways to escape the restrictions of past inventions.
 *  Thanks to Tyler Hobbs: https://www.tylerxhobbs.com/words/a-guide-to-simulating-watercolor-paint-with-generative-art
 *  Copyright © 2026 Jeff Fohl
 */

import { gaussianRandom, rampedRandom } from '@/animations/utils/random'

// types
type Point = { x: number; y: number; variance: number }
type Polygon = Point[]

class Bloom2Animator {
    private context: CanvasRenderingContext2D | null = null
    private canvas: HTMLCanvasElement | null = null
    private rect: DOMRect | null = null
    private timer: number | null = null

    constructor(canvasId: string) {
        this.canvas = document.getElementById(
            canvasId
        ) as HTMLCanvasElement | null
        if (this.canvas?.getContext) {
            const dpr = window.devicePixelRatio
            this.rect = this.canvas.getBoundingClientRect()
            this.canvas.width = this.rect.width * dpr
            this.canvas.height = this.rect.height * dpr
            this.context = this.canvas.getContext('2d')
            this.context?.scale(dpr, dpr)
        }
    }

    private createPolygon(
        coordinates: { x: number; y: number },
        radius: number,
        facets: number,
        variance: number
    ): Polygon {
        if (!coordinates || !radius || !facets) {
            return []
        }
        // we have the coordinates of the center,
        // so, we need to create spokes out from there,
        // we can use the following forumulae to find the
        // x and y coordinates of the point of a circle with
        // radius r and center point h,k, and angle theta:
        // x = h + (r*cos(theta))
        // y = k + (r*sin(theta))
        const base_angle = (Math.PI * 2) / facets

        const points: Point[] = []

        for (let i = 0; i < facets; i++) {
            const angle = base_angle * i
            if (angle < 0 || angle > Math.PI * 2) {
                continue
            }
            let x = Math.round(coordinates.x + radius * Math.cos(angle))
            if (x < 0) x = 0 // if the coordinate goes off the edge, just keep it on the edge
            let y = Math.round(coordinates.y + radius * Math.sin(angle))
            if (y < 0) y = 0
            points.push({ x, y, variance })
        }

        return points
    }
    /**
     * Deform a polygon, by moving the points in a random direction
     */
    private deformPolygon(polygon: Polygon): Polygon {
        const newPoly: Polygon = []
        for (let i = 0; i < polygon.length; i++) {
            newPoly.push({
                x: gaussianRandom(polygon[i].x, polygon[i].variance),
                y: gaussianRandom(polygon[i].y, polygon[i].variance),
                variance: polygon[i].variance,
            })
        }
        return newPoly
    }

    /**
     * Deform a polygon by imputing points between the existing points and the new points
     */
    private deformAndImputePolygon(polygon: Polygon): Polygon {
        const newPoly: Polygon = []
        for (let i = 0; i < polygon.length; i++) {
            const pointA = polygon[i]
            if (!pointA) {
                continue
            }
            const A = { x: pointA.x, y: pointA.y, variance: pointA.variance }
            const n: number = (i + 1) % polygon.length
            const pointC = polygon[n]
            if (!pointC) {
                continue
            }
            const C = { x: pointC.x, y: pointC.y, variance: pointC.variance }
            if (!A || !C) {
                continue
            }
            const v = gaussianRandom(
                (pointA.variance + pointC.variance) / 2,
                (pointA.variance + pointC.variance) / 2
            )
            const B = {
                x: gaussianRandom((A.x + C.x) / 2, v),
                y: gaussianRandom((A.y + C.y) / 2, v),
                variance: v,
            }
            newPoly.push(A, B, C)
        }
        return newPoly
    }

    private iterativelyDeformPolygon(
        polygon: Polygon,
        iterations: number
    ): Polygon {
        let deformedPolygon = polygon
        for (let i = 0; i < iterations; i++) {
            deformedPolygon = this.deformAndImputePolygon(deformedPolygon)
        }
        return deformedPolygon
    }

    /**
     * Draw a polygon, from a given center coordinate,
     * and radius. Returns the polygon's coordinates
     */

    private drawPolygon(polygon: Polygon, color: string) {
        if (!this.canvas || !this.context || !polygon[0]) {
            return
        }

        this.context.beginPath() // Start a new path
        this.context.moveTo(polygon[0].x, polygon[0].y) // Move to the first point

        // Loop through the remaining points and draw lines to them
        for (let i = 1; i < polygon.length; i++) {
            // with strict typescript rules, we need to assign the indexed value to a constant:
            const point = polygon[i]
            if (!point) {
                continue
            }
            this.context.lineTo(point.x, point.y)
        }

        this.context.closePath() // Connect the last point to the first
        this.context.fillStyle = color // Set the fill color
        this.context.fill() // Fill the interior
    }

    /**
     * Initializes the animation on the specified canvas
     */

    public start() {
        // create a random number of polygons:
        // get the larger of the dimensions
        const larger = Math.max(this.rect!.width, this.rect!.height)
        let radius = Math.round((Math.random() * larger) / 6)
        let facets = Math.round(gaussianRandom(15, 5))
        if (facets < 5) {
            facets = 5
        }
        // get coordinates
        const x = Math.round(Math.random() * (this.rect!.width || 100))
        const y = Math.round(Math.random() * (this.rect!.height || 100))
        // calculate random color
        const l = Math.random() * 100
        const c = Math.random() * 100
        const h = Math.random() * 360
        const color = `oklch(${l}% ${c}% ${h}deg / 0.025)`

        const poly = this.createPolygon({ x, y }, radius, facets, radius / 10)
        const deformedPoly = this.deformPolygon(poly)
        const numberOfLayers = 85
        let iteration = 0
        let self = this

        function draw() {
            iteration++
            self.drawPolygon(
                self.iterativelyDeformPolygon(deformedPoly, 6),
                color
            )
            self.timer = window.setTimeout(() => {
                if (iteration <= numberOfLayers) {
                    draw()
                } else {
                    if (self.timer) {
                        clearTimeout(self.timer)
                    }
                    self.start()
                }
            }, 10)
        }
        draw()
    }

    public stop(): void {
        // Clear any timeouts
        if (this.timer !== null) {
            window.clearTimeout(this.timer)
            this.timer = null
        }
    }

    public destroy(): void {
        // Stop the animation first
        this.stop()

        // Release references to DOM elements
        if (this.canvas) {
            // Clear the canvas to prevent memory leaks
            if (this.context) {
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                )
            }
        }

        this.canvas = null
        this.context = null
        this.rect = null
    }
}

export const buildBloom2Animation = (canvasId: string): Bloom2Animator => {
    const animator = new Bloom2Animator(canvasId)
    animator.start()
    return animator
}
