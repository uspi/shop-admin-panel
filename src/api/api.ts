import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

export let instance = axios.create({
  withCredentials: true,
  baseURL: 'https://jhhbxrcabsbcvcvtqybl.supabase.co/rest/v1',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaGJ4cmNhYnNiY3ZjdnRxeWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI2MzQ0NTYsImV4cCI6MTk3ODIxMDQ1Nn0.-lqVeS18EMSyBYzXZQAlsORa448FAcfGu_0psI3YxLw',
    // 'content-type': 'application/json'
  },
})

// Initialize the JS client

export const dbInstanse = createClient(
    'https://jhhbxrcabsbcvcvtqybl.supabase.co/', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaGJ4cmNhYnNiY3ZjdnRxeWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI2MzQ0NTYsImV4cCI6MTk3ODIxMDQ1Nn0.-lqVeS18EMSyBYzXZQAlsORa448FAcfGu_0psI3YxLw'
    )
