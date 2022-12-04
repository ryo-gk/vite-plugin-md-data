import { writeFileSync } from 'fs'
import prettier from 'prettier'

export class FileBuilder {
  private template: string
  public static formatType = 'typescript'

  constructor(template: string) {
    this.template = template
  }

  public getTemplate() {
    return this.template
  }

  public set(key: string, value: string) {
    this.template = this.template.replaceAll(key, value)
    return this
  }

  public format() {
    this.template = prettier.format(this.template, {
      semi: false,
      parser: 'typescript'
    })

    return this
  }

  public generate(dir: string) {
    writeFileSync(dir, this.template)
  }
}
