
// Mock document and window
const document = {
    elements: {
        'navbar': { style: {} },
        'nav-logo': { style: {} }
    },
    getElementById: function(id) {
        // Simulate DOM traversal cost
        for (let i = 0; i < 100; i++) {
             // Artificial delay to simulate real DOM work
        }
        return this.elements[id];
    }
};

const window = {
    scrollY: 100
};

// Original (Inefficient) Implementation
function scrollHandlerOriginal() {
    const nav = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');
    if (window.scrollY > 50) {
        nav.style.padding = '10px 5%';
        logo.style.height = '90px';
    } else {
        nav.style.padding = '15px 5%';
        logo.style.height = '120px';
    }
}

// Optimized Implementation
const nav = document.getElementById('navbar');
const logo = document.getElementById('nav-logo');

function scrollHandlerOptimized() {
    if (window.scrollY > 50) {
        nav.style.padding = '10px 5%';
        logo.style.height = '90px';
    } else {
        nav.style.padding = '15px 5%';
        logo.style.height = '120px';
    }
}

// Benchmark Function
function runBenchmark(name, fn, iterations) {
    const start = process.hrtime();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = process.hrtime(start);
    const timeInMs = (end[0] * 1000 + end[1] / 1e6).toFixed(3);
    console.log(`${name}: ${timeInMs} ms for ${iterations} iterations`);
    return parseFloat(timeInMs);
}

const ITERATIONS = 1000000;

console.log("Starting Benchmark...");
const timeOriginal = runBenchmark("Original", scrollHandlerOriginal, ITERATIONS);
const timeOptimized = runBenchmark("Optimized", scrollHandlerOptimized, ITERATIONS);

const improvement = ((timeOriginal - timeOptimized) / timeOriginal * 100).toFixed(2);
console.log(`\nPerformance Improvement: ${improvement}%`);
