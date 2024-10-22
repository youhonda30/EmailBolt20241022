import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './EmailComposer.module.css';

interface EmailComposerProps {
  activeTab: 'html' | 'plain';
}

type RecipientType = 'owner' | 'instructor' | 'student';

const EmailComposer: React.FC<EmailComposerProps> = ({ activeTab }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [plainContent, setPlainContent] = useState('');
  const [recipientType, setRecipientType] = useState<RecipientType>('owner');

  const handleSuggest = () => {
    const suggestedContent = generateSuggestedContent(recipientType);
    if (activeTab === 'html') {
      setHtmlContent(suggestedContent);
    } else {
      setPlainContent(suggestedContent);
    }
  };

  const handleSave = () => {
    console.log('Saving email content:');
    console.log('HTML:', htmlContent);
    console.log('Plain Text:', plainContent);
    console.log('Recipient Type:', recipientType);
    alert('メール内容が保存されました。');
  };

  return (
    <div className={styles.composerContainer}>
      <div className={styles.recipientContainer}>
        <label className={styles.label}>受信者:</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="owner"
              checked={recipientType === 'owner'}
              onChange={() => setRecipientType('owner')}
            />
            オーナー
          </label>
          <label>
            <input
              type="radio"
              value="instructor"
              checked={recipientType === 'instructor'}
              onChange={() => setRecipientType('instructor')}
            />
            講師
          </label>
          <label>
            <input
              type="radio"
              value="student"
              checked={recipientType === 'student'}
              onChange={() => setRecipientType('student')}
            />
            受講者
          </label>
        </div>
      </div>
      <button className={styles.suggestButton} onClick={handleSuggest}>
        提案
      </button>
      {activeTab === 'html' ? (
        <div className={styles.htmlContainer}>
          <div className={styles.editorContainer}>
            <CKEditor
              editor={ClassicEditor}
              data={htmlContent}
              onChange={(event, editor) => {
                const data = editor.getData();
                setHtmlContent(data);
                setPlainContent(stripHtml(data));
              }}
            />
          </div>
          <div className={styles.previewContainer}>
            <h3 className={styles.previewTitle}>プレビュー</h3>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.plainContainer}>
          <textarea
            className={styles.plainTextArea}
            value={plainContent}
            onChange={(e) => setPlainContent(e.target.value)}
            placeholder="テキストメールの内容を入力してください..."
          />
        </div>
      )}
      <button className={styles.saveButton} onClick={handleSave}>
        保存
      </button>
    </div>
  );
};

function generateSuggestedContent(recipientType: RecipientType): string {
  switch (recipientType) {
    case 'owner':
      return '<p>親愛なるオーナー様、</p><p>セミナーの申し込みがありました。詳細は以下の通りです...</p>';
    case 'instructor':
      return '<p>講師の皆様、</p><p>新しいセミナーの予定が追加されました。詳細は以下の通りです...</p>';
    case 'student':
      return '<p>セミナー参加者の皆様、</p><p>お申し込みいただきありがとうございます。セミナーの詳細は以下の通りです...</p>';
    default:
      return '';
  }
}

function stripHtml(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export default EmailComposer;