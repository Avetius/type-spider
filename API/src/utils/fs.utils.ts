import { existsSync, readFileSync, readdirSync, lstatSync } from "fs";
import { resolve, join } from 'path';

export const ResolvePath = (...args: string[]) => resolve(...args);

/**
 * Sync Resolves and returns file as a buffer if file exists in a provided path or throws non-exists error
 * 
 * @export
 * @param {string} args 
 * @returns {Buffer}
 */
export const ResolveFile = (...args: string[]): Buffer => {
    const _path = ResolvePath(...args);
    if (existsSync(_path)) return readFileSync(_path, {});
    throw new Error(`File at ${_path} does not exist or can't be read`);
};

/**
 * Sync Recursively (in subdirectories) searches for files in provided directory
 * 
 * @export
 * @param {string} startPath 
 * @param {string} filter 
 * @returns {string[]} 
 */
export const FindFilesSync = (startPath: string, filter: string): string[] => {
    const fileList: string[] = [];
    const recurse = (startPath: string, filter: string) => {
        readdirSync(startPath).map((file) => {
            const filename: string = join(startPath, file);
            const stat = lstatSync(filename);
            if (stat.isDirectory()) recurse(filename, filter);
            else if (filename.includes(filter)) fileList.push(filename);
        });
    };
    recurse(startPath, filter);
    return fileList;
};