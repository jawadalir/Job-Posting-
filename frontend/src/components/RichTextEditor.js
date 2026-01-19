import React, { useRef, useEffect } from 'react';
import '../styles/App.css';

const RichTextEditor = ({ value, onChange, placeholder, required, rows = 6, name = 'description' }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const isEmpty = (html) => {
    if (!html) return true;
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.trim().length === 0;
  };

  const cleanHTML = (html) => {
    if (!html) return '';
    
    // Create a temporary div to parse and clean the HTML
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    
    // Remove all data-* attributes from all elements
    const allElements = tmp.querySelectorAll('*');
    allElements.forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith('data-')) {
          el.removeAttribute(attr.name);
        }
      });
      // Also remove style attributes that might have unwanted properties
      if (el.hasAttribute('style')) {
        const style = el.getAttribute('style');
        // Remove font-weight: normal and other unwanted styles, keep only essential ones
        if (style.includes('font-weight: normal')) {
          el.removeAttribute('style');
        }
      }
    });
    
    // Return cleaned HTML
    return tmp.innerHTML;
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      // Clean the HTML to remove unwanted attributes but keep formatting tags
      const cleanedHTML = cleanHTML(html);
      
      // Create a synthetic event object that matches the expected format
      const syntheticEvent = {
        target: {
          name: name,
          value: cleanedHTML
        }
      };
      onChange(syntheticEvent);
    }
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // Small delay to ensure formatting is applied before cleaning
    setTimeout(() => {
      handleInput();
    }, 10);
  };

  const handleKeyDown = (e) => {
    // Handle Ctrl+B or Cmd+B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      handleFormat('bold');
    }
    // Handle Ctrl+I or Cmd+I for italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      handleFormat('italic');
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar">
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => handleFormat('bold')}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => handleFormat('italic')}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => handleFormat('underline')}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => handleFormat('insertUnorderedList')}
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onClick={() => handleFormat('insertOrderedList')}
          title="Numbered List"
        >
          1.
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="rich-text-content"
        onInput={handleInput}
        onBlur={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{
          minHeight: `${rows * 1.5}rem`,
        }}
        suppressContentEditableWarning={true}
      />
      {required && isEmpty(value) && (
        <div className="required-indicator">This field is required</div>
      )}
    </div>
  );
};

export default RichTextEditor;

