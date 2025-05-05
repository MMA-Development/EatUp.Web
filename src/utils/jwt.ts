/**
 * Decodes the payload of a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT string from which the payload will be extracted and decoded.
 * @return {Object} The decoded payload as a JavaScript object.
 */
export function decodeJwtPayload(token: string): {
  nameid: string
  unique_name: string
  role: string
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
} {
  const payloadBase64 = token.split('.')[1]
  const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(decodeURIComponent(escape(payloadJson)))
}
