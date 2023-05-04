using backend.Infrastructure;
using backend.Models;
using backend.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy",
    builder => 
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .SetIsOriginAllowed(_ => true)
        .WithOrigins("http://localhost:3000");
    });
});


builder.Services.AddControllers();
builder.Services.AddDbContext<ShopDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<ICategoryRepository, SqlCategoryRepository>();
builder.Services.AddTransient<IProductRepository, SqlProductRepository>();
builder.Services.AddTransient<IUserRepository, SqlUserRepository>();

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

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

// app.UseAuthentication();
app.UseAuthorization();          

app.MapControllers();

var context = app.Services.CreateScope().ServiceProvider.GetRequiredService<ShopDbContext>();
SeedData.SeedDatabase(context);

app.Run();
