function get(url) {
    const lib = url.startsWith('https') ? require('https') : require('http');

    return new Promise((resolve, reject) => {
        function handleResponse(response) {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            let body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        }
        
        let request = lib.get(url, handleResponse);

        request.on('error', (err) => reject(err))
    })
}

module.exports = { get };

