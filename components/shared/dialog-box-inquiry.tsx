import InquiryForm from "@/components/shared/inquiry-form";

interface DialogBoxInquiryProps {
  isOpen: boolean;
  onClose: () => void;
}

const DialogBoxInquiry: React.FC<DialogBoxInquiryProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 px-4 sm:px-0 z-20">
      <InquiryForm onClose={onClose} />
    </div>
  );
};

export default DialogBoxInquiry;
