# Factorial RPC Implementation

A simple RPC (Remote Procedure Call) implementation for calculating factorials using Node.js TCP sockets.

## Project Structure
```
factorial-rpc/
├── server.js       # RPC Server implementation
├── client.js       # RPC Client implementation
├── .gitignore      # git ignored files
├── package.json    # dependencies
└── README.md       # Project documentation
```

## Features
- Simple RPC implementation using TCP sockets
- Factorial calculation for non-negative integers
- Error handling for invalid inputs
- Logging for debugging
- Clean separation of client and server code

## How to Run

1. Start the server:
   ```bash
   node server.js
   ```

2. Run the client (in a different terminal):
   ```bash
   node client.js [number]
   ```
   Replace [number] with the number you want to calculate factorial for.
   Example: `node client.js 5`

## Error Handling
- Handles invalid inputs (non-numbers, negative numbers)
- Prevents stack overflow with large numbers
- Manages connection errors
- Graceful shutdown

## Implementation Details
- Uses Node.js built-in `net` module
- TCP-based communication
- Synchronous factorial calculation
- Simple text-based protocol