// rateLimitConfig.ts

import { RateLimitConfig } from "../types/rate_limiter.types";
const tenant_01 = "68f13360-dbcc-439d-b5af-4f9538b7ef3"
const RAW_CONFIG: RateLimitConfig = {
    channelGlobal: {
        Email: { capacity: 2000, refill_per_sec: 2000 },
        SMS: { capacity: 300, refill_per_sec: 300 },
        // push:  { capacity: 5000, refill_per_sec: 5000 },
    },

    priority: {
        Email: {
            HIGH: { capacity: 1000, refill_per_sec: 1000 },
            MEDIUM: { capacity: 700, refill_per_sec: 700 },
            LOW: { capacity: 300, refill_per_sec: 300 },
        },
        SMS: {
            HIGH: { capacity: 200, refill_per_sec: 200 },
            MEDIUM: { capacity: 100, refill_per_sec: 100 },
            LOW: { capacity: 50, refill_per_sec: 50 },
        },
        // push: {
        //   HIGH:   { capacity: 3000, refill_per_sec: 3000 },
        //   MEDIUM: { capacity: 1500, refill_per_sec: 1500 },
        //   LOW:    { capacity: 500,  refill_per_sec: 500  },
        // },
    },

    tenant: {
        "68f13360-dbcc-439d-b5af-4f9538b7ef31": {
            Email: { capacity: 500, refill_per_sec: 500 },
            SMS: { capacity: 100, refill_per_sec: 100 },
            //   push:  { capacity: 1000, refill_per_sec: 1000 },
        },
        tenant_002: {
            Email: { capacity: 200, refill_per_sec: 200 },
            SMS: { capacity: 50, refill_per_sec: 50 },
            //   push:  { capacity: 500, refill_per_sec: 500 },
        },
    },

    userFatigue: {
        Email: { capacity: 5, refill_per_sec: 0.0833 },
        SMS: { capacity: 3, refill_per_sec: 0.05 },
        // push:  { capacity: 10, refill_per_sec: 0.2   },
    },
};

export default RAW_CONFIG;