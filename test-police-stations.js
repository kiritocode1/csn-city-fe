// Test script to verify police station API endpoints
const BACKEND_URL = "https://csn.dreamcaredevelopers.com";

async function testPoliceStationAPIs() {
	console.log("Testing Police Station APIs...\n");
	console.log(`Backend URL: ${BACKEND_URL}\n`);

	try {
		// Test 0: Check if backend is accessible
		console.log("0. Testing backend connectivity...");
		const healthResponse = await fetch(`${BACKEND_URL}/api/get-stations`);
		if (!healthResponse.ok) {
			throw new Error(`Backend not accessible: ${healthResponse.status} ${healthResponse.statusText}`);
		}
		console.log("✅ Backend is accessible");

		// Test 1: Get stations for dropdown
		console.log("\n1. Testing stations dropdown endpoint...");
		const dropdownResponse = await fetch(`${BACKEND_URL}/api/stations-dropdown`);
		if (!dropdownResponse.ok) {
			throw new Error(`Dropdown endpoint failed: ${dropdownResponse.status} ${dropdownResponse.statusText}`);
		}
		const dropdownData = await dropdownResponse.json();

		if (dropdownData.success && Array.isArray(dropdownData.stations)) {
			console.log("✅ Dropdown endpoint working");
			console.log(`   Found ${dropdownData.stations.length} stations`);
			if (dropdownData.stations.length > 0) {
				console.log(`   First station: ${dropdownData.stations[0].name}`);
				console.log(`   Station ID: ${dropdownData.stations[0]._id}`);
			}
		} else {
			console.log("❌ Dropdown endpoint failed");
			console.log("   Response:", dropdownData);
		}

		// Test 2: Get individual station details (if we have stations)
		if (dropdownData.success && dropdownData.stations.length > 0) {
			const firstStationId = dropdownData.stations[0]._id;
			console.log(`\n2. Testing individual station details for ID: ${firstStationId}...`);

			const stationResponse = await fetch(`${BACKEND_URL}/api/station-detail?id=${firstStationId}`);
			const stationData = await stationResponse.json();

			if (stationData.success && stationData.station) {
				console.log("✅ Station details endpoint working");
				console.log(`   Station name: ${stationData.station.name}`);
				console.log(`   Station address: ${stationData.station.address}`);
				console.log(`   Contact: ${stationData.station.contact_no || "N/A"}`);
			} else {
				console.log("❌ Station details endpoint failed");
				console.log("   Response:", stationData);
			}
		}

		// Test 3: Test existing stations endpoint
		console.log("\n3. Testing existing stations endpoint...");
		const stationsResponse = await fetch(`${BACKEND_URL}/api/get-stations`);
		const stationsData = await stationsResponse.json();

		if (stationsData.stations && Array.isArray(stationsData.stations)) {
			console.log("✅ Existing stations endpoint working");
			console.log(`   Found ${stationsData.stations.length} stations`);
		} else {
			console.log("❌ Existing stations endpoint failed");
			console.log("   Response:", stationsData);
		}
	} catch (error) {
		console.error("❌ Error testing APIs:", error.message);
	}
}

// Run the test
testPoliceStationAPIs();
