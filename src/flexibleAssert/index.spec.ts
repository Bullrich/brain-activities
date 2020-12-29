import Assert, { AssertionFailed } from './index';
import { expect } from 'chai';

describe('Test executes', () => {
    const returnError = (assertion: Function): AssertionFailed => {
        let error: Error;
        try {
            assertion();
            error = new Error('Assert never failed');
        } catch (e) {
            if (e instanceof AssertionFailed) {
                return e;
            }
            error = new Error('Error was not of type AssertionFailed');
        }
        throw error;
    };


    describe('Ok evaluation', () => {
        describe('Evaluation of error parameters', () => {
            it('Should return undefined data on lack of error parameters', () => {
                const error = returnError(() => Assert.ok(null));
                expect(error.details).to.be.undefined;
            });

            it('Should return string message', () => {
                const errorMsg = 'Object is null';
                const error = returnError(() => Assert.ok(null, errorMsg));
                expect(error.message).to.be.equal(errorMsg);
            });

            it('Should throw given error', () => {
                const throwErr = new Error('Invalid message');
                let error: Error = null;
                try {
                    Assert.ok(null, throwErr);
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });

            it('Should provide details from tuple', () => {
                const errorData: [string, string] = ['This is the error', 'This is the detail'];
                const error = returnError(() => Assert.ok(null, errorData));
                expect(error.message).to.be.equal(errorData[0]);
                expect(error.details).to.be.equal(errorData[1]);
            });

            it('Should throw error from factory', () => {
                const throwErr = new Error('Invalid message');
                let error: Error = null;
                try {
                    Assert.ok(null, () => throwErr);
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });


            it('Should have error caused from factory', () => {
                const throwErr = new Error('This error was thrown');
                let error: Error = null;
                try {
                    Assert.ok(null, () => {
                        throw throwErr;
                    });
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });
        });

        describe('Evaluation of assertion', () => {
            it('Should work with numbers', () => {
                Assert.ok(1);
                const error = returnError(() => Assert.ok(0));
                expect(error).to.not.be.null;
            });

            it('Should work with string', () => {
                Assert.ok('random message');
                const error = returnError(() => Assert.ok(''));
                expect(error).to.not.be.null;
            });

            it('Should work with null and undefined', () => {
                const nullError = returnError(() => Assert.ok(undefined));
                expect(nullError).to.not.be.null;
                const undefinedError = returnError(() => Assert.ok(undefined));
                expect(undefinedError).to.not.be.null;
            });
        });

    });

    describe('Equals evaluation', () => {
        describe('Evaluation of assertion', () => {
            it('Should work with numbers', () => {
                Assert.equal(1, 1);
                const error = returnError(() => Assert.equal(0, 3));
                expect(error).to.not.be.null;
            });

            it('Should work with string', () => {
                Assert.equal('random message', 'random message');
                const error = returnError(() => Assert.equal('rando', 'random'));
                expect(error).to.not.be.null;
            });

            it('Should fail with wrong types', () => {
                const error = returnError(() => Assert.strictEqual('0', 0));
                expect(error).to.not.be.null;
            });

            it('Should work on equal arrays', () => {
                const array1 = [1, 2, 3];
                const array2 = [1, 2, 3];
                Assert.equal(array1, array2);
                const error = returnError(() => Assert.strictEqual(array1, array2));
                expect(error).to.not.be.null;
            });

            it('Should fail on distinct arrays', () => {
                const array1 = [1, 2, 3];
                const array2 = [3, 2, 1];
                const error = returnError(() => Assert.equal(array1, array2));
                expect(error).to.not.be.null;
                const strictError = returnError(() => Assert.equal(array1, array2));
                expect(strictError).to.not.be.null;
            });


            it('Should work on equal objects', () => {
                const obj1 = { name: 'John', age: 12 };
                const obj2 = { name: 'John', age: 12 };
                Assert.equal(obj1, obj2);
                const error = returnError(() => Assert.strictEqual(obj1, obj2));
                expect(error).to.not.be.null;
            });

            it('Should fail on distinct objects', () => {
                const obj1 = { name: 'John', age: 12 };
                const obj2 = { name: 'Javier', age: 27 };
                const error = returnError(() => Assert.equal(obj1, obj2));
                expect(error).to.not.be.null;
                const strictError = returnError(() => Assert.equal(obj1, obj2));
                expect(strictError).to.not.be.null;
            });

            it('Should fail on object and null', () => {
                const obj1 = { name: 'John', age: 12 };
                const error = returnError(() => Assert.equal(obj1, null));
                expect(error).to.not.be.null;
                const strictError = returnError(() => Assert.equal(obj1, null));
                expect(strictError).to.not.be.null;
            });
        });

        describe('Evaluation of error parameters', () => {
            it('Should return undefined data on lack of error parameters', () => {
                const error = returnError(() => Assert.equal(null, 2));
                expect(error.details).to.be.undefined;
            });

            it('Should return string message', () => {
                const errorMsg = 'Object is null';
                const error = returnError(() => Assert.equal(null, 2, errorMsg));
                expect(error.message).to.be.equal(errorMsg);
            });

            it('Should throw given error', () => {
                const throwErr = new Error('Invalid message');
                let error: Error = null;
                try {
                    Assert.equal(null, 2, throwErr);
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });

            it('Should provide details from tuple', () => {
                const errorData: [string, string] = ['This is the error', 'This is the detail'];
                const error = returnError(() => Assert.equal(2, 6, errorData));
                expect(error.message).to.be.equal(errorData[0]);
                expect(error.details).to.be.equal(errorData[1]);
            });

            it('Should throw error from factory', () => {
                const throwErr = new Error('Invalid message');
                let error: Error = null;
                try {
                    Assert.equal(null, 2, () => throwErr);
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });

            it('Should have error caused from factory', () => {
                const throwErr = new Error('This error has been thrown');
                let error: Error = null;
                try {
                    Assert.equal(null, 2, () => {
                        throw throwErr;
                    });
                    expect.fail('Should fail before');
                } catch (e) {
                    error = e;
                }
                expect(error).to.be.equal(throwErr);
            });
        });
    });
});

