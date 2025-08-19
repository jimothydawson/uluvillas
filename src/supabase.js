import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ywuzadanrkxeauxaanic.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3dXphZGFucmt4ZWF1eGFhbmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTUxMzYsImV4cCI6MjA3MTA5MTEzNn0.1V7XMLFlA6B4R5QdaBkRJB8CA69LM5_c4-067Hc8wcE'

export const supabase = createClient(supabaseUrl, supabaseKey)