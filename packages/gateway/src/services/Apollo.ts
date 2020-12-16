import { createApolloFetch } from 'apollo-fetch'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import {
  mergeSchemas,
  introspectSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema
} from 'graphql-tools'

import resolversArray from '../graphql/resolvers'

class Apollo {
  public schema: any

  constructor() {
    this.getSchema = this.getSchema.bind(this)
    this.loadSchema = this.loadSchema.bind(this)
    this.getRemoteSchema = this.getRemoteSchema.bind(this)
  }

  async getRemoteSchema(remorteUri: any) {
    const fetcher: any = createApolloFetch({
      uri: remorteUri
    })
    const remoteSchema = await introspectSchema(fetcher)
    return makeRemoteExecutableSchema({
      schema: remoteSchema,
      fetcher
    })
  }

  async loadSchema(uris: any) {
    if (!uris) throw Error('you forgot to set apollo options')

    const promises: Promise<any>[] = []
    if (uris.remoteUris) {
      uris.remoteUris.forEach((remorteUri: any) => {
        new Promise(resolve => {
          const executable: Promise<any> = this.getRemoteSchema(remorteUri)
          promises.push(executable)
          resolve(true)
        })
      })
    }

    if (uris.localUri) {
      const typesArray = fileLoader(uris.localUri, {
        recursive: true,
        extensions: ['.graphql']
      })
      const typeDefs = mergeTypes(typesArray)
      const resolvers: any = mergeResolvers(resolversArray)
      const localSchema: any = makeExecutableSchema({
        typeDefs,
        resolvers
      })
      promises.push(localSchema)
    }

    const executableSchemas = await Promise.all(promises)
    this.schema = mergeSchemas({
      schemas: executableSchemas
    })
    return this.schema
  }

  getSchema() {
    if (this.schema) return this.schema
    throw Error('no graphql schema is defined')
  }
}

export default new Apollo()
