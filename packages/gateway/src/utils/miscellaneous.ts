import cuid from 'cuid'
import { isMatch as isMatchLodash, includes, toString, trim } from 'lodash'
import path from 'path'
import fs from 'fs'

export const lastElementsOfString = (
  string: any,
  separator: any,
  limit: any
): any => {
  const array = string.split(separator)
  if (array.length <= limit) return string

  let data = ''
  array.forEach((element: any, index: number) => {
    if (array.length === index + 1) data += element
    else if (array.length - index <= limit) data += `${element}.`
  })
  return data
}

const generateCode = (phone: any): any => {
  const code = Math.floor(1000 + Math.random() * 9000)
  const today = new Date()
  const expirationDate = new Date(today.getTime() + 3600000)
  const attemptCount = 0
  const used = false
  return { code, phone, expirationDate, attemptCount, used }
}

const isMatch = (data: any, filter: any): any => {
  const objectKeys = Object.keys(filter)
  if (!includes(objectKeys, 'AND') && !includes(objectKeys, 'OR'))
    return isMatchLodash(data, filter)

  let result = true

  objectKeys.forEach(key => {
    if (key === 'AND') {
      let andResult = true
      filter[key].forEach((subFilter: any) => {
        andResult = andResult && isMatch(data, subFilter)
      })
      result = result && andResult
      return
    }

    if (key === 'OR') {
      let orResult = false
      filter[key].forEach((subFilter: any) => {
        orResult = orResult || isMatch(data, subFilter)
      })
      result = result && orResult
      return
    }

    result =
      result &&
      isMatchLodash(data, {
        [key]: filter[key]
      })
  })

  return result
}

const makeHash = (): any => {
  function chr4() {
    return Math.random().toString(16).slice(-4)
  }
  return `${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`
}

const generateEmailCode = (): any => {
  const id = cuid()
  const code = makeHash()
  const today = new Date()
  const expirationDate = new Date(today.getTime() + 3600000)
  return { id, code, expirationDate }
}

const formatSettings = (object: any): any => {
  let res = {}
  Object.entries(object).forEach(([key, value]) => {
    res = { ...res, [key]: { id: cuid(), [key]: value } }
  })
  return res
}

const sum = (data: any, field: any): any =>
  data.reduce((acc: any, curr: any) => acc + Number(curr[`${field}`]), 0)

function* asyncIterable(funcs: any): any {
  for (const func of funcs) {
    yield func
  }
}

const piper = async (funcs: any, args: any) => {
  let input = args
  for (const fn of asyncIterable(funcs)) {
    input = await fn(...input)
  }
  return input
}

const formatName = (name: string): any =>
  trim(toString(name)).replace(/ +(?= )/g, '')

export function removeFoldersRecursively(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
      const curPath = path.join(dirPath, file)
      const stats = fs.statSync(curPath)
      if (stats.isDirectory()) {
        // recurse
        removeFoldersRecursively(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(dirPath)
  }
}

export default {
  isMatch,
  generateCode,
  formatSettings,
  sum,
  generateEmailCode,
  piper,
  formatName,
  removeFoldersRecursively
}
