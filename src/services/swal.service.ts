import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

type SweetAlert2 = typeof swal;

const swalInstance: SweetAlert2 & ReactSweetAlert = withReactContent(Swal);

export const fireSwalModal = (
  options: SweetAlertOptions
): Promise<SweetAlertResult> => {
  return swalInstance.fire(options);
};
