import { UiTextField } from "./ui-text-field";
import { ChangeEvent } from "react";

export function UiTwoFactorModal({
  onClick,
  onChange,
  qrCode,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  qrCode?: string;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="absolute top-0 right-0 mr-4 mt-4 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="text-lg font-semibold mb-4">Qr-code challenge</div>
        {qrCode && <div dangerouslySetInnerHTML={{ __html: qrCode }} />}

        <UiTextField inputProps={{ onChange: onChange }} />

        <button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
