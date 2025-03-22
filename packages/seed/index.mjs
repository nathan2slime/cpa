import { manager } from './manager.mjs'

const commands = [manager]

const main = async () => await Promise.all(commands.map(async seed => seed()))

main().finally(() => process.exit(0))
