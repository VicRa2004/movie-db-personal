import { hash, verify } from '@node-rs/argon2'
import type { Options } from '@node-rs/argon2'

const HASH_OPTIONS: Options = {
  memoryCost: 19456, // 19 MiB
  timeCost: 2, // 2 iteraciones
  outputLen: 32,
  parallelism: 1,
}

export const hashPassword = async (password: string) => {
  return await hash(password, HASH_OPTIONS)
}

export const verifyPassword = async (
  passwordPlain: string,
  passwordHash: string,
) => {
  return await verify(passwordHash, passwordPlain)
}
