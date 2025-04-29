/**
 * Determines if the application is running in a production environment.
 *
 * @return {boolean} Returns true if the application is running in production, otherwise false.
 */
export function isProduction(): boolean {
  return import.meta.env.PROD
}
