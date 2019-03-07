import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'

// Override methods that use camelCase and titleCase
// in https://github.com/typeorm/typeorm/blob/master/src/naming-strategy/DefaultNamingStrategy.ts
export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  columnName (propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(super.columnName(propertyName, customName, embeddedPrefixes))
  }

  joinColumnName (relationName: string, referencedColumnName: string): string {
    return snakeCase(super.joinColumnName(relationName, referencedColumnName))
  }

  joinTableColumnName (tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(super.joinTableColumnName(tableName, propertyName, columnName))
  }
}
