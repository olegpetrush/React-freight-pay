import { Entity, Column, TableInheritance } from 'typeorm'

import Base from '../BaseEntities/Base'

@Entity()
@TableInheritance({
  column: { type: 'varchar', name: 'type', default: 'ClientContact' }
})
export default class Contact extends Base {
  @Column('text', { nullable: true })
  firstName: string

  @Column('text', { nullable: true })
  lastName: string

  @Column('text', { nullable: true })
  phone: string

  @Column('text', { nullable: true })
  email: string
}
