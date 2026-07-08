export interface StarterEntry {
  id: string;
  values: Record<string, any>;
  localizations?: Record<string, Record<string, any>>;
}

export interface StarterCollection {
  name: string;
  entries: StarterEntry[];
}

export interface StarterContentBundle {
  templateId: string;
  collections: StarterCollection[];
}

export class StarterContent {
  public static getDefaults(): StarterContentBundle[] {
    return [
      {
        templateId: "chic-boutique",
        collections: [
          {
            name: "Products",
            entries: [
              {
                id: "prod-1",
                values: {
                  title: "Classic Orange Tee",
                  price: 29.99,
                  stock: 100,
                  description: "A comfortable organic cotton t-shirt.",
                },
              },
              {
                id: "prod-2",
                values: {
                  title: "Teal Pocket Tee",
                  price: 34.99,
                  stock: 85,
                  description: "Double stitched pocket tee in deep teal.",
                },
              },
            ],
          },
        ],
      },
      {
        templateId: "apex-fitness",
        collections: [
          {
            name: "Products",
            entries: [
              {
                id: "prod-3",
                values: {
                  title: "Pro Gym Backpack",
                  price: 49.99,
                  stock: 40,
                  description: "Waterproof backpack with dedicated shoe compartment.",
                },
              },
            ],
          },
        ],
      },
    ];
  }
}
