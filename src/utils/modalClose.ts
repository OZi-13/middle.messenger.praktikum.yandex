export default function modalClose(): void {
    const modalBackElement = document.getElementById('modal-back');
    const modalElement = document.getElementById('modal-avatar');
    if (modalBackElement) {
        modalBackElement.classList.add('none');
    }
    if (modalElement) {
        modalElement.classList.add('none');
    }
}