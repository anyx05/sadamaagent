import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

async function testAuth() {
  console.log('Testing auth with:', process.env.TEST_USER_EMAIL)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!
  })
  if (error) {
    console.error('Auth failed:', error.message)
    process.exit(1)
  }
  console.log('Auth succeeded:', data.user?.id)
}

testAuth()
