import ansis from 'ansis'

export const log = {
  info: (msg: string): void => console.log(ansis.cyan(msg)),
  warn: (msg: string): void => console.warn(ansis.yellow(msg)),
  error: (msg: string): void => console.error(ansis.red(msg)),
}
