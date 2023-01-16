
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Company.Manager
{
    public static class SwaggerHandler
    {

        public static void SwaggerUIConfig(this IApplicationBuilder app, IApiVersionDescriptionProvider provider)
        {
            app.UseSwagger(c =>
            {
#if !DEBUG
                    c.RouteTemplate = "swagger/{documentName}/swagger.json";
                    c.PreSerializeFilters.Add((swaggerDoc, httpsReq) => swaggerDoc.Servers = new System.Collections.Generic.List<OpenApiServer>
                    {
                    new OpenApiServer { Url = $https://{httpsReq.Host.Value}/tweets }
                    });
#endif
            });

            app.UseSwaggerUI(c =>
            {
                foreach (var item in provider.ApiVersionDescriptions.Select(description => description.GroupName))
                {
                    c.SwaggerEndpoint($"../swagger/{item}/swagger.json", $"LMSApp Rest API - {item}");
                    c.RoutePrefix = "swagger";
                }
            });
        }

        public static void SwaggerGenConfig(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(c =>
            {
                var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

                foreach (var description in provider.ApiVersionDescriptions)
                {
                    c.SwaggerDoc(description.GroupName, new OpenApiInfo
                    {
                        Title = "LMSApp Rest API",
                        Version = $"v{description.ApiVersion}",
                        Description = "LMSApp Rest API documentation",
                    });
                }

                c.ResolveConflictingActions(x => x.First());

                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JwtToken Authentication",
                    Description = "Enter JwtToken which generated from Login api",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme,
                    },
                };
                c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { securityScheme, Array.Empty<string>() },
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetEntryAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

    }
}
