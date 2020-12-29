export type AssertTypeError = string | Error | [string, string]


export class AssertionFailed extends Error {
    public constructor(message?: string, public readonly details?: string) {
        super(message);
    }
}

/**
 * Class which contains the logic to do assertion on objects or pairs.
 */
export default class Assert {
    /**
     * Lossy equal comparison
     * In the case of primitives, it fails only if the values differ (1 is equal to "1")
     * In the case of objects, it does a deep comparison
     * @param actual - Current value
     * @param expected - Expected value
     * @param errorParameter - Optional custom error or message to have on fail
     */
    public static equal(actual: any, expected: any, errorParameter?: AssertTypeError): void {
        if (typeof actual === 'object' && deepCompare(actual, expected)) {
            return;
        } else if (actual == expected) {
            return;
        }

        throw this.generateError(errorParameter);
    }


    /**
     * Strict equal comparison.
     * In the case of primitives, it fails if the type or value differs (1 is not equal to "1")
     * In the case of objects it fails if the reference is not the same
     * @param actual - Current value
     * @param expected - Expected value
     * @param errorParameter - Optional custom error or message to have on fail
     */
    public static strictEqual(actual: any, expected: any, errorParameter?: AssertTypeError): void {
       if (actual === expected) {
            return;
        }

        throw this.generateError(errorParameter);
    }

    /**
     * Verifies that a value is valid
     *
     * Failure condition happens with null and undefined value, numbers which are equal or lower to 0, empty string and false parameters
     * @param value - The parameter to evaluate
     * @param errorParameter - Optional custom error or message to show on fail
     */
    public static ok(value: any, errorParameter?: AssertTypeError): void {
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

    private static generateError(errorParameter?: AssertTypeError): Error {
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
        if (typeof value === 'number') {
            return value > 0;
        }
        if (typeof value === 'string') {
            return value.length > 0;
        }
        if (typeof value === 'boolean') {
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