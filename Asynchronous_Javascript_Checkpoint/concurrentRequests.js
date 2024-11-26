async function concurrentRequests() {
    const fakeApi1 = fakeApiCall();
    const fakeApi2 = fakeApiCall();
    
    try {
        const [response1, response2] = await Promise.all([fakeApi1, fakeApi2]);
        console.log('API 1 Response:', response1);
        console.log('API 2 Response:', response2);
    } catch (error) {
        console.error('One of the API calls failed:', error.message);
    }
}

// Simulate a fake API call for awaitCall function
function fakeApiCall() {
    return new Promise((resolve, reject) => {
        // Simulate a successful API call 70% of the time
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve({ data: 'Sample data' });
            } else {
                reject(new Error('API call failed'));
            }
        }, 2000);
    });
}
concurrentRequests();