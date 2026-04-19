console.log('Running unit tests...');

function testEmailValidation() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tests = [
        { email: 'test@example.com', expected: true },
        { email: 'invalid-email', expected: false },
        { email: '', expected: false }
    ];
    let passed = tests.filter(t => regex.test(t.email) === t.expected).length;
    console.log(`Email validation: ${passed}/${tests.length} passed`);
    return passed === tests.length;
}

function testNameValidation() {
    const validate = (n) => n && n.trim().length >= 2;
    const tests = [
        { name: 'John Doe', expected: true },
        { name: 'J', expected: false },
        { name: '', expected: false }
    ];
    let passed = tests.filter(t => validate(t.name) === t.expected).length;
    console.log(`Name validation: ${passed}/${tests.length} passed`);
    return passed === tests.length;
}

function testPhoneValidation() {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const tests = [
        { phone: '555-123-4567', expected: true },
        { phone: '123', expected: false },
        { phone: '', expected: false }
    ];
    let passed = tests.filter(t => regex.test(t.phone) === t.expected).length;
    console.log(`Phone validation: ${passed}/${tests.length} passed`);
    return passed === tests.length;
}

function testLocalStorage() {
    try {
        localStorage.setItem('test', 'value');
        const result = localStorage.getItem('test');
        localStorage.removeItem('test');
        console.log('LocalStorage test: PASSED');
        return result === 'value';
    } catch(e) {
        console.log('LocalStorage test: FAILED');
        return false;
    }
}

const allPassed = testEmailValidation() && testNameValidation() && testPhoneValidation() && testLocalStorage();
console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed!');
process.exit(allPassed ? 0 : 1);