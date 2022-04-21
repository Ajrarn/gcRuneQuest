export class LoadAllCultures {
  static readonly type = '[Cultures] LoadAllCultures';
}

export class LoadCulture {
  static readonly type = '[Cultures] LoadCulture';
  constructor(public filename: string) {}
}
