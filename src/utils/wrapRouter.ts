import Block, { BlockProps } from '../framework/Block';
import { RouterInterface } from '../types/routerType';

type WrappedBlockConstructor = new (props: BlockProps) => Block;
type RouterWrapperProps = BlockProps;

export function wrapRouter(WrappedBlock: WrappedBlockConstructor) {

  return class RouterWrapper extends WrappedBlock {
    constructor(props: RouterWrapperProps) {
      super({
        ...props,
        router: window.router,
      } as BlockProps & RouterInterface);
    }
  };
}
