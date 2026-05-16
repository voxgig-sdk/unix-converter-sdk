
import { Context } from './Context'


class UnixConverterError extends Error {

  isUnixConverterError = true

  sdk = 'UnixConverter'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UnixConverterError
}

