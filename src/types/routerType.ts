export interface RouterInterface {
    router: { go: (path: string) => void };
}

export interface RouterFullInterface {
    go(pathname: string): void;
    back(): void;
    forward(): void;
}
