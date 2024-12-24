import SortMobile from "@/app/(root)/archiv/[slug]/sort-mobile";

interface DialogBoxSortProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogBoxSort: React.FC<DialogBoxSortProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-4 sm:px-0 z-20">
      <SortMobile onClose={onClose} />
    </div>
  );
};

export default DialogBoxSort;
