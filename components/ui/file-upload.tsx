import React, { useRef } from "react";

export const FileUpload = ({
  file,
  onFileUpload,
  onFileRemove,
}: {
  file: File | null;
  onFileUpload: (file: File | null) => void;
  onFileRemove: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    onFileUpload(uploadedFile);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {file ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </span>
          <button
            type="button"
            onClick={onFileRemove}
            className="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
        >
          Upload File
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".txt,.docx,.pdf"
      />
    </div>
  );
};
