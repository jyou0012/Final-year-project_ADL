import { StaffDoc, upsertStaff } from "../../../database/staff"

export async function POST(request) {
	const req = await request.json()
	const staff = new StaffDoc({name: req.username, password: req.password})
	await upsertStaff(staff)
	return Response.json({ message: `succeed to create staff: ${req.username}` })
}
