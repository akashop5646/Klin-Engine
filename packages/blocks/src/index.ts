export * from "./core/BlockLifecycle";
export * from "./core/BlockContext";
export * from "./core/BlockFactory";
export * from "./core/BlockManager";
export * from "./core/BlocksEngine";

export * from "./contracts/BlockManifest";
export * from "./contracts/BlockSchema";
export * from "./contracts/BlockMetadata";
export * from "./contracts/AIMetadata";

export * from "./composition/CompositionTree";
export * from "./composition/SlotManager";
export * from "./composition/ComponentResolver";

export * from "./runtime/BlockRenderer";
export * from "./runtime/BlockValidator";
export * from "./runtime/BlockHooks";
export * from "./runtime/BlockEvents";

export * from "./variants/VariantEngine";
export * from "./preview/PreviewEngine";

export * from "./serialization/BlockSerializer";
export * from "./serialization/BlockDeserializer";

export const name = "blocks";
