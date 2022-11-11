package com.youngclimb.common.redis;

import java.time.Duration;

public interface RedisService {
    public void setValues(String key, String data);

    public void setValues(String key, String data, Duration duration);

    public String getValues(String key);
    public void deleteValues(String key);

    public long getTTL(String key);

}
