export interface PoliceOfficer {
	id: string;
	name: string;
	position: string;
	department?: string;
	rank: string;
	subordinates?: PoliceOfficer[];
	contact?: {
		phone?: string;
		email?: string;
	};
}

export const policeHierarchy: PoliceOfficer = {
	id: "1",
	name: "Commissioner of Police",
	position: "Commissioner of Police",
	department: "Chhatrapati Sambhaji Nagar Police",
	rank: "CP",
	contact: {
		phone: "+91-240-123-4000",
		email: "cp.csn@mahapolice.gov.in",
	},
	subordinates: [
		{
			id: "2",
			name: "DCP (ZONE - 1)",
			position: "Deputy Commissioner of Police",
			department: "Zone 1",
			rank: "DCP",
			contact: {
				phone: "+91-240-123-4001",
				email: "dcp.zone1@mahapolice.gov.in",
			},
			subordinates: [
				{
					id: "3",
					name: "ACP CHAWNI",
					position: "Assistant Commissioner of Police",
					department: "Chawni",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4002",
						email: "acp.chawni@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "4",
							name: "Chawni",
							position: "Police Station",
							department: "Chawni",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4003",
								email: "ps.chawni@mahapolice.gov.in",
							},
						},
						{
							id: "5",
							name: "Waluj",
							position: "Police Station",
							department: "Waluj",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4004",
								email: "ps.waluj@mahapolice.gov.in",
							},
						},
						{
							id: "6",
							name: "M Waluj",
							position: "Police Station",
							department: "M Waluj",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4005",
								email: "ps.mwaluj@mahapolice.gov.in",
							},
						},
						{
							id: "7",
							name: "Daultabad",
							position: "Police Station",
							department: "Daultabad",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4006",
								email: "ps.daultabad@mahapolice.gov.in",
							},
						},
					],
				},
				{
					id: "8",
					name: "ACP CITY",
					position: "Assistant Commissioner of Police",
					department: "City",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4007",
						email: "acp.city@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "9",
							name: "Citychwok",
							position: "Police Station",
							department: "Citychwok",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4008",
								email: "ps.citychwok@mahapolice.gov.in",
							},
						},
						{
							id: "10",
							name: "Krantichowk",
							position: "Police Station",
							department: "Krantichowk",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4009",
								email: "ps.krantichowk@mahapolice.gov.in",
							},
						},
						{
							id: "11",
							name: "Begampura",
							position: "Police Station",
							department: "Begampura",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4010",
								email: "ps.begampura@mahapolice.gov.in",
							},
						},
						{
							id: "12",
							name: "Vedantnagar",
							position: "Police Station",
							department: "Vedantnagar",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4011",
								email: "ps.vedantnagar@mahapolice.gov.in",
							},
						},
					],
				},
			],
		},
		{
			id: "13",
			name: "DCP (ZONE - 2)",
			position: "Deputy Commissioner of Police",
			department: "Zone 2",
			rank: "DCP",
			contact: {
				phone: "+91-240-123-4012",
				email: "dcp.zone2@mahapolice.gov.in",
			},
			subordinates: [
				{
					id: "14",
					name: "ACP CIDCO",
					position: "Assistant Commissioner of Police",
					department: "CIDCO",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4013",
						email: "acp.cidco@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "15",
							name: "Cidco",
							position: "Police Station",
							department: "Cidco",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4014",
								email: "ps.cidco@mahapolice.gov.in",
							},
						},
						{
							id: "16",
							name: "M Cidco",
							position: "Police Station",
							department: "M Cidco",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4015",
								email: "ps.mcidco@mahapolice.gov.in",
							},
						},
						{
							id: "17",
							name: "Harsul",
							position: "Police Station",
							department: "Harsul",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4016",
								email: "ps.harsul@mahapolice.gov.in",
							},
						},
						{
							id: "18",
							name: "Jincy",
							position: "Police Station",
							department: "Jincy",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4017",
								email: "ps.jincy@mahapolice.gov.in",
							},
						},
					],
				},
				{
					id: "19",
					name: "ACP OSMANPURA",
					position: "Assistant Commissioner of Police",
					department: "Osmanpura",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4018",
						email: "acp.osmanpura@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "20",
							name: "Osmanpura",
							position: "Police Station",
							department: "Osmanpura",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4019",
								email: "ps.osmanpura@mahapolice.gov.in",
							},
						},
						{
							id: "21",
							name: "Satara",
							position: "Police Station",
							department: "Satara",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4020",
								email: "ps.satara@mahapolice.gov.in",
							},
						},
						{
							id: "22",
							name: "Pundliknagar",
							position: "Police Station",
							department: "Pundliknagar",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4021",
								email: "ps.pundliknagar@mahapolice.gov.in",
							},
						},
						{
							id: "23",
							name: "Jawahrnagar",
							position: "Police Station",
							department: "Jawahrnagar",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4022",
								email: "ps.jawahrnagar@mahapolice.gov.in",
							},
						},
						{
							id: "24",
							name: "Mukundwadi",
							position: "Police Station",
							department: "Mukundwadi",
							rank: "PS",
							contact: {
								phone: "+91-240-123-4023",
								email: "ps.mukundwadi@mahapolice.gov.in",
							},
						},
					],
				},
			],
		},
		{
			id: "25",
			name: "DCP (CRIME)",
			position: "Deputy Commissioner of Police",
			department: "Crime",
			rank: "DCP",
			contact: {
				phone: "+91-240-123-4024",
				email: "dcp.crime@mahapolice.gov.in",
			},
			subordinates: [
				{
					id: "26",
					name: "ACP - Crime",
					position: "Assistant Commissioner of Police",
					department: "Crime",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4025",
						email: "acp.crime@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "27",
							name: "Crime branch",
							position: "Crime Branch",
							department: "Crime Investigation",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4026",
								email: "crime.branch@mahapolice.gov.in",
							},
						},
						{
							id: "28",
							name: "ANC",
							position: "Anti Narcotics Cell",
							department: "Narcotics Control",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4027",
								email: "anc@mahapolice.gov.in",
							},
						},
						{
							id: "29",
							name: "Cyber",
							position: "Cyber Crime Cell",
							department: "Cyber Security",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4028",
								email: "cyber@mahapolice.gov.in",
							},
						},
						{
							id: "30",
							name: "EOW",
							position: "Economic Offence Wing",
							department: "Economic Crimes",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4029",
								email: "eow@mahapolice.gov.in",
							},
						},
						{
							id: "31",
							name: "BDDS",
							position: "Bomb Detection & Disposal Squad",
							department: "Bomb Squad",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4030",
								email: "bdds@mahapolice.gov.in",
							},
						},
						{
							id: "32",
							name: "High court",
							position: "High Court Security",
							department: "Court Security",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4031",
								email: "highcourt@mahapolice.gov.in",
							},
						},
						{
							id: "33",
							name: "ATB",
							position: "Anti Terrorism Bureau",
							department: "Terrorism Prevention",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4032",
								email: "atb@mahapolice.gov.in",
							},
						},
						{
							id: "34",
							name: "Damini",
							position: "Damini Squad",
							department: "Women Safety",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4033",
								email: "damini@mahapolice.gov.in",
							},
						},
						{
							id: "35",
							name: "Bharosa",
							position: "Bharosa Cell",
							department: "Child Protection",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4034",
								email: "bharosa@mahapolice.gov.in",
							},
						},
						{
							id: "36",
							name: "CMC",
							position: "Crime Monitoring Cell",
							department: "Crime Analysis",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4035",
								email: "cmc@mahapolice.gov.in",
							},
						},
					],
				},
				{
					id: "37",
					name: "ACP - S.B (Special Branch)",
					position: "Assistant Commissioner of Police",
					department: "Special Branch",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4036",
						email: "acp.specialbranch@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "38",
							name: "SPECIAL BRANCH",
							position: "Special Branch",
							department: "Intelligence",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4037",
								email: "specialbranch@mahapolice.gov.in",
							},
						},
						{
							id: "39",
							name: "Passport",
							position: "Passport Verification",
							department: "Verification",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4038",
								email: "passport@mahapolice.gov.in",
							},
						},
						{
							id: "40",
							name: "Surksha",
							position: "Surksha Cell",
							department: "Security",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4039",
								email: "surksha@mahapolice.gov.in",
							},
						},
						{
							id: "41",
							name: "FRO",
							position: "Foreigners Registration Office",
							department: "Foreigners",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4040",
								email: "fro@mahapolice.gov.in",
							},
						},
					],
				},
			],
		},
		{
			id: "42",
			name: "DCP (HQ)",
			position: "Deputy Commissioner of Police",
			department: "Headquarters",
			rank: "DCP",
			contact: {
				phone: "+91-240-123-4041",
				email: "dcp.hq@mahapolice.gov.in",
			},
			subordinates: [
				{
					id: "43",
					name: "ACP - Admin",
					position: "Assistant Commissioner of Police",
					department: "Administration",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4042",
						email: "acp.admin@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "44",
							name: "Headquarter",
							position: "Headquarters",
							department: "Administration",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4043",
								email: "headquarter@mahapolice.gov.in",
							},
						},
						{
							id: "45",
							name: "Control room",
							position: "Control Room",
							department: "Operations",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4044",
								email: "controlroom@mahapolice.gov.in",
							},
						},
						{
							id: "46",
							name: "RCP/QRT",
							position: "Rapid Response Team",
							department: "Emergency Response",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4045",
								email: "rcp@mahapolice.gov.in",
							},
						},
						{
							id: "47",
							name: "Admin",
							position: "Administrative Branch",
							department: "Administration",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4046",
								email: "admin@mahapolice.gov.in",
							},
						},
						{
							id: "48",
							name: "CCC",
							position: "Citizen Call Center",
							department: "Public Relations",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4047",
								email: "ccc@mahapolice.gov.in",
							},
						},
					],
				},
				{
					id: "49",
					name: "ACP - TRAFFIC",
					position: "Assistant Commissioner of Police",
					department: "Traffic",
					rank: "ACP",
					contact: {
						phone: "+91-240-123-4048",
						email: "acp.traffic@mahapolice.gov.in",
					},
					subordinates: [
						{
							id: "50",
							name: "Chawni",
							position: "Traffic Division",
							department: "Chawni Traffic",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4049",
								email: "traffic.chawni@mahapolice.gov.in",
							},
						},
						{
							id: "51",
							name: "Waluj",
							position: "Traffic Division",
							department: "Waluj Traffic",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4050",
								email: "traffic.waluj@mahapolice.gov.in",
							},
						},
						{
							id: "52",
							name: "Cidco",
							position: "Traffic Division",
							department: "Cidco Traffic",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4051",
								email: "traffic.cidco@mahapolice.gov.in",
							},
						},
						{
							id: "53",
							name: "City 1",
							position: "Traffic Division",
							department: "City 1 Traffic",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4052",
								email: "traffic.city1@mahapolice.gov.in",
							},
						},
						{
							id: "54",
							name: "City 2",
							position: "Traffic Division",
							department: "City 2 Traffic",
							rank: "Unit",
							contact: {
								phone: "+91-240-123-4053",
								email: "traffic.city2@mahapolice.gov.in",
							},
						},
					],
				},
			],
		},
	],
};
