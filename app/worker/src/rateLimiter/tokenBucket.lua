-- tokenBucket.lua

-- KEYS: bucket keys
-- ARGV:
-- 1: current timestamp (ms)
-- 2: tokens required
-- Then for each bucket:
-- capacity_i
-- refill_rate_i

local now = tonumber(ARGV[1])
local required = tonumber(ARGV[2])

local bucketCount = #KEYS
local capacitiesStart = 3

-- First pass: refill & validate
for i = 1, bucketCount do
    local key = KEYS[i]

    local capacity = tonumber(ARGV[capacitiesStart + (i - 1) * 2])
    local refill_rate = tonumber(ARGV[capacitiesStart + (i - 1) * 2 + 1])

    local data = redis.call("HMGET", key, "tokens", "last_refill_ts")
    local tokens = tonumber(data[1])
    local last_refill = tonumber(data[2])

    if tokens == nil then
        tokens = capacity
        last_refill = now
    else
        local elapsed = (now - last_refill) / 1000
        local refill = elapsed * refill_rate
        tokens = math.min(capacity, tokens + refill)
    end

    if tokens < required then
        return 0
    end
end

-- Second pass: deduct tokens
for i = 1, bucketCount do
    local key = KEYS[i]

    local capacity = tonumber(ARGV[capacitiesStart + (i - 1) * 2])
    local refill_rate = tonumber(ARGV[capacitiesStart + (i - 1) * 2 + 1])

    local data = redis.call("HMGET", key, "tokens", "last_refill_ts")
    local tokens = tonumber(data[1])
    local last_refill = tonumber(data[2])

    if tokens == nil then
        tokens = capacity
        last_refill = now
    else
        local elapsed = (now - last_refill) / 1000
        local refill = elapsed * refill_rate
        tokens = math.min(capacity, tokens + refill)
    end

    tokens = tokens - required

    redis.call("HMSET", key,
        "tokens", tokens,
        "last_refill_ts", now
    )
end

return 1