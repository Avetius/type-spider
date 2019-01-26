/* tslint:disable:variable-name*/
import * as cronParse from "cron-parser";
import { round, toString, toNumber } from "lodash";
import { isDate } from "util";
import * as GeoIp from "geoip-lite";

export function CleanObject(obj) {
    delete obj.user;
    for (let propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}


export function IpLookup(ip: string) {
    return GeoIp.lookup(ip);
}

export function calculateAge(date: Date): number {
    return isDate(date) ? round((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 365), 0) : 0;
}

export function prepareIp(ip: string): string {
    const resIp = toString(ip);
    return resIp.replace("::ffff:", "");
}
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const NormalizeOffset = (offset?: number) => (offset === undefined || toNumber(offset) < 0) ? 0 : offset;
export const NormalizeLimit = (limit?: number) => (limit === undefined || toNumber(limit) < 0) ? 10 : limit > 100 ? 100 : limit;
export const NormalizePage = (page?: number) => (page === undefined || toNumber(page) < 0) ? 0 : page;
export function isCron(cronString: string): boolean {
    const validator = cronParse.parseString(cronString);
    if (!validator.errors) {
        return true;
    }
    return false;
}

export function similarity(s1: string, s2: string) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}