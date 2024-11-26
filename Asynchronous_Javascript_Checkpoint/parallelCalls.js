const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];
async function parallelCalls(urls) {
    try {
        // Map each URL to a fetch request and store the promises in an array
        const fetchPromises = urls.map(url => fetch(url));

        // Use Promise.all() to wait for all the fetch requests to complete
        const responses = await Promise.all(fetchPromises);

        // Map over the responses to extract the JSON data from each one
        const dataPromises = responses.map(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${response.url}: ${response.statusText}`);
            }
            return response.json();
        });

        // Wait for all the data promises to resolve
        const data = await Promise.all(dataPromises);

        // Log the fetched data
        console.log(data);
    } catch (error) {
        // Handle any errors that occur during the fetch process
        console.error('Error during parallel fetch operation:', error);
    }
}
parallelCalls(urls);