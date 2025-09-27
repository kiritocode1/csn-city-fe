export interface PoliceContact {
	id: string;
	name: string;
	rank: string;
	landline?: string;
	mobile?: string;
	email?: string;
}

export const policeContacts: PoliceContact[] = [
	{ id: "1", name: "Shrimati. Nirmala Pardeshi", rank: "Police Inspector", landline: "0240-2240551", mobile: "9226514024", email: "ps.citychowk.abad@mahapolice.gov.in" },
	{ id: "2", name: "Shree Sunil Mane", rank: "Police Inspector", landline: "0240-2240552", mobile: "9226514025", email: "ps.krantichowk.abad@mahapolice.gov.in" },
	{ id: "3", name: "Shri. Mangesh Jagtap", rank: "Police Inspector", landline: "0240-2240562", mobile: "9226514029", email: "ps.begumpura.abad@mahapolice.gov.in" },
	{ id: "4", name: "Smt. Pravina Yadav", rank: "Police Inspector", landline: "0240-2351333", mobile: "9226514031", email: "ps.vedantnagar.abad@mahapolice.gov.in" },
	{ id: "5", name: "Shree Vivek Jadhav", rank: "Assistant Police Inspector", landline: "0240-2240554", mobile: "9823225538", email: "ps.cantt.abad@mahapolice.gov.in" },
	{ id: "6", name: "Smt. Rekha Londhe", rank: "Police Inspector", landline: "0240-2615651", mobile: "9226514030", email: "psdaulatabad.abad@mahapolice.gov.in" },
	{ id: "7", name: "Shree Rajendra Sahane", rank: "Police Inspector", landline: "0240-2240560", mobile: "9921001474 / 9226514027", email: "ps.waluj.abad@mahapolice.gov.in" },
	{ id: "8", name: "Shree Rameshwar Gade", rank: "Police Inspector", landline: "0240-2240552", mobile: "9226514028", email: "ps.mwaluj.abad@mahapolice.gov.in" },
	{ id: "9", name: "Shri. Shivaji Murlidhar Budhwant", rank: "Police Inspector", landline: "0240-2240555", mobile: "9226514033", email: "ps.jinsi.abad@mahapolice.gov.in" },
	{ id: "10", name: "Shri. Somnath Jadhav", rank: "Police Inspector", landline: "0240-2240553", mobile: "9226514032", email: "ps.cidco.abad@mahapolice.gov.in" },
	{ id: "11", name: "Shree Sachin Ingole", rank: "Police Inspector", landline: "0240-2240557", mobile: "9226514036", email: "ps.mwadi.abad@mahapolice.gov.in" },
	{ id: "12", name: "Shree Gajanan Kalyankar", rank: "Police Inspector", landline: "0240-2240558", mobile: "9881157978", email: "ps.mcidco.abad@mahapolice.gov.in" },
	{ id: "13", name: "Shrimati Sunita Misal", rank: "Police Inspector", landline: "0240-2981033", mobile: "9226514039", email: "psharsool.abad@mahapolice.gov.in" },
	{ id: "14", name: "Shri. Sachin Kumbhar", rank: "Police Inspector", landline: "0240-2240556", mobile: "99226514034", email: "ps.jnagar.abad@mahapolice.gov.in" },
	{ id: "15", name: "Shree Atul Yerme", rank: "Police Inspector", landline: "0240-2240561", mobile: "9226514037", email: "ps.osmanpura.abad@gmail.com" },
	{ id: "16", name: "Shri. Krishna Shinde", rank: "Police Inspector", landline: "0240-2240565", mobile: "98234 16606", email: "ps.satara.abad@mahapolice.gov.in" },
	{ id: "17", name: "Shri. Ashok Bhandare", rank: "Police Inspector", landline: "0240-2484400", mobile: "9892304867", email: "pspundlik.abad@mahapolice.gov.in" },
	{ id: "18", name: "Shree Shivcharan Pandhare", rank: "Police Inspector", landline: "0240-2326514", mobile: "9226514017", email: "picybercell.abad@mahapolice.gov.in" },
];

export function filterPoliceContacts(query: string): PoliceContact[] {
	const q = query.trim().toLowerCase();
	if (!q) return policeContacts;
	return policeContacts.filter((c) => {
		const hay = `${c.name} ${c.rank} ${c.landline ?? ""} ${c.mobile ?? ""} ${c.email ?? ""}`.toLowerCase();
		return hay.includes(q);
	});
}
