declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(filename: string);
    exec(sql: string): void;
    prepare(sql: string): {
      run(...parameters: unknown[]): unknown;
      all(...parameters: unknown[]): unknown[];
      get(...parameters: unknown[]): unknown;
    };
    close(): void;
  }
}
