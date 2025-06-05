import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  tags: string[];
  version: number;
  url?: string;
  description?: string;
}

const AssetsView = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Brand Guidelines.pdf',
      size: 2450000,
      type: 'application/pdf',
      uploadedAt: '2024-12-20T10:30:00Z',
      tags: ['Branding', 'Guidelines'],
      version: 2,
      description: 'Complete brand guidelines and style guide'
    },
    {
      id: '2', 
      name: 'Logo-Main.svg',
      size: 45000,
      type: 'image/svg+xml',
      uploadedAt: '2024-12-19T14:20:00Z',
      tags: ['Branding', 'Logo'],
      version: 1,
      description: 'Primary logo in vector format'
    },
    {
      id: '3',
      name: 'Website Copy.docx',
      size: 850000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      uploadedAt: '2024-12-18T09:15:00Z',
      tags: ['Copy', 'Content'],
      version: 3,
      description: 'Updated website copy and content'
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableTags = ['Branding', 'Copy', 'SEO Brief', 'Images', 'Documents', 'Guidelines', 'Logo', 'Content', 'Design'];
  const acceptedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/svg+xml', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'];
  const maxSize = 25 * 1024 * 1024; // 25MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        alert(`File type not supported: ${file.name}`);
        return;
      }

      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 25MB.`);
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        tags: [...selectedTags],
        version: 1,
        url: URL.createObjectURL(file)
      };

      setUploadedFiles(prev => [newFile, ...prev]);
    });

    setSelectedTags([]);
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6l-4-4H4v16zm8-14v4h4l-4-4z"/>
        </svg>
      </div>;
    } else if (type.includes('image')) {
      return <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>;
    } else if (type.includes('document')) {
      return <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>;
    }
    return <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>;
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addNewTag = () => {
    if (newTag && !availableTags.includes(newTag) && !selectedTags.includes(newTag)) {
      addTag(newTag);
      setNewTag('');
    }
  };

  const filteredFiles = filterTag 
    ? uploadedFiles.filter(file => file.tags.includes(filterTag))
    : uploadedFiles;

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-6">Upload Assets</h2>
        
        {/* Drag and Drop Area */}
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
            accept=".pdf,.png,.jpg,.jpeg,.svg,.docx,.zip"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />

          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-700 font-medium mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, PNG, JPG, SVG, DOCX, ZIP (Max 25MB)
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Choose Files
            </motion.button>
          </div>
        </div>

        {/* Tag Selection */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Add Tags to Files</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Custom Tag Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNewTag()}
              placeholder="Add custom tag..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              onClick={addNewTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Add
            </button>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Selected tags:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 border border-blue-300"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* File Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Asset Library</h2>
          
          {/* Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Categories</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            
            <span className="text-sm text-gray-500">
              {filteredFiles.length} files
            </span>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                {getFileIcon(file.type)}
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatFileSize(file.size)} • v{file.version}
                  </p>
                  
                  {file.description && (
                    <p className="text-sm text-gray-600 mt-2">{file.description}</p>
                  )}
                  
                  {/* Tags */}
                  {file.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {file.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col space-y-1">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No files found</p>
            <p className="text-sm text-gray-400 mt-1">Upload some assets to get started</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AssetsView; 