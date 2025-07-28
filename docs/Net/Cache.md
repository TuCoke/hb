# NetCore中使用缓存封装

``` C#
    /// <summary>
    /// 分离 业务逻辑和缓存逻辑  如果都不存在 需要返回null 否则缓存不生效
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TKey"></typeparam>
    public abstract class EntityCacheBase<T, TKey> : ITransientService
    {
        protected readonly IMemoryCache _cache;
        protected readonly ILogger<EntityCacheBase<T, TKey>> _logger;

        protected string cacheName = string.Empty; //缓存名称
        protected TKey cacheKey; //缓存key
        protected TimeSpan expiryTime = TimeSpan.FromSeconds(60); //缓存时间
        protected Func<Task<T>> func = null; //具体方法

        protected EntityCacheBase(
)
        {
            // 可切换 redis 单例
            _cache = new MemoryCache(new MemoryCacheOptions());


        }

        /// <summary>
		/// 子类通知需要重写 override 程序运行开始时加载实体监听函数，在数据库实体发生变化时，删除当前缓存
		/// </summary>
        public virtual void ListenEntity()
        {
            return;  //监听实体变化 更新缓存
        }

        public virtual async Task<T> GetAsync(TKey key)
        {
            try
            {
                cacheKey = key;
                return await _cache.GetOrCreateAsync(cacheName + cacheKey.ToString(), async cacheEntry =>
                {
                    cacheEntry.AbsoluteExpirationRelativeToNow = expiryTime;
                    if (func == null)
                    {
                        throw new InvalidOperationException("The 'func' delegate must be set before calling GetAsync.");
                    }
                    return await func();
                }) ?? throw new InvalidOperationException("The cache returned a null value.");
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Error in GetAsync for key {Key}: {Message}", key, ex.Message);
                throw new InvalidOperationException("Error in GetAsync: " + ex.Message);
            }
        }

        public void Remove(TKey key)
        {
            _cache.Remove(cacheName + key.ToString());
        }
    }
```

### 使用方式
>  例如我们这个缓存为用户缓存逻辑,我们继承 EntityCacheBase <响应结果实体,传入key的类型>
UserRoleCacheService 在其他地方进行构造函数注入,进行使用

``` C#
    /// <summary>
    /// 用户缓存
    /// </summary>
    public class UserRoleCacheService : EntityCacheBase<List<UserRoleItem>, int>
    {

        private readonly IMysqlSqlSugarClient _mysqlSqlSugarClient;
        public UserRoleCacheService(IMysqlSqlSugarClient mysqlSqlSugarClient)
        {
            _mysqlSqlSugarClient = mysqlSqlSugarClient;

            cacheName = "user:";
            expiryTime = TimeSpan.FromHours(1);
            func = async () =>
            {
                var item = await _mysqlSqlSugarClient.Queryable<User>()
                          .Where(x => x.IsDeleted == EntityStatusEnums.Normal)
                          .Where(x => x.Id == cacheKey)
                          .FirstAsync();
                if (item == null)
                {
                    return null;
                }
                var result = await _mysqlSqlSugarClient.Queryable<UserRole>()
                           .LeftJoin<Role>((a, b) => a.RoleId == b.RoleId)
                           .Where((a, b) => a.UserId == item.Id)
                           .Where((a, b) => a.IsDeleted == EntityStatusEnums.Normal &&
                            b.IsDeleted == EntityStatusEnums.Normal)
                           .Select((a, b) => new
                           {
                               RoleName = b.RoleName,
                               RoleId = b.RoleId,
                               UserId = a.UserId,
                               b.Permissions,
                               // b.IsDeleted
                           })
                           .ToListAsync();
                var items = result.Select(x =>
                {
                    var v = new UserRoleItem();
                    v.RoleName = x.RoleName;
                    v.RoleId = x.RoleId;
                    v.UserId = x.UserId;
                    v.Permissions = x.Permissions ?? "";
                    return v;
                }).ToList();
                return items;
            };
        }
    }
```










