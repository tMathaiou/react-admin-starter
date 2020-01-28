import {Login} from "../classes/login";
import to from "../helpers/to";

export class LoginService {
  public static async login(email: string, password: string): Promise<Login> {
    let err: any;
    let response: any;

    [err, response] = await to((window as any).axios.post('/api/auth', {email, password}));

    if (err) {
      throw new Error(err);
    }
    return response.data;
  }
}
