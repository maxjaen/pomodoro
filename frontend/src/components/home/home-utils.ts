/**
 * A given number will be formatted to have exactly two digits.
 *
 * @param {*} number The number that will be formatted.
 * @returns An string with exactly two digits, e.g.
 * - 10 will be formatted to "10"
 * - 1 will be formatted to "01"
 */
export const toTwoDigits = (number: number) => (number < 10 ? '0' + number : '' + number);

/**
 * Transforms minutes into seconds.
 *
 * @param {*} minutes the minutes that will be transformed to seconds.
 * @returns The seconds of the input value was transformed to.
 */
export const toSeconds = (minutes: number) => minutes * 60;

/**
 * Creates a promise that will be resolved after a given time.
 *
 * @param {*} ms The milliseconds that will be waited blocking.
 * @returns A promise that automatically will be resolved after a given time.
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Creates a string of the format "minutes:seconds".
 * @param {*} remaining The seconds that will be formatted.
 * @returns The formatted string e.g.
 * - 60 will be transformed to "01:00"
 */
export const toStringMMSS = (remaining: number) => {
  let minutes = Math.floor(remaining / 60);
  let seconds = remaining % 60;

  return toTwoDigits(minutes) + ':' + toTwoDigits(seconds);
};
