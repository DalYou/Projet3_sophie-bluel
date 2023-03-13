let modal = null;

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute ('aria-modal','true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js_btn_close').addEventListener('click', closeModal);
    modal.querySelector('.js_modal_stop').addEventListener('click', stopPropagation);
};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js_btn_close').removeEventListener('click', closeModal);
    modal.querySelector('.js_modal_stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});