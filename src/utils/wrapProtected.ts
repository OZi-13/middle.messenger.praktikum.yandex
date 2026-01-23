import Block, { BlockProps } from '../framework/Block';
import { ROUTER } from './links';

import { wrapStore } from './wrapStore';
import { wrapRouter } from './wrapRouter';
import { UserDTO } from '../types/apiType';
import { RouterFullInterface, RouterInterface } from '../types/routerType';
import { AppStateType } from '../types/appType.ts';

type StoreType = Pick<AppStateType, 'user'>;
interface ProtectedProps extends BlockProps, RouterInterface, StoreType {}
type BlockConstructor<T extends BlockProps> = new (props: T) => Block;

type ExpectedStoreConstructorProps = BlockProps & StoreType;

export function wrapProtected<TBlockProps extends BlockProps>(
    WrappedBlock: BlockConstructor<TBlockProps>
) {
    class Protected extends (WrappedBlock as unknown as BlockConstructor<ProtectedProps>) {
        protected user: UserDTO | null;
        protected router: RouterFullInterface;

        constructor(props: ProtectedProps) {
            super(props);
            this.user = props.user as UserDTO | null;
            this.router = props.router as RouterFullInterface;
        }

        componentDidMount() {
            const currentPath = window.location.pathname;

            if (!this.user) {
                if (currentPath !== ROUTER.login && currentPath !== ROUTER.registration) {
                    this.router.go(ROUTER.login);
                }
            } else if (this.user) {
                if (currentPath === ROUTER.login || currentPath === ROUTER.registration) {
                    this.router.go(ROUTER.profile);
                }
            }
        }
    }

    const storeMapper = (state: { user: UserDTO | null }) => ({ user: state.user });

    return wrapRouter(
        wrapStore(storeMapper)(Protected as unknown as BlockConstructor<ExpectedStoreConstructorProps>)
    );
}
