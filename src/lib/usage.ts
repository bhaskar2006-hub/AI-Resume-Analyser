import { createClient } from '@/utils/supabase/server'

export async function checkUsageLimit(feature: 'analyzes' | 'interviews') {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    // 1. Check if user has an active subscription
    const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

    if (profile?.subscription_status === 'active') {
        return true // Unlimited usage for subscribed users
    }

    // 2. Fallback to free tier logic
    let { data: usage } = await supabase
        .from('usage_limits')
        .select('*')
        .eq('id', user.id)
        .single()

    // If no usage record exists, create one with defaults
    if (!usage) {
        const { data: newUsage, error } = await supabase
            .from('usage_limits')
            .insert({ id: user.id, analyzes_count: 0, interviews_count: 0 })
            .select()
            .single()

        if (!error) {
            usage = newUsage
        }
    }

    const limit = feature === 'analyzes' ? 1 : 3
    const currentCount = feature === 'analyzes' ? usage?.analyzes_count || 0 : usage?.interviews_count || 0

    return currentCount < limit
}

export async function incrementUsage(feature: 'analyzes' | 'interviews') {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    // Only increment if not subscribed (save DB writes and keep infinite for Pro)
    const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

    if (profile?.subscription_status === 'active') return

    // Fetch current to increment
    // Select both counts as the update logic now explicitly references them
    const { data: usage } = await supabase
        .from('usage_limits')
        .select('analyzes_count, interviews_count')
        .eq('id', user.id)
        .single()

    if (usage) {
        if (feature === 'analyzes') {
            await supabase.from('usage_limits').update({ analyzes_count: (usage.analyzes_count || 0) + 1 }).eq('id', user.id)
        } else {
            await supabase.from('usage_limits').update({ interviews_count: (usage.interviews_count || 0) + 1 }).eq('id', user.id)
        }
    }
}
