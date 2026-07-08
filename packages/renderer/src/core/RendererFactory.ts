import type { IRenderer } from "./IRenderer";
import { RenderTarget } from "../contracts/RenderTarget";
import { ReactRenderer } from "../platforms/ReactRenderer";
import { HTMLRenderer } from "../platforms/HTMLRenderer";
import { EmailRenderer } from "../platforms/EmailRenderer";
import { PDFRenderer } from "../platforms/PDFRenderer";
import { NativeRenderer } from "../platforms/NativeRenderer";

export class RendererFactory {
  createRenderer(target: RenderTarget): IRenderer {
    switch (target) {
      case RenderTarget.React:
        return new ReactRenderer();
      case RenderTarget.HTML:
        return new HTMLRenderer();
      case RenderTarget.Email:
        return new EmailRenderer();
      case RenderTarget.PDF:
        return new PDFRenderer();
      case RenderTarget.Native:
      default:
        return new NativeRenderer();
    }
  }
}
