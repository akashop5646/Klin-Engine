# Implementation Plan — Data Engine (Enterprise v2.2)

This plan covers the complete final implementation details for the Klin Data Engine (`@klin/data`), incorporating the Enterprise v2.2 expansion checklist.

The Data Engine serves as the CMS Engine of Klin, storing editable website content independently from layouts so that templates remain reusable while each website maintains its own data space.

## User Review Required

> [!IMPORTANT]
> **Key Architecture Decisions:**
> 1. **Zero Layout Pollution:** Templates are purely visual and layout-based. All customizable properties on blocks will dynamically bind using paths like `{{product.title}}` or `{{settings.social.instagram}}`.
> 2. **Multi-Tenant Website Isolation:** Every website instance owns its independent databases/collections.
> 3. **Hybrid Auth & Offline Mode:** Fallback to localStorage draft design if user token is not present.
> 4. **Cloudinary Asset References:** Instead of direct string URLs, images/videos will be modeled using `AssetReference` maps tracking provider ID, original URL, name, and responsive crops.
> 5. **Entry Revisions vs History Manager:** Split `EntryHistory.ts` into:
>    - `src/entries/EntryRevision.ts` for per-entry version tracking and snapshots.
>    - `src/history/HistoryManager.ts` for managing editor undo/redo stacks across entries.

---

## Proposed Changes

We will build the Data Engine as a separate workspace package at `packages/data`.

### 1. Monorepo Configuration
#### [MODIFY] [package.json](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/package.json)
- Add workspace package dependencies:
  - `@klin/core`: `*`
  - `@klin/shared`: `*`
  - `@klin/schemas`: `*`
  - `@klin/event-bus`: `*`
  - `@klin/registry`: `*`
  - `@klin/pages`: `*`
  - `@klin/blocks`: `*`
  - `mongodb`: `^6.0.0`
  - `zod`: `^3.0.0`

---

### 2. Core Architecture (src/core/)
#### [NEW] [DataLifecycle.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/core/DataLifecycle.ts)
- Defines the state machine lifecycle of the Data Engine: `Created` → `Initializing` → `LoadingProvider` → `LoadingCollections` → `LoadingEntries` → `Ready` → `Synchronizing` → `Disposed`.
- Exports a state tracker class to manage transitions and trigger hooks.

#### [NEW] [DataContext.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/core/DataContext.ts)
- An execution context holding references to the active `workspace`, `website`, `page`, `provider`, field/collection `registry`, `cache` instances, active `locale` string, and `eventBus`.

#### [NEW] [DataEngine.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/core/DataEngine.ts)
- Main orchestrator class (`DataEngine`) initializing the engine lifecycle, registering providers, and binding elements.

#### [NEW] [DataManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/core/DataManager.ts)
- Coordinates Collections, Entries, Queries, Bindings, and events under a unified interface.

---

### 3. Website Data Model (src/models/)
#### [NEW] [WebsiteData.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/models/WebsiteData.ts)
- Models the structure of a site's data (Collections, Entries, Assets, and Settings).

#### [NEW] [WebsiteSettings.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/models/WebsiteSettings.ts)
- Manages key business metadata (Company Name, Logo URL, Social links, Theme Variables, and SEO configuration).

#### [NEW] [WebsiteContent.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/models/WebsiteContent.ts)
- Holds structured catalogs (Products, Blog posts, FAQs, Testimonials, Categories, and Menus).

---

### 4. Schema & Collections (src/collections/)
#### [NEW] [CollectionDefinition.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/collections/CollectionDefinition.ts)
- Blueprint interface for core collections (e.g. Products, Blogs, Orders, Customers).

#### [NEW] [CollectionSchema.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/collections/CollectionSchema.ts)
- Schema definitions using Zod for fields validation, index rules, permissions, and entity relations.

#### [NEW] [CollectionManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/collections/CollectionManager.ts)
- Methods to CRUD collections: `create`, `delete`, `rename`, `clone`, and `archive`.

#### [NEW] [CollectionVersion.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/collections/CollectionVersion.ts)
- Handles collection schema versioning and schema migrations.

#### [NEW] [CollectionPreset.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/collections/CollectionPreset.ts)
- Ready presets for new websites (e.g. "Food Delivery" preset creates Products, Orders, Customers, Delivery Zones, and Coupons collections immediately).

---

### 5. Content Types System (src/content-types/)
#### [NEW] [ContentType.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/content-types/ContentType.ts)
- Defines reusable content models (Title, Price, Image, Description, Stock for Product; Title, Author, Content, Image, Slug for Blog).

#### [NEW] [ContentTypeRegistry.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/content-types/ContentTypeRegistry.ts)
- Registry mapping and validating content types: Product, Blog, FAQ, Team, Review, Coupon, Order, and Customer.

---

### 6. Content Entries (src/entries/)
#### [NEW] [Entry.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/entries/Entry.ts)
- Universal Entry data structure with fields for ID, collectionName, status, localized attributes, created/updated timestamps, and values dictionary.

#### [NEW] [EntryState.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/entries/EntryState.ts)
- Type declarations for entry statuses: `Draft`, `Published`, `Archived`, `Deleted`.

#### [NEW] [EntryRevision.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/entries/EntryRevision.ts)
- Stores snapshot diff logs and revision meta for individual entries.

#### [NEW] [EntryManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/entries/EntryManager.ts)
- Logic for manipulating entries: `create`, `update`, `delete`, `duplicate`, and `restore`.

---

### 7. Workflow Engine (src/workflow/)
#### [NEW] [PublishingWorkflow.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/workflow/PublishingWorkflow.ts)
- Defines transition paths for entry approval states: `Draft` → `Review` → `Approved` → `Scheduled` → `Published` → `Archived`.

#### [NEW] [WorkflowManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/workflow/WorkflowManager.ts)
- Governs submission events, review policies, scheduling timers, and status checks.

---

### 8. Dynamic Fields & Formulas (src/fields/)
#### [NEW] [FieldDefinition.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/FieldDefinition.ts)
- Struct interface for custom field definitions.

#### [NEW] [FieldRegistry.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/FieldRegistry.ts)
- Registry supporting standard CMS field types: Text, Textarea, RichText, Markdown, Boolean, Number, Color, Date, Time, Slug, Email, Phone, Password, Image, Video, Gallery, Reference, Repeater, Object, JSON, Code, URL, Rating, and Money.

#### [NEW] [FieldValidator.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/FieldValidator.ts)
- Performs schema-level Zod validations on inputs based on their configured field types.

#### [NEW] [ComputedField.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/ComputedField.ts)
- Custom getters resolving computed columns (e.g. `priceAfterDiscount`, `averageRating`, or `stockStatus`).

#### [NEW] [FormulaField.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/FormulaField.ts)
- Performs automated formula calculations (e.g. `price` - `discount` = `finalPrice`) without manual scripting.

#### [NEW] [AssetReference.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/fields/AssetReference.ts)
- Structure that replaces plain string URLs. Tracks original provider, Cloudinary IDs, image metadata, responsive sizes, and alt captions.

---

### 9. Entity Relations (src/relations/)
#### [NEW] [ReferenceField.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/relations/ReferenceField.ts)
- Field structure linking entries together.

#### [NEW] [RelationResolver.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/relations/RelationResolver.ts)
- Resolves entity relations: One-to-One, One-to-Many, and Many-to-Many.

#### [NEW] [RelationManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/relations/RelationManager.ts)
- Maintains referential integrity and checks constraints on deletion/archival.

---

### 10. Query Engine (src/query/)
#### [NEW] [QueryBuilder.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/query/QueryBuilder.ts)
- Fluid query query-builder interface (e.g., `db.collection("Products").where("category", "shoes").sort("price", "asc").limit(10).execute()`).

#### [NEW] [QueryExecutor.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/query/QueryExecutor.ts)
- Translates dynamic builder queries into provider-specific syntax (e.g. MongoDB queries or memory checks).

#### [NEW] [QueryCache.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/query/QueryCache.ts)
- In-memory result cache with time-to-live and key-invalidation triggers when entries update.

#### [NEW] [QueryResult.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/query/QueryResult.ts)
- Standardized query outcome containing item arrays, count stats, execution metadata, and pagination helpers.

---

### 11. Dynamic Bindings & Live Updating (src/binding/ & src/live/)
#### [NEW] [BindingExpression.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/binding/BindingExpression.ts)
- Parser turning brackets template strings (e.g. `{{product.title}}`) into path instructions.

#### [NEW] [BindingResolver.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/binding/BindingResolver.ts)
- Looks up dynamic paths in a given `BindingContext` and replaces tokens with real data values.

#### [NEW] [BindingEngine.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/binding/BindingEngine.ts)
- Re-renders layout properties reactively when bound fields trigger update events (Live Preview updatesBoundBlocks instantly).

#### [NEW] [BindingContext.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/binding/BindingContext.ts)
- Scoped data hierarchy supporting properties like `currentPage`, `currentProduct`, `currentBlog`, and `currentUser`.

#### [NEW] [LiveBindingManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/live/LiveBindingManager.ts)
- Governs fine-grained visual updates: listens to Mongo/Memory database updates, tracks binding paths, and triggers only the affected layout blocks on the canvas to re-render without reloading the entire page layout.

---

### 12. Routing & Slug Engine (src/routing/)
#### [NEW] [SlugGenerator.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/routing/SlugGenerator.ts)
- Handles slug generation (e.g. converts `"Fresh Organic Apples"` to `"fresh-organic-apples"`).

#### [NEW] [URLResolver.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/routing/URLResolver.ts)
- Maps URLs for CMS items (e.g. resolves Products to `/products/:slug` and Blogs to `/blog/:slug`).

---

### 13. Builder Integration (src/schema/)
#### [NEW] [DataBindingSchema.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/schema/DataBindingSchema.ts)
- Extends layout properties definitions so they can accept data bindings (e.g. mapping layout banner headers to `Products` collection text fields).

#### [NEW] [InspectorBinding.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/src/schema/InspectorBinding.ts)
- Logic allowing builder inputs in the customizer to select between Static values or Dynamic field bindings (Binding Inspector interface).

---

### 14. Data API Layer (src/api/)
#### [NEW] [CollectionAPI.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/api/CollectionAPI.ts)
- Unified public service interface for managing website collections schema.

#### [NEW] [EntryAPI.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/api/EntryAPI.ts)
- Unified public service interface for querying and modifying entries.

#### [NEW] [QueryAPI.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/api/QueryAPI.ts)
- Unified API endpoint used by the visual builder customizer, mobile apps, or external SDKs to perform data fetches.

---

### 15. Storage Providers (src/providers/)
#### [NEW] [IDataProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/IDataProvider.ts)
- Universal interface defining basic CRUD, transaction, search, and indexing operations.

#### [NEW] [ProviderRegistry.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/ProviderRegistry.ts)
- Registry mapping custom slugs (e.g. `mongodb`, `memory`) to their respective providers.

#### [NEW] [MemoryProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/MemoryProvider.ts)
- High-speed in-memory store for local testing, development, and serverless edge functions.

#### [NEW] [MongoProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/MongoProvider.ts)
- Primary production datastore provider integrating directly with MongoDB databases.

#### [NEW] [RESTProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/RESTProvider.ts)
- Placeholder implementation for loading content over HTTP APIs.

#### [NEW] [GraphQLProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/GraphQLProvider.ts)
- Placeholder for loading headless data from external GraphQL gateways.

#### [NEW] [SupabaseProvider.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/providers/SupabaseProvider.ts)
- Placeholder implementation for Postgres/Supabase storage backends.

---

### 16. Runtime & Sync (src/sync/)
#### [NEW] [ChangeTracker.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/sync/ChangeTracker.ts)
- Compares in-memory draft snapshots against database values to track unsaved dirty states.

#### [NEW] [Watcher.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/sync/Watcher.ts)
- Subscribes to real-time streams or polling updates from data providers.

#### [NEW] [SyncManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/sync/SyncManager.ts)
- Coordinates pushing local updates to active database storage, handling retries and lock mechanisms.

#### [NEW] [DataRuntime.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/sync/DataRuntime.ts)
- Manages active, hydrated in-memory structures to ensure responsive editor speeds.

---

### 17. Starter Content & Installation (src/starter/ & src/install/)
#### [NEW] [StarterContent.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/starter/StarterContent.ts)
- Defines structured starter data bundles (Products, Blogs, FAQs, Testimonials, Categories, Menus) packaged with template profiles.

#### [NEW] [StarterContentInstaller.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/starter/StarterContentInstaller.ts)
- Resolves dependencies and inserts starter entries into newly provisioned collections.

#### [NEW] [WebsiteInstaller.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/install/WebsiteInstaller.ts)
- Core installation pipeline: Template → Create Website Instance → Provision Collections → Copy Starter Content → Generate Settings → Bind Data → Ready.

#### [NEW] [InstallProfile.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/install/InstallProfile.ts)
- Packages collections, starter contents, permissions policy, menus, pages, theme tokens, and navigation rules into one installable profile.

---

### 18. Seed Engine (src/seeds/)
#### [NEW] [SeedGenerator.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/seeds/SeedGenerator.ts)
- Tool to populate mock/demo environments with simulated Products, Blogs, Orders, Customers, Categories, and Settings.

---

### 19. Import / Export (src/import/ & src/export/)
#### [NEW] [DataImporter.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/import/DataImporter.ts)
- Importer parser parsing JSON, CSV, and mock Excel streams into collection entries.

#### [NEW] [DataExporter.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/export/DataExporter.ts)
- Exporter module serializing selected collection records into JSON, CSV, or formatted text tables.

---

### 20. Transactions (src/transactions/)
#### [NEW] [Transaction.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/transactions/Transaction.ts)
- Handles execution transactions. Implements `commit()` and `rollback()` sequences for multi-step mutations (e.g. creating product entries and linking image media).

---

### 21. Multilingual & Localization (src/localization/)
#### [NEW] [LocalizationManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/localization/LocalizationManager.ts)
- Maps localized key dictionaries, supporting multilingual storefront variations (English, French, Hindi, Japanese).

---

### 22. Editor History & Undo/Redo (src/history/)
#### [NEW] [HistoryManager.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/history/HistoryManager.ts)
- Coordinates visual editor undo/redo operations and global state snapshot stacks.

---

### 23. Security, Search & Helpers
#### [NEW] [ValidationPipeline.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/validation/ValidationPipeline.ts)
- Multi-step validation pipeline processing entries through raw types, relations, Zod rules, and customized constraints.

#### [NEW] [ConstraintValidator.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/validation/ConstraintValidator.ts)
- Validator for complex cross-field validation rules.

#### [NEW] [SearchEngine.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/search/SearchEngine.ts)
- Standardized indexing and search controller for products, blogs, and pages.

#### [NEW] [RolePolicy.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/permissions/RolePolicy.ts)
- Defines RBAC schemas (Admin, Editor, Author, Viewer) for editing collection and entries.

#### [NEW] [PermissionResolver.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/permissions/PermissionResolver.ts)
- Evaluates user roles and access rights before permitting collection mutation or querying.

#### [NEW] [DataEvents.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/events/DataEvents.ts)
- Defines expanded event list: `collection.created`, `collection.deleted`, `entry.created`, `entry.updated`, `entry.deleted`, `entry.restored`, `binding.created`, `binding.updated`, `binding.deleted`, `query.executed`, `provider.connected`, `provider.disconnected`, `sync.started`, `sync.completed`.

#### [NEW] [Metrics.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/diagnostics/Metrics.ts)
- Diagnostic logger tracking query times, database transaction durations, sync times, and cache hits.

#### [NEW] [DataSerializer.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/serialization/DataSerializer.ts)
- Handles lossless serialization/deserialization of entries, structures, relationships, and metadata.

#### [NEW] [index.ts](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/src/index.ts)
- Exports core registry objects (`DataEngine`, `DataManager`, `BindingEngine`, `CollectionManager`, `EntryManager`, `ProviderRegistry`, `QueryBuilder`, `MongoProvider`, `MemoryProvider`).

#### [NEW] [DATA_ENGINE_ARCHITECTURE.md](file:///c:/Users/Mujahid%20Islam%20Khan/Desktop/Nova/packages/data/DATA_ENGINE_ARCHITECTURE.md)
- Complete design documentation covering schemas, query engine, provider interface, and runtime binding flow.

---

## Verification Plan

### Automated Tests
- Run full typescript checks and bundle compiles in the package:
  ```bash
  npx tsc --noEmit
  npm run build
  ```

### Integration Assertions
1. **Multi-Tenant Website Isolation:** Verify that installing a template creates a new `Website` instance in the memory provider without modifying the template configurations.
2. **Dynamic Bindings Resolution:** Confirm that binding expressions (e.g. `{{product.title}}`) resolve correctly to mock entries inside the resolver.
3. **Provider Interchangeability:** Assert that the engine can switch between the MemoryProvider and MongoProvider through the unified interface without schema data loss.
4. **Validation Pipelines:** Test Zod field constraints, ensuring invalid values (e.g. wrong email format, negative currency) trigger errors.
5. **Starter Content Installation:** Verify that executing `WebsiteInstaller` provisioned collections and filled them with template starter entries.
6. **Transaction rollback:** Verify that throwing an exception within a transaction results in a successful data rollback.
