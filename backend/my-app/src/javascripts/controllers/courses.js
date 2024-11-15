//GET /api/users
export const allTeachersCoursesAPI = (req, res, next) => {
    console.log("in allTeachersCoursesAPI");
    res.status(200).json({ success: true, message:"TEACHER API STUB" })
    res.end()
}


