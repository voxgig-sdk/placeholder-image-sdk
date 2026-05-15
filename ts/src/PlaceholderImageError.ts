
import { Context } from './Context'


class PlaceholderImageError extends Error {

  isPlaceholderImageError = true

  sdk = 'PlaceholderImage'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PlaceholderImageError
}

