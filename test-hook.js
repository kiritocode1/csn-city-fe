// Simple test to verify the hook logic works with existing API
const BACKEND_URL = "https://csn.dreamcaredevelopers.com";

async function testHookLogic() {
	console.log("Testing hook logic with existing API...\n");

	try {
		// Test the existing endpoint
		const response = await fetch(`${BACKEND_URL}/api/get-stations`);
		
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}
		
		const data = await response.json();
		console.log("✅ API Response received");
		console.log(`   Response keys: ${Object.keys(data).join(', ')}`);
		
		// Test the transformation logic
		if (Array.isArray(data.stations)) {
			console.log(`✅ Found ${data.stations.length} stations`);
			
			// Transform the first station to test the logic
			const firstStation = data.stations[0];
			const transformedStation = {
				_id: firstStation._id,
				name: firstStation.name,
				name_in_marathi: firstStation.name_in_marathi,
				address: firstStation.address || '',
				address_in_marathi: firstStation.address_in_marathi || '',
				contact_no: firstStation.contact_no || '',
				email: firstStation.email || '',
				zone: firstStation.zone || null,
				division: firstStation.division || null,
			};
			
			console.log("✅ Station transformation successful");
			console.log(`   First station: ${transformedStation.name}`);
			console.log(`   Station ID: ${transformedStation._id}`);
			console.log(`   Has address: ${transformedStation.address ? 'Yes' : 'No'}`);
			console.log(`   Has contact: ${transformedStation.contact_no ? 'Yes' : 'No'}`);
			
		} else {
			console.log("❌ Invalid data format - stations is not an array");
		}
		
	} catch (error) {
		console.error("❌ Error:", error.message);
	}
}

testHookLogic();


