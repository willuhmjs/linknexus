/**
 * Lightens a color by a specified amount.
 * @param color The HEX color to lighten.
 * @param amount The amount to lighten the color by.
 * @returns A HEX color that is lighter than the original color.
 */
export default function lighten(color: string, amount: number) {
    const clamp = (val: number) => Math.min(Math.max(val, 0), 255);
    const fill = (str: string) => str.padStart(2, '0');
  
    const red = clamp(parseInt(color.slice(1, 3), 16) + amount);
    const green = clamp(parseInt(color.slice(3, 5), 16) + amount);
    const blue = clamp(parseInt(color.slice(5, 7), 16) + amount);
    return `#${fill(red.toString(16))}${fill(green.toString(16))}${fill(blue.toString(16))}`;
  }
  