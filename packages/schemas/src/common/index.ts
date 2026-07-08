import { z } from "zod";

export const IdSchema = z.string().min(1);

export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const UrlSchema = z.string().url();

export const EmailSchema = z.string().email();

export const VersionSchema = z.string().regex(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);

export const ColorSchema = z.string().regex(/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/);

export const TimestampSchema = z.number().int().nonnegative();

export const MetadataSchema = z.record(z.string(), z.any()).optional();
