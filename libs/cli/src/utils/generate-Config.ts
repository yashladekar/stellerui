import fs from 'node:fs';
import path from "node:path";
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

// import dotenv from 'dotenv';
import { promisify } from 'node:util';
import chalk from 'chalk';
import { createRequire } from 'node:module';
const fileURLToPath = process.env.NODE_ENV === 'test'

export const generateConfigJson = async (response: object) => {
    const __dirname = path.dirname();
    const __filename = fileURLToPath
    fs.mkdirSync(path.join(__dirname, 'config'), { recursive: true });


}

