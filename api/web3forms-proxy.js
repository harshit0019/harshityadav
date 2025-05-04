export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData = {
      ...req.body,
      access_key: process.env.WEB3FORMS_API_KEY || "384d8768-c52f-4a1c-89f1-db67130a68c8",
      site_url: process.env.SITE_URL || "https://harshityadav.com",
    };
    
    console.log("Forwarding to Web3Forms:", formData);
    
    // Forward the request to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData),
    });
    
    // Get response as text first for logging
    const responseText = await response.text();
    console.log("Web3Forms response:", responseText);
    
    // Parse the response if it's JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { success: false, message: responseText };
    }
    
    // Return Web3Forms response
    return res.status(response.status).json(responseData);
    
  } catch (error) {
    console.error("Web3Forms proxy error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to forward request to Web3Forms" 
    });
  }
}