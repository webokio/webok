import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/core/lib/typeorm/typeorm.config'

export const TypeOrmRootModule = TypeOrmModule.forRoot(TypeOrmConfig)
