import { NextRequest, NextResponse } from 'next/server'
import { saveHistory } from '@/lib/db'

// 百炼 API 配置
const BAILIAN_BASE_URL = 'https://coding.dashscope.aliyuncs.com/v1'
const API_KEY = process.env.DASHSCOPE_API_KEY || process.env.OPENAI_API_KEY

interface GrammarError {
  original: string
  correction: string
  explanationZh?: string
  explanationEn?: string
}

interface GrammarResult {
  original: string
  corrected: string
  errors: GrammarError[]
  isCorrect: boolean
}

async function checkGrammar(text: string): Promise<GrammarResult> {
  const prompt = `你是一位专业的英语语法老师。请检查以下英语文本的语法错误。

文本: "${text}"

请以JSON格式返回结果，格式如下：
{
  "corrected": "修正后的完整句子",
  "errors": [
    {
      "original": "错误原文",
      "correction": "修正后的词/短语",
      "explanationZh": "中文解释错误原因",
      "explanationEn": "English explanation of the error"
    }
  ],
  "isCorrect": false
}

如果文本语法完全正确，errors数组为空，isCorrect为true。
只返回JSON，不要有其他内容。不要输出思考过程。`

  const response = await fetch(`${BAILIAN_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'qwen3.5-plus',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      // 关闭 thinking 模式
      enable_thinking: false,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('Bailian API error:', error)
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  // 只取 content，忽略 reasoning_content
  const content = data.choices?.[0]?.message?.content || '{}'
  
  try {
    const result = JSON.parse(content)
    return {
      original: text,
      corrected: result.corrected || text,
      errors: result.errors || [],
      isCorrect: result.isCorrect ?? true,
    }
  } catch {
    console.error('Failed to parse response:', content)
    return {
      original: text,
      corrected: text,
      errors: [],
      isCorrect: true,
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, userId } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: '请输入要检查的文本' },
        { status: 400 }
      )
    }

    const result = await checkGrammar(text.trim())

    // 保存到数据库（异步，不阻塞响应）
    saveHistory({
      original: result.original,
      corrected: result.corrected,
      errors: result.errors,
      userId,
    }).catch(console.error)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Grammar check error:', error)
    return NextResponse.json(
      { error: '语法检查失败，请稍后重试' },
      { status: 500 }
    )
  }
}