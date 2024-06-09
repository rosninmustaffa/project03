const { validateUsername } = require('../script');

test('validates username correctly', () => {
    expect(validateUsername('validUser1')).toBe(true);
    expect(validateUsername('short')).toBe(false);
    expect(validateUsername('invalid user')).toBe(false);
    expect(validateUsername('user_with_special*')).toBe(false);
});

// Mock the document object
jest.mock('../script', () => {
    const originalModule = jest.requireActual('../script');
    return {
        ...originalModule,
        document: {
            getElementById: jest.fn(),
        },
    };
});
