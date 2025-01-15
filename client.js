// ============= client.js =============
/**
 * Simple RPC Client Implementation for Factorial Calculation
 * 
 * This client:
 * 1. Connects to the factorial server
 * 2. Sends a number
 * 3. Receives and displays the factorial result
 * 4. Handles errors and connection issues
 */

const net = require('net');

class FactorialClient {
    constructor(host = 'localhost', port = 3000) {
        this.host = host;
        this.port = port;
        this.client = new net.Socket();
        this.setupEventHandlers();
    }

    /**
     * Set up event handlers for the client
     */
    setupEventHandlers() {
        // Handle server responses
        this.client.on('data', (data) => {
            console.log(`\nServer Response: ${data}`);
            this.client.end(); // Close connection after receiving response
        });

        // Handle connection close
        this.client.on('close', () => {
            console.log('Connection closed');
        });

        // Handle errors
        this.client.on('error', (error) => {
            console.error('Connection error:', error.message);
        });
    }

    /**
     * Calculate factorial for a given number
     * @param {number} number - Number to calculate factorial for
     */
    calculateFactorial(number) {
        // Connect to server
        this.client.connect(this.port, this.host, () => {
            console.log(`Connected to server at ${this.host}:${this.port}`);
            console.log(`Requesting factorial calculation for: ${number}`);
            
            // Send number to server
            this.client.write(number.toString());
        });
    }
}

// Example usage
function main() {
    const client = new FactorialClient();
    
    // Get number from command line argument or use default
    const number = process.argv[2] ? parseInt(process.argv[2]) : 4;
    
    // Calculate factorial
    client.calculateFactorial(number);
}

// Run the client
main();