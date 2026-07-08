import { IDataProvider } from "../providers/IDataProvider";

export class SeedGenerator {
  public static async seedDemo(provider: IDataProvider): Promise<void> {
    await provider.createCollection("Products", {});
    await provider.createCollection("Blogs", {});

    // Seed mock product
    await provider.createEntry("Products", {
      id: "seed-prod-1",
      collectionName: "Products",
      status: "Published",
      values: {
        title: "Seed Fresh Chicken",
        price: 12.99,
        stock: 50,
        description: "Farm-raised fresh chicken breasts.",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Seed mock blog
    await provider.createEntry("Blogs", {
      id: "seed-blog-1",
      collectionName: "Blogs",
      status: "Published",
      values: {
        title: "Eating Healthy in 2026",
        author: "Klin Chef",
        content: "Discover organic eating tips.",
        slug: "eating-healthy-2026",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
