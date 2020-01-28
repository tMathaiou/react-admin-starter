export class QueryParams {
  public limit: number = 20;
  public page: number = 1;
  public filter: any = {};

  constructor(args: any = {}) {
    for (const key in args) {
      if (args.hasOwnProperty(key) && this.hasOwnProperty(key)) {
        (this as any)[key] = (args as any)[key];
      }
    }
  }
}
