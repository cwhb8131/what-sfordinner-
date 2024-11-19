import React, { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';

interface TrashModalProps {
    onClear: () => void;
    onCancel: () => void;
  }

  const TrashModal: React.FC<TrashModalProps> = ({ onClear, onCancel }) => {
  return (
    <div>

      {/* モーダル */}
        <dialog open className="modal">
          <div className="modal-box">
            <p className="py-4">
              入力内容をクリアしますか？
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* キャンセルボタン */}
                <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                {/* クリアボタン */}
                <button type="button" className="btn" onClick={onClear}>OK</button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
  );
};

export default TrashModal;
