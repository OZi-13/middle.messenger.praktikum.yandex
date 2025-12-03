import { StoreEvents } from '../framework/Store';
import isEqual from './isEqual';
import Block, { BlockProps } from '../framework/Block';
import { AppStateType, StoreInterface } from '../types/appType';

declare global {
  interface Window {
    store: StoreInterface;
  }
}

export function wrapStore<TStoreState extends BlockProps, TBlockProps extends BlockProps & TStoreState>(
  mapStateToProps: (state: AppStateType) => TStoreState,
) {
  return function <TBlock extends { new(props: TBlockProps): Block }>(Component: TBlock) {

    return class extends Component {
      private onChangeStoreCallback: (prevState: AppStateType, newState: AppStateType) => void;

      constructor(props: Omit<TBlockProps, keyof TStoreState>) {
        const store = window.store;
        let state = mapStateToProps(store.getState());
        super({ ...(props as TBlockProps), ...state });

        this.onChangeStoreCallback = (prevState: AppStateType, newState: AppStateType) => {
          const newComponentState = mapStateToProps(newState);

          if (!isEqual(state, newComponentState)) {
            (this as Block).setProps({ ...newComponentState } as Partial<TBlockProps>);
          }
          state = newComponentState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      protected componentWillUnmount(): void {
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    } as unknown as { new(props: Omit<TBlockProps, keyof TStoreState>): Block };
  };
}
