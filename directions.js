document.getElementById('getDirectionsBtn').addEventListener('click', async () => {
    const startAddress = document.getElementById('start').value;
    const destinationAddress = document.getElementById('destination').value;

    try {
        // Geocode both start and destination addresses to get coordinates
        const startCoordinates = await geocodeAddress(startAddress);
        const destinationCoordinates = await geocodeAddress(destinationAddress);

        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?start=${startCoordinates.lng},${startCoordinates.lat}&end=${destinationCoordinates.lng},${destinationCoordinates.lat}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 5b3ce3597851110001cf624884ecce8270a54fec803834c3d64bb00f'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayDirections(data);

    } catch (error) {
        console.error('Error fetching directions:', error);
        document.getElementById('directionsResult').innerText = 'Error fetching directions. Please try again.';
    }
});

// Function to geocode an address to coordinates
async function geocodeAddress(address) {
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(address)}&api_key=5b3ce3597851110001cf624884ecce8270a54fec803834c3d64bb00f`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 5b3ce3597851110001cf624884ecce8270a54fec803834c3d64bb00f'
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Extract first result coordinates
    const firstResult = data.features[0].geometry.coordinates;
    return { lng: firstResult[0], lat: firstResult[1] };
}

// Function to convert meters to feet
function metersToFeet(meters) {
    return (meters * 3.28084).toFixed(2);
}

// Function to display directions on the page
function displayDirections(data) {
    const directionsContainer = document.getElementById('directionsResult');
    const steps = data.features[0].properties.segments[0].steps;

    // Calculate total travel time
    const totalDuration = steps.reduce((total, step) => total + step.duration, 0);
    const totalTravelTime = Math.round(totalDuration / 60); // Convert seconds to minutes

    const directionsHtml = steps.map(step => `
        <li>${step.instruction} (${metersToFeet(step.distance)} feet, ${Math.round(step.duration / 60)} minutes)</li>
    `).join('');
    
    directionsContainer.innerHTML = `<h2>Directions:</h2><ul>${directionsHtml}</ul><p><strong>Total Travel Time: ${totalTravelTime} minutes</strong></p>`;
}
