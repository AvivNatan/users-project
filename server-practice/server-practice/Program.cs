using Microsoft.EntityFrameworkCore;
using server_practice.Data;
using server_practice.Services;

var builder = WebApplication.CreateBuilder(args);

// מוסיפים שירותי CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // ה-origin של אנגולר
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); // אם שולחים קוקיז או הרשאות
        });
});
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDBContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<UserService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
