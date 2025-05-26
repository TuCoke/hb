# 综合权限控制模型设计

## 模型概述

本文档描述了一个综合的权限控制模型，它结合了：
1. 基于角色的访问控制（RBAC）
2. 基于属性的访问控制（ABAC）
3. 数据权限控制
4. 部门权限控制

## 综合数据库设计

```mermaid
erDiagram
    User ||--o{ UserRole : has
    User ||--o{ UserAttribute : has
    User ||--o{ UserDepartment : belongs_to
    User ||--o{ DataPermission : has
    
    Role ||--o{ UserRole : assigned_to
    Role ||--o{ RolePermission : has
    Role ||--o{ RolePolicy : has
    
    Department ||--o{ UserDepartment : contains
    Department ||--o{ DepartmentPolicy : has
    Department ||--o{ DataPermission : controls
    
    Resource ||--o{ ResourceAttribute : has
    Resource ||--o{ Permission : controls
    Resource ||--o{ DataPermission : protected_by
    
    Policy ||--o{ RolePolicy : used_in
    Policy ||--o{ DepartmentPolicy : used_in
    Policy ||--o{ PolicyRule : contains
    
    User {
        int id PK
        string username
        string password
        string email
        datetime created_at
        datetime updated_at
    }

    Role {
        int id PK
        string name
        string description
        datetime created_at
        datetime updated_at
    }

    Department {
        int id PK
        string name
        int parent_id FK
        datetime created_at
        datetime updated_at
    }

    Resource {
        int id PK
        string name
        string type
        string description
        datetime created_at
        datetime updated_at
    }

    Permission {
        int id PK
        string name
        string description
        int resource_id FK
        datetime created_at
        datetime updated_at
    }

    Policy {
        int id PK
        string name
        string description
        boolean enabled
        datetime created_at
        datetime updated_at
    }

    DataPermission {
        int id PK
        int user_id FK
        int department_id FK
        int resource_id FK
        string permission_type
        string scope
        datetime created_at
        datetime updated_at
    }
```

## 权限控制流程

```mermaid
graph TD
    A[用户请求] --> B[身份认证]
    B --> C[获取用户信息]
    C --> D[获取角色权限]
    C --> E[获取部门权限]
    C --> F[获取数据权限]
    D --> G[合并权限]
    E --> G
    F --> G
    G --> H[应用ABAC策略]
    H --> I{权限决策}
    I -->|允许| J[执行操作]
    I -->|拒绝| K[拒绝访问]
```

## 数据权限控制

### 1. 数据权限类型
- 全部数据权限
- 部门数据权限
- 部门及以下数据权限
- 仅本人数据权限
- 自定义数据权限

### 2. 数据权限实现

```mermaid
graph TD
    A[数据访问请求] --> B{检查数据权限}
    B --> C{全部数据权限?}
    C -->|是| D[允许访问]
    C -->|否| E{部门数据权限?}
    E -->|是| F[检查部门]
    E -->|否| G{个人数据权限?}
    F --> H{部门匹配?}
    H -->|是| D
    H -->|否| I[拒绝访问]
    G --> J{用户匹配?}
    J -->|是| D
    J -->|否| I
```

## 部门权限控制

### 1. 部门树结构

```mermaid
graph TD
    A[总公司] --> B[技术部]
    A --> C[市场部]
    A --> D[财务部]
    B --> E[开发组]
    B --> F[测试组]
    C --> G[销售组]
    C --> H[市场组]
```

### 2. 部门权限继承

```mermaid
graph TD
    A[上级部门权限] --> B[下级部门继承]
    B --> C[部门成员继承]
    C --> D[最终权限]
```

## 实现示例

### 1. 创建用户并分配角色和部门
```sql
-- 创建用户
INSERT INTO users (username, password, email)
VALUES ('john.doe', 'hashed_password', 'john@example.com');

-- 分配角色
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);

-- 分配部门
INSERT INTO user_departments (user_id, department_id)
VALUES (1, 1);
```

### 2. 设置数据权限
```sql
-- 设置部门数据权限
INSERT INTO data_permissions (user_id, department_id, resource_id, permission_type, scope)
VALUES (1, 1, 1, 'read', 'department');

-- 设置个人数据权限
INSERT INTO data_permissions (user_id, resource_id, permission_type, scope)
VALUES (1, 2, 'write', 'personal');
```

### 3. 定义访问策略
```sql
-- 创建策略
INSERT INTO policies (name, description, enabled)
VALUES ('department_data_access', '部门数据访问策略', true);

-- 添加策略规则
INSERT INTO policy_rules (policy_id, effect, priority)
VALUES (1, 'allow', 1);

-- 设置条件
INSERT INTO conditions (rule_id, attribute_name, operator, value)
VALUES (1, 'user.department', 'equals', 'IT');
```

## 最佳实践

1. **权限分层设计**
   - 基础权限（RBAC）
   - 细粒度权限（ABAC）
   - 数据权限
   - 部门权限

2. **权限缓存策略**
   - 缓存用户角色
   - 缓存部门权限
   - 缓存数据权限
   - 定期更新缓存

3. **权限审计**
   - 记录权限变更
   - 记录访问日志
   - 定期权限审查
   - 异常访问监控

4. **性能优化**
   - 使用权限缓存
   - 优化权限查询
   - 批量权限检查
   - 异步权限验证

## 总结

综合权限控制模型通过结合多种权限控制机制，提供了：
1. 灵活的角色管理
2. 细粒度的属性控制
3. 精确的数据权限
4. 清晰的部门权限

这种模型特别适合：
- 大型企业应用
- 多租户系统
- 需要细粒度控制的场景
- 复杂的组织架构 