import cx from 'classnames';
import React from 'react';

import styles from './UploadInput.module.scss';

export const UploadInput = ({ accept = 'image/*', placeholder = 'Upload file', invalid = false, onChange }) => {
  const [file, setFile] = React.useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    onChange(e.target.files[0]);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFile(null);
    onChange(null);
  };

  const previewUrl = React.useMemo(() => (
    file
      ? URL.createObjectURL(file)
      : null
  ), [file]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cx(styles.label, { [styles.invalid]: invalid })}>
        <input
          type="file"
          accept={accept}
          className={styles.input}
          onChange={handleChange}
        />
        {file
          ? <span className={styles.value}>{file.name}</span>
          : <span className={styles.placeholder}>{placeholder}</span>}
        {file && (
          <button
            type="button"
            aria-label="Clear"
            className={styles.clear}
            onClick={handleClear}
          />
        )}
      </label>
      {previewUrl && (
        <img src={previewUrl} className={styles.preview} width={100} height={50} alt="Logo preview" />
      )}
    </>
  );
};
