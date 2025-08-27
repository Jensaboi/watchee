import Modal from "./ui/Modal";
import SearchAndResults from "./SearchAndResults";
export default function MobileSearchModal({ close, isOpen }) {
  return (
    <Modal className="md:hidden" isOpen={isOpen}>
      <SearchAndResults closeModal={close} />
    </Modal>
  );
}
