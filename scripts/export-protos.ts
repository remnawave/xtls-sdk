/* eslint-disable no-console */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tar from 'tar';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const VERSION = '25.12.8';
const TEMP_DIR = path.join(__dirname, 'temp-xray-core');
const TARGET_URL = `https://github.com/XTLS/Xray-core/archive/refs/tags/v${VERSION}.tar.gz`;

const PROTO_DIR = path.join(__dirname, '../src/xray-protos');

const execAsync = promisify(exec);

async function downloadTarGz(url: string, dest: string) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`);

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, new Uint8Array(buffer));
    console.log(`Core extracted to ${dest}`);
}

async function extractProtoFiles(tarPath: string) {
    await tar.x({
        file: tarPath,
        cwd: TEMP_DIR,
        strip: 1,
    });
    console.log('Core extracted');

    const protoFiles = findProtoFiles(TEMP_DIR);

    return protoFiles;
}

function findProtoFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findProtoFiles(filePath, fileList);
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath);
        }
    }

    return fileList;
}

async function generateTsFromProto(protoFile: string): Promise<void> {
    try {
        console.log(protoFile);

        const dir = path.join(__dirname, '../src/xray-protos');

        const command = [
            'protoc',
            `--plugin=./node_modules/.bin/protoc-gen-ts_proto`,
            `--ts_proto_out=${dir}`,
            `--ts_proto_opt=outputServices=generic-definitions,useExactTypes=false`,
            `--ts_proto_opt=outputServices=nice-grpc`,

            `--ts_proto_opt=outputTypeRegistry=true`,
            `--ts_proto_opt=outputEncodeMethods=true`,
            `--ts_proto_opt=outputJsonMethods=true`,
            `--ts_proto_opt=lowerCaseServiceMethods=true`,
            `--proto_path=${path.join(__dirname, '../scripts/temp-xray-core')}`,
            protoFile,
        ].join(' ');

        console.log(`Generating TypeScript for: ${protoFile}`);
        const { stdout, stderr } = await execAsync(command);

        if (stderr) {
            console.error(`Error for ${protoFile}:`, stderr);
        }
        if (stdout) {
            console.log(`Output for ${protoFile}:`, stdout);
        }
    } catch (error) {
        console.error(`Failed to generate TypeScript for ${protoFile}:`, error);
    }
}

async function main() {
    try {
        if (!fs.existsSync(TEMP_DIR)) {
            fs.mkdirSync(TEMP_DIR);
        }

        if (!fs.existsSync(PROTO_DIR)) {
            fs.mkdirSync(PROTO_DIR, { recursive: true });
        }

        const tarPath = path.join(TEMP_DIR, `xray-core-${VERSION}.tar.gz`);

        await downloadTarGz(TARGET_URL, tarPath);
        const protoFiles = await extractProtoFiles(tarPath);

        for (const protoFile of protoFiles) {
            await generateTsFromProto(protoFile);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        console.log('Temp directory removed');
    }
}

main();
