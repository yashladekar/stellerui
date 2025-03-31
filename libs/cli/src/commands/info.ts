import { Command } from "commander";

export function add() {
    const program = new Command();
    program.command("info, -i, --info")
        .description("show information about the ui library project")
        .option("-v, --version", "show version information")
        .option("-h, --help", "show help information")
        .action((options) => {
            if (options.version) {
                console.log("Version: 1.0.0");
            }
            if (options.license) {
                console.log("License: MIT");
            }
            if (options.help) {
                console.log("Help: This is a ui library project.");
            }
        });

    return program;
}