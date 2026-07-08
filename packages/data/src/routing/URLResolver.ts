import { Entry } from "../entities/Entry";

export class URLResolver {
  public static resolve(entry: Entry): string {
    const slugValue = entry.values["slug"] || entry.values["title"] || entry.id;
    const cleanSlug = typeof slugValue === "string" ? slugValue.toLowerCase() : String(slugValue);

    switch (entry.collectionName.toLowerCase()) {
      case "products":
      case "product":
        return `/products/${cleanSlug}`;
      case "blogs":
      case "blog":
      case "blogpost":
        return `/blog/${cleanSlug}`;
      case "faqs":
      case "faq":
        return `/faq#${cleanSlug}`;
      default:
        return `/content/${entry.collectionName}/${entry.id}`;
    }
  }
}
