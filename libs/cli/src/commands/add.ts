import { Command } from "commander";

export function add() {
    const program = new Command();
    program.command("add")
        .description("Add a new component to the project")
        .option("-n, --name <name>", "Component name")
        .option("-f, --force", "Force add the component")
        .action((options) => {
            console.log("Adding component with options:", options);
        }
        );
    return program;
}