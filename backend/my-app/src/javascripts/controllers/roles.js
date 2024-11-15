import { Role } from '../models/role'


//GET /api/roles
export const allRolesAPI = (req, res, next) => {
    Role.find().exec((err, roles) => {
        if (err) {
            res.status(500).json({ success: false, message: "Query failed" })
            res.end()
        } else {
            res.send(JSON.stringify(roles))
        }
    })
}

