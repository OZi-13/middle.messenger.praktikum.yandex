class ModalClass {

    constructor() {
    }

    public open(modalId: string): void {
        const modalBackElement: HTMLElement | null = document.getElementById('modal-back');
        const modalBoxElement: HTMLElement | null = document.getElementById('modal_modal');
        const modalElement: HTMLElement | null = document.getElementById(modalId);

        if (modalBackElement) {
            modalBackElement.classList.remove('none');
        }
        if (modalBoxElement) {
            modalBoxElement.classList.remove('none');
            Array.from(modalBoxElement.children).forEach(modal => {
                modal.classList.add('none');
            });
        }
        if (modalElement) {
            modalElement.classList.remove('none');
        }

    }

    public close(): void {
        const modalBackElement: HTMLElement | null = document.getElementById('modal-back');
        const modalBoxElement: HTMLElement | null = document.getElementById('modal_modal');

        if (modalBackElement) {
            modalBackElement.classList.add('none');
        }
        if (modalBoxElement) {
            modalBoxElement.classList.add('none');
            Array.from(modalBoxElement.children).forEach(modal => {
                modal.classList.add('none');
            });

        }
    }
}

const modal = new ModalClass();
export default modal;
