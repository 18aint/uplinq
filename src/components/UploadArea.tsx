import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url?: string;
}

const UploadArea = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    // Load existing files from localStorage
    const stored = localStorage.getItem('uplinq-uploaded-files');
    return stored ? JSON.parse(stored) : [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        alert(`File type not supported: ${file.name}`);
        return;
      }

      // Validate file size
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        return;
      }

      // Create file object
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        url: URL.createObjectURL(file) // For local preview
      };

      newFiles.push(uploadedFile);
    });

    // Update state and localStorage
    setTimeout(() => {
      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);
      localStorage.setItem('uplinq-uploaded-files', JSON.stringify(updatedFiles));
      setIsUploading(false);
    }, 1000);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uplinq-uploaded-files', JSON.stringify(updatedFiles));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4l-4-4z"/>
        </svg>
      );
    } else if (type.includes('image')) {
      return (
        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else if (type.includes('document')) {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Uploading files...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-700 font-medium mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, PNG, JPG, DOCX (Max 10MB)
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Choose Files
            </motion.button>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.url && file.type.includes('image') && (
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Preview"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea; 