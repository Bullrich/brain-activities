import Assert, { AssertionFailed } from './index';
import { expect } from 'chai';

describe('Test executes', () => {

    const returnError = (assertion: Function): AssertionFailed => {
        try {
            assertion();
        } catch (e) {
            if (e instanceof AssertionFailed) {
                return e;
            }
        }
        throw new Error('Invalid type');
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
                try {
                    Assert.ok(null, throwErr);
                    expect.fail('Should fail before');
                } catch (e) {
                    expect(e).to.be.equal(throwErr);
                }
            });

            it('Should provide details from tuple', () => {
                const errorData: [string, string] = ['This is the error', 'This is the detail'];
                const error = returnError(() => Assert.ok(null, errorData));
                expect(error.message).to.be.equal(errorData[0]);
                expect(error.details).to.be.equal(errorData[1]);
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
});

