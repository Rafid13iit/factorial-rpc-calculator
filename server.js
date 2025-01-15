// ============= server.js =============
/**
 * Simple RPC Server Implementation for Factorial Calculation
 * 
 * This server:
 * 1. Creates a TCP server using Node.js net module
 * 2. Listens for client connections
 * 3. Receives numbers from clients
 * 4. Calculates factorial
 * 5. Returns the result to the client
 */

const net = require('net');

/**
 * Calculates the factorial of a given number recursively
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial result
 */
function calculateFactorial(n) {
    // Base cases: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) return 1;
    
    // Recursive case: n! = n * (n-1)!
    return n * calculateFactorial(n - 1);
}

// Create TCP server
const server = net.createServer((socket) => {
    // Log when a client connects
    console.log('Client connected from:', socket.remoteAddress);

    // Handle incoming data from client
    socket.on('data', (data) => {
        console.log('Received request for factorial calculation');
        
        // Convert received data to number
        const number = parseInt(data.toString());
        
        // Validate input
        if (isNaN(number)) {
            socket.write('Error: Please send a valid number');
            return;
        }
        if (number < 0) {
            socket.write('Error: Please send a non-negative number');
            return;
        }
        if (number > 170) {
            socket.write('Error: Number too large, will cause overflow');
            return;
        }

        // Calculate factorial and send result
        try {
            const result = calculateFactorial(number);
            console.log(`Calculated factorial(${number}) = ${result}`);
            socket.write(result.toString());
        } catch (error) {
            socket.write('Error: Calculation failed');
            console.error('Calculation error:', error);
        }
    });

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Client disconnected');
    });

    // Handle connection errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

// Configuration
const PORT = 3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Start server
server.listen(PORT, HOST, () => {
    console.log(`\nFactorial RPC Server running at ${HOST}:${PORT}`);
    console.log('Waiting for client connections...\n');
});