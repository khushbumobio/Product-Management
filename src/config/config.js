const config = {
    secretJWT: 'thisisproductmanagementproject',
    notAllowed:'only admin can create user',
    noData: "Data not found",
    successStatusCode: 200,
    internalServerErrorStatusCode: 500,
    userNotFound: "User not found",
    emptyFields: "Fields are required",
    emailNotExists: "Given email does not exists. Please enter valid email address",
    emailExists: "Given email already exists. Please enter different email",
    unableToLogin: "Please enter a valid password",
    logInSuccess: "Login successful",
    recordCreated: "Record has been created",
    invalidaUpdates: "You cannot update email id and password.",
    recordUpdated: "Record has been updated.",
    recordDeleted: "Record has been deleted.",
    logOut: "Logout successful",
}
module.exports=config;