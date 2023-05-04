
using backend.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public static class SeedData
    {
        public static void SeedDatabase(ShopDbContext context)
        {
            context.Database.Migrate();
           
                if (!context.Products.Any())
                {
                    Category mirage = new Category{ Name = "Mirage", Slug = "mirage", Sorting = 1, Image = "Mirage.png"};
                    Category tempest = new Category  { Name = "Tempest", Slug = "tempest", Sorting = 2, Image = "Tempest.png" };
                    Category urzas_saga = new Category { Name = "Urzas-saga", Slug = "urzas-saga", Sorting = 3, Image = "Urzas-saga.png"};
                    Category mercadian_masques = new Category { Name = "Mercadian Masques", Slug = "mercadian-masques", Sorting = 4, Image = "Mercadian Masques.png"};
                    Category invasion = new Category{ Name = "Invasion", Slug = "invasion", Sorting = 5, Image = "Invasion.png"};
                
                    context.Products.AddRange
                    (
                        new Product
                        {
                            Name = "Void",
                            Slug = "void",
                            Price = 0.59M,
                            Category = invasion,
                            Image = "Void.jpg"
                        },
                        new Product
                        {
                            Name = "Absorb",
                            Slug = "absorb",
                            Price = 7.99M,
                            Category = invasion,
                            Image = "Absorb.jpg"
                        },
                        new Product
                        {
                            Name = "Elvish Champion",
                            Slug = "elvish-champion",
                            Price = 9.99M,
                            Category = invasion,
                            Image = "Elvish Champion.jpg"
                        },
                        new Product
                        {
                            Name = "Urza's Rage",
                            Slug = "urza's-rage",
                            Price = 0.99M,
                            Category = invasion,
                            Image = "Urza's Rage.jpg"
                        },
                        new Product
                        {
                            Name = "Crypt Angel",
                            Slug = "crypt-angel",
                            Price = 1.49M,
                            Category = invasion,
                            Image = "Crypt Angel.jpg",
                        },
                        new Product
                        {
                            Name = "Fact Or Fiction",
                            Slug = "fact-or-fiction",
                            Price = 1.99M,
                            Category = invasion,
                            Image = "Fact Or Fiction.jpg",
                        },
                        new Product
                        {
                            Name = "Rishadan Port",
                            Slug = "rishadan-port",
                            Price = 44.99M,
                            Category = mercadian_masques,
                            Image = "Rishadan Port.jpg",
                        },
                        new Product
                        {
                            Name = "Land Grant",
                            Slug = "land-grant",
                            Price = 0.75M,
                            Category = mercadian_masques,
                            Image = "Land Grant.jpg",
                        },
                        new Product
                        {
                            Name = "Forced March",
                            Slug = "forced-march",
                            Price = 0.75M,
                            Category = mercadian_masques,
                            Image = "Forced March.jpg",
                        },
                        new Product
                        {
                            Name = "Counterspell",
                            Slug = "counterspell",
                            Price = 1.99M,
                            Category = mercadian_masques,
                            Image = "Counterspell.jpg",
                        },
                        new Product
                        {
                            Name = "Brainstorm",
                            Slug = "brainstorm",
                            Price = 1.25M,
                            Category = mercadian_masques,
                            Image = "Brainstorm.jpg",
                        },
                        new Product
                        {
                            Name = "Ivory Mask",
                            Slug = "ivory-mask",
                            Price = 0.99M,
                            Category = mercadian_masques,
                            Image = "Ivory Mask.jpg",
                        },
                        new Product
                        {
                            Name = "Gaea's Cradle",
                            Slug = "gaea's-cradle",
                            Price = 1099.99M,
                            Category = urzas_saga,
                            Image = "Gaea's Cradle.jpg",
                        },
                        new Product
                        {
                            Name = "Exploration",
                            Slug = "exploration",
                            Price = 24.99M,
                            Category = urzas_saga,
                            Image = "Exploration.jpg",
                        },
                        new Product
                        {
                            Name = "Sneak Attack",
                            Slug = "sneak-attack",
                            Price = 22.99M,
                            Category = urzas_saga,
                            Image = "Sneak Attack.jpg",
                        },
                        new Product
                        {
                            Name = "Yawgmoth's Will",
                            Slug = "yawgmoth's-will",
                            Price = 199.99M,
                            Category = urzas_saga,
                            Image = "Yawgmoth's Will.jpg",
                        },
                        new Product
                        {
                            Name = "Gilded Drake",
                            Slug = "gilded-drake",
                            Price = 299.99M,
                            Category = urzas_saga,
                            Image = "Gilded Drake.jpg",
                        },
                        new Product
                        {
                            Name = "Serra Avatar",
                            Slug = "serra-avatar",
                            Price = 1.99M,
                            Category = urzas_saga,
                            Image = "Serra Avatar.jpg",
                        },
                        new Product
                        {
                            Name = "Scroll Rack",
                            Slug = "scroll-rack",
                            Price = 24.99M,
                            Category = tempest,
                            Image = "Scroll Rack.jpg",
                        },
                        new Product
                        {
                            Name = "Corpse Dance",
                            Slug = "corpse-dance",
                            Price = 15.99M,
                            Category = tempest,
                            Image = "Corpse Dance.jpg",
                        },
                        new Product
                        {
                            Name = "Ancient Tomb",
                            Slug = "ancient-tomb",
                            Price = 79.99M,
                            Category = tempest,
                            Image = "Ancient Tomb.jpg",
                        },
                        new Product
                        {
                            Name = "Humility",
                            Slug = "humility",
                            Price = 59.99M,
                            Category = tempest,
                            Image = "Humility.jpg",
                        },
                        new Product
                        {
                            Name = "Mogg Fanatic",
                            Slug = "mogg-fanatic",
                            Price = 0.49M,
                            Category = tempest,
                            Image = "Mogg Fanatic.jpg",
                        },
                        new Product
                        {
                            Name = "Intuition",
                            Slug = "intuition",
                            Price = 179.99M,
                            Category = tempest,
                            Image = "Intuition.jpg",
                        },
                        new Product
                        {
                            Name = "Enlightened Tutor",
                            Slug = "enlightened-tutor",
                            Price = 24.99M,
                            Category = mirage,
                            Image = "Enlightened Tutor.jpg",
                        },
                        new Product
                        {
                            Name = "Lion's Eye Diamond",
                            Slug = "lion's-eye-diamond",
                            Price = 549.99M,
                            Category = mirage,
                            Image = "Lion's Eye Diamond.jpg",
                        },
                        new Product
                        {
                            Name = "Mystical Tutor",
                            Slug = "mystical-tutor",
                            Price = 15.99M,
                            Category = mirage,
                            Image = "Mystical Tutor.jpg",
                        },
                        new Product
                        {
                            Name = "Phyrexian Dreadnought",
                            Slug = "phyrexian-dreadnought",
                            Price = 99.99M,
                            Category = mirage,
                            Image = "Phyrexian Dreadnought.jpg",
                        },
                        new Product
                        {
                            Name = "Crimson Hellkite",
                            Slug = "crimson-hellkite",
                            Price = 0.99M,
                            Category = mirage,
                            Image = "Crimson Hellkite.jpg",
                        },
                        new Product
                        {
                            Name = "Hammer Of Bogardan",
                            Slug = "hammer-of-bogardan",
                            Price = 2.99M,
                            Category = mirage,
                            Image = "Hammer Of Bogardan.jpg",
                        }                   

                    );

                    context.Users.AddRange
                    (
                        new User
                        {
                            UserName = "Pavel",
                            Password = "$2a$11$/AVOMgEvXDwxa6cRLsOQ1OXYAbRr1iW4xoBSmUstxobPTlD3eH99u",
                            Role = "admin",                            
                        },
                         new User
                        {
                            UserName = "Pashok",
                            Password = "$2a$11$0YVO6PivxMe9LzZrjm98N.v/ivQ6.BGSb9tacX9B.8ovhl2LGead2",
                            Role = "user",                            
                        }
                    ); 
                    context.SaveChanges();           
                }
        }
    }
}