import { Command } from "commander"
import { init } from "@lib/cli/src/commands/init"

process.on("SIGNINT", () => {
    console.log("Exiting...")
    process.exit(0)
})
process.on("SIGTERM", () => {
    console.log("Exiting...")
    process.exit(0)
})

async function main() {
    const program = new Command();
    program
        .name("cli")
        .description("CLI for managing projects")
        .version("0.1.0")
}

main()

