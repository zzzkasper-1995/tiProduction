declare module "input" {
  /**
   * Prompts the user for text input.
   * @param message The message to display to the user.
   * @return A promise that resolves to the user's input as a string.
   */
  export function text(message: string): Promise<string>;
}
