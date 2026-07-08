export interface BlockHooks {
  beforeLoad?: () => Promise<void>;
  afterLoad?: () => Promise<void>;
  beforeRender?: () => void;
  afterRender?: () => void;
  beforeUpdate?: () => void;
  afterUpdate?: () => void;
  beforeUnmount?: () => void;
  afterUnmount?: () => void;
}
