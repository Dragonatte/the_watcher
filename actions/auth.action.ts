import { RegisterUser } from "@/model/User.model";
import s from "@/service/app.services";

export async function authAction(user: RegisterUser) {
  return await s.users.create({
    username: user.username,
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
