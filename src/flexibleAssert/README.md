## Flexible assert

`assert` functions and statements are so omnipresent in almost all programming languages in the last couple of decades, it's almost ironic JavaScript/TypeScript not having it built-in. But it's very easy to implement one. Usually, they receive a condition to test as first parameter, and an optional error to throw as second parameter.

We don't want to throw strings (bad practice), so we wanna wrap them with our custom `AssertionFailed` error class. But we may want to be more descriptive and provide some more `details` as a second parameter to such class. We don't want to construct these parameters every time an assertion is run, these can be expensive to fetch and would be needed only if the assertion failed. Uff, there's a lot of cases...

Your task is to write an `assert` function/guard, which can receive the error parameter in multiple ways:
- an error string, to be fed to our custom class constructor
- an error instance, to be thrown directly
- a tuple containing the error message and the details to be passed to our default error constructor
- a factory function for the error; this factory can:
    - return the error to be thrown
    - throw the error directly

All of these cases should be properly typed. You may choose do this with overloads, but the implementation should be as strictly typed as possible in itself too.
