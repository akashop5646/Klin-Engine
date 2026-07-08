/**
 * Component Manifest — machine-readable contract for Registry auto-discovery.
 * Every UI package ships a manifest.json conforming to this type.
 * Future-proofed for Marketplace, AI, and Builder integration.
 */

export interface ComponentManifest {
  /** Unique component identifier (e.g. "klin-button") */
  id: string;

  /** Human-readable name */
  name: string;

  /** Category for grouping (e.g. "Atoms", "Molecules", "Organisms") */
  category: string;

  /** Subcategory for finer grouping (e.g. "Actions", "Forms", "Navigation") */
  subcategory: string;

  /** SemVer version */
  version: string;

  /** Author or team */
  author: string;

  /** License identifier */
  license: string;

  /** Short description */
  description: string;

  /** Search keywords for discovery */
  keywords: string[];

  /** Categorical tags */
  tags: string[];

  /** Icon identifier or path */
  icon: string;

  /** Thumbnail image path for preview */
  thumbnail: string;

  /** Package dependencies */
  dependencies: Record<string, string>;

  /** Peer dependencies */
  peerDependencies: Record<string, string>;

  /** Minimum @klin/core version */
  requiredCoreVersion: string;

  /** Minimum @klin/theme version */
  requiredThemeVersion: string;

  /** Minimum builder version */
  requiredBuilderVersion: string;

  /** Supported theme modes */
  supportedModes: string[];

  /** Supported platforms */
  supportedPlatforms: Array<"Builder" | "Preview" | "Storefront">;

  /** Release status */
  status: "stable" | "beta" | "alpha" | "experimental";

  /** Whether this component is deprecated */
  deprecated: boolean;

  /** Whether this component is experimental */
  experimental: boolean;

  /** Documentation URL or path */
  documentation: string;

  /** Example usage references */
  examples: string[];
}
