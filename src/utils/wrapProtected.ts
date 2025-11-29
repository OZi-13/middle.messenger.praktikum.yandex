import Block, { BlockProps } from '../framework/Block';
import { ROUTER } from './links';

import { wrapStore } from './wrapStore';
import { wrapRouter } from './wrapRouter';
import { UserDTO } from '../types/authType';
import { ProfileStoreInterface } from '../types/userType';
import {RouterInterface, RouterPropsInterface} from '../types/routerType';

interface ProtectedProps extends BlockProps, ProfileStoreInterface, RouterInterface, RouterPropsInterface {}

export function wrapProtected(WrappedBlock) {
    class Protected extends WrappedBlock {
        protected user: UserDTO;
        protected router: RouterInterface;

        constructor(props: ProtectedProps) {
            super(props);
            this.user = props.user as UserDTO;
            this.router = props.router as RouterInterface;

        }

        componentDidMount() {
            const currentPath = window.location.pathname

            if (!this.user) {
                if (currentPath !== ROUTER.login && currentPath !== ROUTER.registration) {
                    console.log('Перенаправление на ' + ROUTER.login);
                    this.router.go(ROUTER.login);
                }
            }
            else if (this.user) {
                if (currentPath === ROUTER.login || currentPath === ROUTER.registration) {
                    console.log('Перенаправление на ' + ROUTER.profile);
                    this.router.go(ROUTER.profile);
                }
            }
        }
    }

    const storeMapper = (state: { user: UserDTO | null }) => ({ user: state.user });
    return wrapRouter(wrapStore(storeMapper)(Protected));
}
