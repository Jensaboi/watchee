import Modal from "./ui/Modal";
import SearchAndResults from "./SearchAndResults";
export default function MobileSearchModal({ ...rest }) {
  return (
    <Modal {...rest}>
      <SearchAndResults />
    </Modal>
  );
}
