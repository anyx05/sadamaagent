import * as fs from 'fs'
import * as path from 'path'

type LogEntry = {
  timestamp: string
  testName: string
  status: 'START' | 'PASS' | 'FAIL' | 'ERROR'
  details?: any
}

class CustomLogger {
  private logFilePath: string

  constructor() {
    const logsDir = path.join(process.cwd(), 'tests', 'logs')
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    this.logFilePath = path.join(logsDir, `run-${timestamp}.json`)
    
    // Initialize file with empty array
    fs.writeFileSync(this.logFilePath, '[\n]')
  }

  private appendLog(entry: LogEntry) {
    try {
      // Very simple JSON array append strategy
      const currentContent = fs.readFileSync(this.logFilePath, 'utf8')
      const newEntry = JSON.stringify(entry, null, 2)
      
      if (currentContent.trim() === '[\n]') {
         fs.writeFileSync(this.logFilePath, `[\n${newEntry}\n]`)
      } else {
         const withoutBracket = currentContent.substring(0, currentContent.lastIndexOf(']'))
         fs.writeFileSync(this.logFilePath, `${withoutBracket},\n${newEntry}\n]`)
      }
    } catch (error) {
      console.error('Failed to write log entry', error)
    }
  }

  start(testName: string) {
    this.appendLog({
      timestamp: new Date().toISOString(),
      testName,
      status: 'START'
    })
  }

  log(category: string, message: string) {
    this.appendLog({
      timestamp: new Date().toISOString(),
      testName: category,
      status: 'START',
      details: message
    })
  }

  pass(testName: string) {
    this.appendLog({
      timestamp: new Date().toISOString(),
      testName,
      status: 'PASS'
    })
  }

  fail(testName: string, error?: any) {
    this.appendLog({
      timestamp: new Date().toISOString(),
      testName,
      status: 'FAIL',
      details: error
    })
  }
}

export const testLogger = new CustomLogger()
