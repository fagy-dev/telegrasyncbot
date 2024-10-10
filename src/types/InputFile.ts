export class InputFile {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  public async getBlob(): Promise<Blob> {
    const fileBytes = await Deno.readFile(this.path);
    return new Blob([fileBytes]);
  }
}
