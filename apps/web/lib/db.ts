import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'grammar_checker'

let client: MongoClient | null = null

export async function getDb() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db(dbName)
}

export async function closeConnection() {
  if (client) {
    await client.close()
    client = null
  }
}

// 错误类型
interface GrammarError {
  original: string
  correction: string
  explanationZh?: string
  explanationEn?: string
}

// 保存检查历史
export async function saveHistory(data: {
  original: string
  corrected: string
  errors: GrammarError[]
  userId?: string
}) {
  const db = await getDb()
  const collection = db.collection('history')
  return collection.insertOne({
    ...data,
    createdAt: new Date(),
  })
}

// 获取历史记录
export async function getHistory(limit = 20, userId?: string) {
  const db = await getDb()
  const collection = db.collection('history')
  const query = userId ? { userId } : {}
  return collection
    .find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
}