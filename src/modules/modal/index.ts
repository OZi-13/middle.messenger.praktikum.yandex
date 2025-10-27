type Nullable<T> = T | null;

class ModalClass {

    const modalBtn: Nullable<HTMLElement> = document.getElementById('modal-btn');
    if(modalBtn) {
        modalBtn.addEventListener('click', () => this.modal());
    }

    const modalBack: Nullable<HTMLElement> = document.getElementById('modal-back');
    if(modalBack) {
        modalBack.addEventListener('click', () => this.modal());
    }

    modal(): void  {
        const modalBack: Nullable<HTMLElement> = document.getElementById('modal-back');
        const modal: Nullable<HTMLElement> = document.getElementById('modal');

        if(modalBack) {
            modalBack.classList.toggle('none');
        }
        if(modal) {
            modal.classList.toggle('none');
        }
    }
}

export const FormValidator = new ModalClass();