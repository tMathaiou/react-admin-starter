import {QueryParams} from "../classes/queryParams";
import {User} from "../classes/user";
import {List} from "../classes/list";
import to from "../helpers/to";
import {DefaultConfig} from "../defaultConfig";


export class UserService {
  public static async list(params: QueryParams): Promise<List<User>> {
    let err: any;
    let response: any;

    [err, response] = await to(
      (window as any).axios.get('/api/users', {
        params: {
          page: params.page,
          limit: params.limit,
          like: !DefaultConfig.strictQueries,
          ...UserService.removeEmpty(params.filter),
        },
      }),
    );

    if (err) {
      throw new Error(err);
    }
    return response.data;
  }

  public static async get(id: number): Promise<User> {
    let err: any;
    let response: any;

    [err, response] = await to((window as any).axios.get(`/api/users/${id}`));

    if (err) {
      throw new Error(err);
    }
    return response.data;
  }

  public static async save(user: User): Promise<void> {
    let err: any;

    [err] = await to((window as any).axios.post(`/api/users/`, user));

    if (err) {
      throw new Error(err);
    }
  }

  public static async update(id: number, user: User): Promise<void> {
    let err: any;

    [err] = await to((window as any).axios.put(`/api/users/${id}`, user));

    if (err) {
      throw new Error(err);
    }
  }

  public static async delete(id: number): Promise<void> {
    let err: any;

    [err] = await to((window as any).axios.delete(`/api/users/${id}`));

    if (err) {
      throw new Error(err);
    }
  }

  private static removeEmpty(obj: any): any {
    const output: any = {};
    Object.entries(obj).map(([key, val]) => {
      if (val != null && val !== '' && val !== undefined) {
        output[key] = val;
      }
    });

    return output;
  }
}
