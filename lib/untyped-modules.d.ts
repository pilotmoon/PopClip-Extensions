// Modules bundled by extensions in this repo that publish no type
// declarations. Minimal shapes so that noImplicitAny can be on for
// everything else; anything not declared here is any.
declare module "evernote" {
  // biome-ignore lint/suspicious/noExplicitAny: untyped upstream package
  export class Client {
    // biome-ignore lint/suspicious/noExplicitAny: untyped upstream package
    constructor(options: any);
    // biome-ignore lint/suspicious/noExplicitAny: untyped upstream package
    [member: string]: any;
  }
  // biome-ignore lint/suspicious/noExplicitAny: untyped upstream package
  export const Errors: any;
}
declare module "latextomathml";
