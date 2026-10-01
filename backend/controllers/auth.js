import UserModel from "../models/User.js";

const signUp = async (request, response) => {
  const body = request.body;
  const { fullName, email, password } = body;

  if (!fullName || !email || !password) {
    return response.json({
      status: false,
      message: "Required Fields Are Missing",
      data: null,
    });
  }

  const userAlreadyExist = await UserModel.find({ email });
  console.log(userAlreadyExist, "userAlreadyExist");

  if (userAlreadyExist) {
    return response.json({
      status: false,
      message: "User Already exist",
      data: null,
    });
  }

  const userObj = {
    fullName,
    email,
    password,
  };

  console.log(request.body);
  await UserModel.create(userObj);
  response.json({
    status: true,
    message: "Account Created",
    data: userObj,
  });
};

export { signUp };
