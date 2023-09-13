import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const SwalWithMui = Swal.mixin({
    customClass: {
        confirmButton: 'confirm-button-sweetAlert',
        denyButton: 'deny-button-sweetAlert',
        cancelButton: 'cancel-button-sweetAlert',
    },
    buttonsStyling: false,
})