/**
 * Performs a Box-Muller transform to produce a gaussian distribution from a mean.
 * @param mean
 * @param sd
 * @returns a single value from a gaussian distribution
 */
export function gaussianRandom(mean: number, sd: number): number {
    const u1 = Math.random()
    const u2 = Math.random()

    // Box-Muller transform
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)

    // Scale to mean and standard deviation
    return z0 * sd + mean
}

/**
 * Function for generating a random number, with an upper bound
 * determined by a diminishing probability.
 * Lower numbers reduce the probability, larger numbers increase the probability.
 * @param ceiling
 * @param shape
 * @returns a random number between 0 and the ceiling
 */
export function rampedRandom(ceiling: number, shape: number = 1): number {
    let count = 0
    let progress = false
    while (!progress) {
        count++
        const probability = Math.pow(count / ceiling, shape)
        if (Math.random() <= probability) {
            progress = true
        }
    }
    return count
}
