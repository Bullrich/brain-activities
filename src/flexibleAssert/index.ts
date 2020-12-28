export type AssertTypeError = string | Error | [string, string]


export class AssertionFailed extends Error {
    public constructor(message?: string, public readonly details?: string) {
        super(message);
    }
}

export default class Assert {
    public static assertEqual<T extends AssertTypeError>(actual: any, expected: any, errorParameter?: T): void {
        if (actual !== expected) {
            throw this.generateError(errorParameter);
        } else if (!deepCompare(actual, expected)) {
            throw this.generateError(errorParameter);
        }
    }

    public static ok<T extends AssertTypeError>(value: any, errorParameter?: T): void {
        const valueType = typeof value;
        if (valueType === 'number' || valueType === 'string' || valueType === 'boolean') {
            if (this.isBasicValueOk(value)) {
                return;
            }
        } else if (value !== null && value !== undefined) {
            return;
        }


        throw this.generateError(errorParameter);
    }

    private static generateError<T extends AssertTypeError>(errorParameter?: T): Error {
        if (errorParameter) {
            if (errorParameter instanceof Error) {
                return errorParameter;
            }
            if (typeof errorParameter === 'string')
                return new AssertionFailed(errorParameter);
            // Check if it's a tuple
            if (errorParameter instanceof Array) {
                return new AssertionFailed(errorParameter[0], errorParameter[1]);
            }
        }
        return new AssertionFailed();
    }

    private static isBasicValueOk(value: any): boolean {
        if (typeof value === "number") {
            return value > 0;
        }
        if (typeof value === "string") {
            return value.length > 0;
        }
        if (typeof value === "boolean") {
            return value === true;
        }

        return false;
    }
}

const deepCompare = function(obj1: any, obj2: any): boolean {
    for (const i in obj1) {
        if (obj1.hasOwnProperty(i)) {
            if (!obj2.hasOwnProperty(i)) {
                return false;
            } else if (obj1[i] != obj2[i]) {
                return false;
            }
        }
    }

    for (const j in obj2) {
        if (obj2.hasOwnProperty(j)) {
            if (!obj1.hasOwnProperty(j)) {
                return false;
            } else if (obj1[j] != obj2[j]) {
                return false;
            }
        }
    }
    return true;
};
