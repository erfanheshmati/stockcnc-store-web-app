import FiltersMobile from "@/app/(root)/archiv/filters-mobile";

interface DialogBoxFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogBoxFilters: React.FC<DialogBoxFiltersProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-4 sm:px-0 z-20">
      <FiltersMobile onClose={onClose} />
    </div>
  );
};

export default DialogBoxFilters;
