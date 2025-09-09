import { verifyJWT } from "../Utils/jwt.js";

export const AdminRequests = async (req, res) => {
    try {
        const jwtToken = req.headers["authorization"].split("Bearer ")[1];
        const userInfo = verifyJWT(jwtToken);       
        if (!userInfo) {
            return res.status(401).json({ message: "Login Expired" });
        }
        res.status(200).json({
            ok: true,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
        });
    }
};