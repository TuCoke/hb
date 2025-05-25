# .NET WebAPI 示例

本文档将介绍如何使用 .NET 创建一个基本的 WebAPI 应用程序。

## 创建 WebAPI 项目

使用以下命令创建一个新的 WebAPI 项目：

```bash
dotnet new webapi -n MyFirstWebApi
cd MyFirstWebApi
```

## 项目结构

创建项目后，您将看到以下主要文件和目录：

- `Program.cs` - 应用程序入口点和配置
- `Controllers/` - 包含API控制器
- `Properties/launchSettings.json` - 应用程序启动配置
- `appsettings.json` - 应用程序配置文件
- `MyFirstWebApi.csproj` - 项目文件

## 创建模型

首先，让我们创建一个简单的模型类。在项目根目录下创建一个 `Models` 文件夹，并添加一个 `TodoItem.cs` 文件：

```csharp
namespace MyFirstWebApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsComplete { get; set; }
    }
}
```

## 创建数据上下文

接下来，添加一个简单的数据上下文类来模拟数据库。创建一个 `Data` 文件夹，并添加 `AppDbContext.cs` 文件：

```csharp
using Microsoft.EntityFrameworkCore;
using MyFirstWebApi.Models;

namespace MyFirstWebApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; } = null!;
    }
}
```

## 配置服务

在 `Program.cs` 文件中，添加 Entity Framework 服务和数据库配置：

```csharp
using Microsoft.EntityFrameworkCore;
using MyFirstWebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// 添加控制器服务
builder.Services.AddControllers();

// 添加 Swagger/OpenAPI 支持
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 添加数据库上下文
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TodoList"));

var app = builder.Build();

// 配置 HTTP 请求管道
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## 创建控制器

在 `Controllers` 文件夹中，创建 `TodoItemsController.cs` 文件：

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFirstWebApi.Data;
using MyFirstWebApi.Models;

namespace MyFirstWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
```

## 安装必要的包

运行以下命令安装所需的 NuGet 包：

```bash
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

## 运行应用程序

现在可以运行 WebAPI 应用程序：

```bash
dotnet run
```

默认情况下，应用程序将在 `https://localhost:7xxx` 和 `http://localhost:5xxx` 上运行（端口号可能会有所不同）。

## 使用 Swagger 测试 API

通过浏览器访问 `https://localhost:7xxx/swagger` 来打开 Swagger UI 界面，您可以在其中测试 API 的所有端点。

## API 测试示例

以下是使用 curl 测试 API 的一些示例：

### 创建一个新的待办事项

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"完成 WebAPI 教程\",\"isComplete\":false}" https://localhost:7xxx/api/TodoItems
```

### 获取所有待办事项

```bash
curl -X GET https://localhost:7xxx/api/TodoItems
```

### 获取特定待办事项

```bash
curl -X GET https://localhost:7xxx/api/TodoItems/1
```

### 更新待办事项

```bash
curl -X PUT -H "Content-Type: application/json" -d "{\"id\":1,\"title\":\"完成 WebAPI 教程\",\"isComplete\":true}" https://localhost:7xxx/api/TodoItems/1
```

### 删除待办事项

```bash
curl -X DELETE https://localhost:7xxx/api/TodoItems/1
```

## 总结

在本示例中，我们创建了一个完整的 .NET WebAPI 应用程序，实现了以下功能：

1. 创建基本的 WebAPI 项目结构
2. 定义数据模型
3. 配置 Entity Framework 和内存数据库
4. 实现 CRUD 操作的 API 控制器
5. 使用 Swagger 进行 API 文档和测试

这个示例展示了如何使用 .NET 快速创建功能齐全的 RESTful API。 