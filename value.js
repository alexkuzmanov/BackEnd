    // Define your target URL
const url = "https://alexaps.up.railway.app/"; // Replace with your URL

// Create a request to fetch the page content
let req = new Request(url);

// Set a timeout limit in milliseconds (e.g., 30 seconds)
const timeout = 30000;

async function fetchData() {
  const startTime = Date.now();
  
  // Start by loading the page content
  let html = await req.loadString();

  // Continue checking until the timeout is reached
  while (!html.includes("<span class=\"currentBG\">")) {
    const elapsedTime = Date.now() - startTime;
    
    // If we've exceeded the timeout, stop
    if (elapsedTime > timeout) {
      console.log("Timed out waiting for content.");
      return;
    }

    // Wait briefly before trying again (1 second delay)
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    html = await req.loadString(); // Try fetching again
  }

  // Once content is found, extract the data
  const regex = /<span class="currentBG">(.*?)<\/span>/;
  const match = html.match(regex);

  if (match && match[1]) {
    console.log("Found content:", match[1]);
    
    // Add delay after extracting content (example: 2 seconds delay)
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for 2 seconds
    console.log("Finished processing after delay.");
  } else {
    console.log("Content not found in the expected place.");
  }
}

fetchData();
